import { Waypoint } from '../../types/tripPlanner';
import { CHARGER_SEARCH_RADIUS_METERS, OVERPASS_BASE_URL } from './constants';

const wait = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

interface OverpassElement {
  lat?: number;
  lon?: number;
  center?: {
    lat: number;
    lon: number;
  };
  tags?: {
    name?: string;
  };
}

interface OverpassResponse {
  elements?: OverpassElement[];
}

const buildChargerQuery = (lat: number, lon: number, radius: number): string =>
  `[out:json][timeout:25];nwr["amenity"="charging_station"](around:${radius},${lat},${lon});out center;`;

export const findChargingStation = async (
  lat: number,
  lon: number,
  radius = CHARGER_SEARCH_RADIUS_METERS
): Promise<Waypoint | null> => {
  const params = new URLSearchParams();
  params.append('data', buildChargerQuery(lat, lon, radius));

  await wait(2000);

  let remainingAttempts = 3;
  let lastError: Error | null = null;

  while (remainingAttempts > 0) {
    try {
      const response = await fetch(OVERPASS_BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params,
      });

      if (response.status === 429) {
        await wait(5000);
        remainingAttempts -= 1;
        continue;
      }

      if (!response.ok) {
        throw new Error('Overpass API returned an error');
      }

      const data = (await response.json()) as OverpassResponse;
      const element = data.elements?.find((item) => item.lat || item.center);

      if (!element) {
        return null;
      }

      const waypoint: Waypoint = {
        lat: element.lat ?? element.center!.lat,
        lon: element.lon ?? element.center!.lon,
        label: element.tags?.name ?? 'Charging Station',
        type: 'charger',
      };

      return waypoint;
    } catch (error) {
      lastError = error as Error;
      remainingAttempts -= 1;
      await wait(2000);
    }
  }

  if (lastError) {
    throw lastError;
  }

  return null;
};
