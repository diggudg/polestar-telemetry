import { Alert, Grid, Group, Paper, Stack, Text, Title } from '@mantine/core';
import { IconAlertTriangle, IconChargingPile, IconClock, IconRoute } from '@tabler/icons-react';
import { TripStats } from '../../types/tripPlanner';

interface TripEstimateCardProps {
  stats: TripStats;
  currency: string;
}

export function TripEstimateCard({ stats, currency }: TripEstimateCardProps) {
  return (
    <Paper p="md" withBorder radius="md">
      <Title order={4} mb="md">
        Trip Estimate
      </Title>
      <Stack gap="xs">
        <Group justify="space-between">
          <Group gap="xs">
            <IconRoute size={18} color="gray" />
            <Text size="sm">Distance</Text>
          </Group>
          <Text fw={700}>{stats.distance.toFixed(1)} km</Text>
        </Group>
        <Group justify="space-between">
          <Group gap="xs">
            <IconClock size={18} color="gray" />
            <Text size="sm">Duration</Text>
          </Group>
          <Text fw={700}>{stats.duration}</Text>
        </Group>
        <Group justify="space-between">
          <Group gap="xs">
            <IconChargingPile size={18} color="gray" />
            <Text size="sm">Est. Cost</Text>
          </Group>
          <Text fw={700}>
            {stats.cost.toFixed(2)} {currency}
          </Text>
        </Group>

        <Grid mt="sm">
          <Grid.Col span={6}>
            <Paper withBorder p="xs" radius="md" bg="var(--mantine-color-gray-0)">
              <Text size="xs" c="dimmed">
                Arrival SOC
              </Text>
              <Text fw={700} size="lg" c={stats.arrivalSoc < 10 ? 'red' : 'green'}>
                {stats.arrivalSoc.toFixed(0)}%
              </Text>
            </Paper>
          </Grid.Col>
          <Grid.Col span={6}>
            <Paper withBorder p="xs" radius="md" bg="var(--mantine-color-gray-0)">
              <Text size="xs" c="dimmed">
                Charge Time
              </Text>
              <Text fw={700} size="lg">
                {stats.chargingTime > 0 ? `${stats.chargingTime}m` : '-'}
              </Text>
            </Paper>
          </Grid.Col>
        </Grid>

        {stats.chargingTime > 0 && (
          <Alert color="orange" title="Charging Needed" mt="xs" icon={<IconAlertTriangle size={16} />}>
            You need to charge for approx {stats.chargingTime} minutes to reach your target SOC.
          </Alert>
        )}
      </Stack>
    </Paper>
  );
}
