export type Coordinate = [number, number];

export type RouteGeometry = [number, number][];

export interface Waypoint {
  lat: number;
  lon: number;
  label: string;
  type: 'charger' | 'stop';
}

export interface TripStats {
  distance: number;
  duration: string;
  consumption: number;
  cost: number;
  arrivalSoc: number;
  chargingTime: number;
}

export interface TripPlanRequest {
  start: Coordinate;
  end: Coordinate;
  currentSoc: number;
  targetSoc: number;
  avgConsumption: number;
  homeRate: number;
  publicRate: number;
}

export interface TripPlanResult {
  routeGeometry: RouteGeometry;
  waypoints: Waypoint[];
  stats: TripStats;
}

export interface TripPlanPayload extends TripPlanRequest {
  currency: string;
}

export interface LocationOption {
  label: string;
  value: string;
  latitude: number;
  longitude: number;
}
