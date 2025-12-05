import { LocationOption } from '../../types/tripPlanner';

interface NominatimResult {
  display_name: string;
  lat: string;
  lon: string;
}

const NOMINATIM_URL = 'https://nominatim.openstreetmap.org/search';

export const searchLocations = async (query: string): Promise<LocationOption[]> => {
  if (query.trim().length < 3) {
    return [];
  }

  const searchUrl = `${NOMINATIM_URL}?format=json&q=${encodeURIComponent(query)}&limit=5`;
  const response = await fetch(searchUrl, {
    headers: { 'User-Agent': 'Polestar Telemetry' },
  });

  if (!response.ok) {
    throw new Error('Unable to fetch locations');
  }

  const data = (await response.json()) as NominatimResult[];

  return data.map((place) => ({
    label: place.display_name,
    value: place.display_name,
    latitude: parseFloat(place.lat),
    longitude: parseFloat(place.lon),
  }));
};
