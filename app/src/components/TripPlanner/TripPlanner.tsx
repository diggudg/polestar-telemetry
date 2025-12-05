import { Alert, Grid, Stack, Title } from '@mantine/core';
import { IconAlertTriangle } from '@tabler/icons-react';
import { useTripPlanner } from '../../hooks/useTripPlanner';
import { TripEstimateCard } from './TripEstimateCard';
import TripForm from './TripForm';
import TripMap from './TripMap';

export default function TripPlanner() {
  const { start, end, routeGeometry, waypoints, stats, loading, error, currency, planTrip } =
    useTripPlanner();

  return (
    <Stack gap="lg" h="100%">
      <Title order={2}>Trip Planner</Title>

      {error && (
        <Alert icon={<IconAlertTriangle size={16} />} title="Error" color="red">
          {error}
        </Alert>
      )}

      <Grid h="100%">
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Stack gap="md">
            <TripForm onPlanTrip={planTrip} loading={loading} />
            {stats && <TripEstimateCard stats={stats} currency={currency} />}
          </Stack>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 8 }}>
          <TripMap
            start={start}
            end={end}
            routeGeometry={routeGeometry}
            waypoints={waypoints}
          />
        </Grid.Col>
      </Grid>
    </Stack>
  );
}
