import { Coordinate, TripPlanRequest, TripPlanResult, Waypoint } from '../../types/tripPlanner';
import {
  BATTERY_CAPACITY_KWH,
  DEFAULT_STOP_CHARGE_SOC,
  HARD_RESERVE_PERCENT,
  MAX_INTERMEDIATE_STOPS,
  SEARCH_TRIGGER_PERCENT,
} from './constants';
import { findChargingStation } from './chargerService';
import { fetchRoute } from './osrmService';
import { findCoordinateAtDistance } from './routeAnalysisService';
import { calculateTripStats } from './tripStatsService';

const toCoordinate = (waypoint: Waypoint): Coordinate => [waypoint.lat, waypoint.lon];

const calculateRangeKm = (availableEnergyKwh: number, consumption: number): number => {
  if (consumption <= 0) {
    return 0;
  }
  return Math.max(0, (availableEnergyKwh / consumption) * 100);
};

export const planTrip = async (payload: TripPlanRequest): Promise<TripPlanResult> => {
  const { start, end, currentSoc, avgConsumption, targetSoc, homeRate, publicRate } = payload;
  let currentLocation: Coordinate = start;
  let currentSocState = currentSoc;
  const stops: Waypoint[] = [];

  for (let index = 0; index < MAX_INTERMEDIATE_STOPS; index += 1) {
    const segmentRoute = await fetchRoute([currentLocation, end]);
    if (!segmentRoute.geometry.coordinates.length) {
      throw new Error('Route geometry is unavailable');
    }
    const segmentDistanceKm = segmentRoute.distance / 1000;
    const availableEnergy = (currentSocState / 100) * BATTERY_CAPACITY_KWH;
    const hardReserveEnergy = (HARD_RESERVE_PERCENT / 100) * BATTERY_CAPACITY_KWH;
    const searchTriggerEnergy = (SEARCH_TRIGGER_PERCENT / 100) * BATTERY_CAPACITY_KWH;

    const maxReachableDistance = calculateRangeKm(availableEnergy - hardReserveEnergy, avgConsumption);
    if (segmentDistanceKm <= maxReachableDistance) {
      break;
    }

    const searchRangeKm = calculateRangeKm(availableEnergy - searchTriggerEnergy, avgConsumption);
    const searchCoordinate =
      findCoordinateAtDistance(segmentRoute.geometry.coordinates, searchRangeKm) ??
      segmentRoute.geometry.coordinates[segmentRoute.geometry.coordinates.length - 1];

    if (!searchCoordinate) {
      throw new Error('Unable to determine charger search coordinate');
    }

    const charger = await findChargingStation(searchCoordinate[1], searchCoordinate[0]);

    const waypoint: Waypoint =
      charger ?? {
        lat: searchCoordinate[1],
        lon: searchCoordinate[0],
        label: 'Planned Stop (No Charger)',
        type: 'charger',
      };

    stops.push(waypoint);
    currentLocation = toCoordinate(waypoint);
    currentSocState = DEFAULT_STOP_CHARGE_SOC;
  }

  const finalRoute = await fetchRoute([start, ...stops.map(toCoordinate), end]);
  const stats = calculateTripStats({
    legs: finalRoute.legs,
    avgConsumption,
    currentSoc,
    targetSoc,
    homeRate,
    publicRate,
    totalDurationSec: finalRoute.duration,
    totalDistanceKm: finalRoute.distance / 1000,
  });

  return {
    routeGeometry: finalRoute.geometry.coordinates,
    waypoints: stops,
    stats,
  };
};
