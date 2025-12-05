import { useCallback, useState } from 'react';
import { searchLocations } from '../services/tripPlanner/locationService';
import { LocationOption } from '../types/tripPlanner';

export const useLocationSearch = () => {
  const [options, setOptions] = useState<LocationOption[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = useCallback(async (query: string) => {
    const trimmed = query.trim();

    if (trimmed.length < 3) {
      setOptions([]);
      return;
    }

    setLoading(true);
    try {
      const results = await searchLocations(trimmed);
      setOptions(results);
    } catch (error) {
      console.error(error);
      setOptions([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const clear = useCallback(() => setOptions([]), []);

  return { options, search: handleSearch, clear, loading };
};
