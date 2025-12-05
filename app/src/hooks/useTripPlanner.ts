import { useCallback, useState } from 'react';
import { planTrip } from '../services/tripPlanner/tripPlannerService';
import { Coordinate, RouteGeometry, TripPlanPayload, TripStats, Waypoint } from '../types/tripPlanner';

interface TripPlannerState {
  start: Coordinate | null;
  end: Coordinate | null;
  routeGeometry: RouteGeometry | null;
  waypoints: Waypoint[];
  stats: TripStats | null;
  loading: boolean;
  error: string | null;
  currency: string;
}

const INITIAL_STATE: TripPlannerState = {
  start: null,
  end: null,
  routeGeometry: null,
  waypoints: [],
  stats: null,
  loading: false,
  error: null,
  currency: 'USD',
};

export const useTripPlanner = () => {
  const [state, setState] = useState<TripPlannerState>(INITIAL_STATE);

  const handlePlanTrip = useCallback(async (payload: TripPlanPayload) => {
    const { currency, ...tripPayload } = payload;

    setState((prev) => ({
      ...prev,
      loading: true,
      error: null,
      currency,
      start: tripPayload.start,
      end: tripPayload.end,
      routeGeometry: null,
      waypoints: [],
    }));

    try {
      const result = await planTrip(tripPayload);
      setState((prev) => ({
        ...prev,
        loading: false,
        start: tripPayload.start,
        end: tripPayload.end,
        routeGeometry: result.routeGeometry,
        waypoints: result.waypoints,
        stats: result.stats,
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: (error as Error).message || 'Unable to calculate trip',
      }));
    }
  }, []);

  return {
    ...state,
    planTrip: handlePlanTrip,
  };
};

export type PlanTripHandler = (payload: TripPlanPayload) => Promise<void>;
