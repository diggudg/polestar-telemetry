import { Coordinate, RouteGeometry } from '../../types/tripPlanner';
import { OSRM_BASE_URL } from './constants';

export interface OsrmLeg {
  distance: number;
  duration: number;
}

export interface OsrmRoute {
  distance: number;
  duration: number;
  legs: OsrmLeg[];
  geometry: {
    coordinates: RouteGeometry;
  };
}

const buildCoordinateSegment = (coordinates: Coordinate[]): string =>
  coordinates.map(([lat, lon]) => `${lon},${lat}`).join(';');

export const fetchRoute = async (coordinates: Coordinate[]): Promise<OsrmRoute> => {
  if (!coordinates.length) {
    throw new Error('No coordinates provided for routing');
  }

  const coordSegment = buildCoordinateSegment(coordinates);
  const url = `${OSRM_BASE_URL}/route/v1/driving/${coordSegment}?overview=full&geometries=geojson`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch route from OSRM');
  }

  const data = await response.json();

  if (!data.routes?.length) {
    throw new Error('No route found from OSRM');
  }

  return data.routes[0];
};
