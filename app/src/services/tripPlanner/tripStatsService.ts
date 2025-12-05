import { TripStats } from '../../types/tripPlanner';
import {
  BATTERY_CAPACITY_KWH,
  HARD_RESERVE_PERCENT,
  PUBLIC_CHARGING_POWER_KW,
} from './constants';
import { OsrmLeg } from './osrmService';

interface TripStatsInput {
  legs: OsrmLeg[];
  avgConsumption: number;
  currentSoc: number;
  targetSoc: number;
  homeRate: number;
  publicRate: number;
  totalDurationSec: number;
  totalDistanceKm: number;
}

const getLegConsumption = (distanceMeters: number, avgConsumption: number): number => {
  const distanceKm = distanceMeters / 1000;
  return (distanceKm * avgConsumption) / 100;
};

export const calculateTripStats = ({
  legs,
  avgConsumption,
  currentSoc,
  targetSoc,
  homeRate,
  publicRate,
  totalDurationSec,
  totalDistanceKm,
}: TripStatsInput): TripStats => {
  let currentEnergy = (currentSoc / 100) * BATTERY_CAPACITY_KWH;
  let totalPublicEnergy = 0;
  let totalChargingSeconds = 0;

  legs.forEach((leg, index) => {
    currentEnergy -= getLegConsumption(leg.distance, avgConsumption);

    const isLastLeg = index === legs.length - 1;
    if (isLastLeg) {
      return;
    }

    const nextLeg = legs[index + 1];
    const nextLegConsumption = getLegConsumption(nextLeg.distance, avgConsumption);
    const isNextDestination = index + 1 === legs.length - 1;
    const bufferPercent = isNextDestination ? targetSoc : HARD_RESERVE_PERCENT;
    const requiredBuffer = (bufferPercent / 100) * BATTERY_CAPACITY_KWH;
    const requiredDepartureEnergy = nextLegConsumption + requiredBuffer;

    if (currentEnergy < requiredDepartureEnergy) {
      const deficit = requiredDepartureEnergy - currentEnergy;
      const availableCapacity = BATTERY_CAPACITY_KWH - currentEnergy;
      const chargeAmount = Math.min(deficit, availableCapacity);

      totalPublicEnergy += chargeAmount;
      totalChargingSeconds += (chargeAmount / PUBLIC_CHARGING_POWER_KW) * 3600;
      currentEnergy += chargeAmount;
    }
  });

  const totalConsumption = (totalDistanceKm * avgConsumption) / 100;
  const homeEnergy = Math.max(0, totalConsumption - totalPublicEnergy);
  const totalCost = totalPublicEnergy * publicRate + homeEnergy * homeRate;

  const totalTripSeconds = totalDurationSec + totalChargingSeconds;
  const hours = Math.floor(totalTripSeconds / 3600);
  const minutes = Math.floor((totalTripSeconds % 3600) / 60);

  const safeEnergy = Math.max(0, currentEnergy);

  return {
    distance: totalDistanceKm,
    duration: `${hours}h ${minutes}m`,
    consumption: totalConsumption,
    cost: totalCost,
    arrivalSoc: (safeEnergy / BATTERY_CAPACITY_KWH) * 100,
    chargingTime: Math.ceil(totalChargingSeconds / 60),
  };
};
