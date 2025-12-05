/**
 * DataValidator - Service for identifying anomalies in journey data
 */
const validateTrip = (trip) => {
  const issues = [];

  const MAX_CONSUMPTION_KWH = 150;
  const MAX_EFFICIENCY = 100;
  const MIN_EFFICIENCY = 5;
  const MAX_CONSUMPTION_PER_KM = 5;

  if (trip.consumptionKwh > MAX_CONSUMPTION_KWH) {
    issues.push(`Extreme energy consumption: ${trip.consumptionKwh.toFixed(1)} kWh`);
  }

  const efficiency = parseFloat(trip.efficiency);
  if (!Number.isNaN(efficiency) && efficiency > MAX_EFFICIENCY) {
    issues.push(`Abnormal efficiency: ${efficiency.toFixed(1)} kWh/100km`);
  }

  if (!Number.isNaN(efficiency) && efficiency > 0 && efficiency < MIN_EFFICIENCY) {
    issues.push(`Unusually low efficiency: ${efficiency.toFixed(1)} kWh/100km`);
  }

  if (trip.distanceKm > 0) {
    const kwhPerKm = trip.consumptionKwh / trip.distanceKm;
    if (kwhPerKm > MAX_CONSUMPTION_PER_KM) {
      issues.push(`High consumption per km: ${kwhPerKm.toFixed(1)} kWh/km`);
    }
  }

  return issues;
};

const validate = (trips) => {
  const anomalies = [];

  trips.forEach((trip, index) => {
    const issues = validateTrip(trip);
    if (issues.length > 0) {
      anomalies.push({
        tripIndex: index,
        trip,
        issues,
      });
    }
  });

  return anomalies;
};

export const DataValidator = {
  validate,
  validateTrip,
};
