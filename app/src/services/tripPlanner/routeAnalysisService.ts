import { RouteGeometry } from '../../types/tripPlanner';

const EARTH_RADIUS_KM = 6371;

const toRadians = (value: number): number => (value * Math.PI) / 180;

export const calculateDistanceKm = (
  start: [number, number],
  end: [number, number]
): number => {
  const [startLon, startLat] = start;
  const [endLon, endLat] = end;

  const dLat = toRadians(endLat - startLat);
  const dLon = toRadians(endLon - startLon);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(startLat)) *
      Math.cos(toRadians(endLat)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return EARTH_RADIUS_KM * c;
};

export const findCoordinateAtDistance = (
  geometry: RouteGeometry,
  targetDistanceKm: number
): [number, number] | null => {
  if (!geometry.length) {
    return null;
  }

  let distanceAccumulator = 0;

  for (let index = 0; index < geometry.length - 1; index += 1) {
    const segmentDistance = calculateDistanceKm(geometry[index], geometry[index + 1]);
    distanceAccumulator += segmentDistance;

    if (distanceAccumulator >= targetDistanceKm) {
      return geometry[index + 1];
    }
  }

  return geometry[geometry.length - 1];
};
