import {
  Button,
  Combobox,
  Group,
  NumberInput,
  Paper,
  Select,
  Stack,
  TextInput,
  useCombobox,
} from '@mantine/core';
import { useDebouncedCallback } from '@mantine/hooks';
import {
  IconBatteryCharging,
  IconBolt,
  IconCoin,
  IconCurrencyDollar,
  IconMapPin,
} from '@tabler/icons-react';
import { useState } from 'react';
import { useLocationSearch } from '../../hooks/useLocationSearch';
import { PlanTripHandler } from '../../hooks/useTripPlanner';
import { Coordinate, TripPlanPayload } from '../../types/tripPlanner';

interface TripFormProps {
  onPlanTrip: PlanTripHandler;
  loading: boolean;
}

export default function TripForm({ onPlanTrip, loading }: TripFormProps) {
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');
  const [startCoords, setStartCoords] = useState<Coordinate | null>(null);
  const [endCoords, setEndCoords] = useState<Coordinate | null>(null);

  const [currentSoc, setCurrentSoc] = useState<number | ''>(80);
  const [targetSoc, setTargetSoc] = useState<number | ''>(10);
  const [avgConsumption, setAvgConsumption] = useState<number | ''>(19.5);

  const [currency, setCurrency] = useState('USD');
  const [homeRate, setHomeRate] = useState<number | ''>(0.16);
  const [publicRate, setPublicRate] = useState<number | ''>(0.45);

  const { options, search } = useLocationSearch();
  const startCombobox = useCombobox();
  const endCombobox = useCombobox();

  const handleSearch = useDebouncedCallback((query: string) => {
    search(query);
  }, 500);

  const handleSubmit = () => {
    if (
      startCoords &&
      endCoords &&
      typeof currentSoc === 'number' &&
      typeof targetSoc === 'number' &&
      typeof avgConsumption === 'number' &&
      typeof homeRate === 'number' &&
      typeof publicRate === 'number'
    ) {
      const payload: TripPlanPayload = {
        start: startCoords as Coordinate,
        end: endCoords as Coordinate,
        currentSoc,
        targetSoc,
        avgConsumption,
        currency,
        homeRate,
        publicRate,
      };

      void onPlanTrip(payload);
    }
  };

  return (
    <Paper p="md" withBorder radius="md">
      <Stack gap="md">
        {/* Start Location */}
        <Combobox
          store={startCombobox}
          onOptionSubmit={(val) => {
            setStartLocation(val);
            const opt = options.find((o) => o.value === val);
            if (opt) setStartCoords([opt.latitude, opt.longitude]);
            startCombobox.closeDropdown();
          }}
        >
          <Combobox.Target>
            <TextInput
              label="Start Location"
              leftSection={<IconMapPin size={16} />}
              placeholder="Search start location"
              value={startLocation}
              onChange={(e) => {
                setStartLocation(e.currentTarget.value);
                handleSearch(e.currentTarget.value);
                startCombobox.openDropdown();
              }}
            />
          </Combobox.Target>
          <Combobox.Dropdown>
            <Combobox.Options>
              {options.map((opt) => (
                <Combobox.Option value={opt.value} key={opt.value}>
                  {opt.label}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          </Combobox.Dropdown>
        </Combobox>

        {/* Destination */}
        <Combobox
          store={endCombobox}
          onOptionSubmit={(val) => {
            setEndLocation(val);
            const opt = options.find((o) => o.value === val);
            if (opt) setEndCoords([opt.latitude, opt.longitude]);
            endCombobox.closeDropdown();
          }}
        >
          <Combobox.Target>
            <TextInput
              label="Destination"
              leftSection={<IconMapPin size={16} color="var(--mantine-color-blue-5)" />}
              placeholder="Search destination"
              value={endLocation}
              onChange={(e) => {
                setEndLocation(e.currentTarget.value);
                handleSearch(e.currentTarget.value);
                endCombobox.openDropdown();
              }}
            />
          </Combobox.Target>
          <Combobox.Dropdown>
            <Combobox.Options>
              {options.map((opt) => (
                <Combobox.Option value={opt.value} key={opt.value}>
                  {opt.label}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          </Combobox.Dropdown>
        </Combobox>

        <Paper withBorder p="xs" radius="md">
          <Group grow align="flex-start">
            <Select
              label="Currency"
              description="Display currency"
              data={['USD', 'EUR', 'GBP', 'SEK', 'NOK']}
              value={currency}
              onChange={(v) => setCurrency(v || 'USD')}
              leftSection={<IconCoin size={16} />}
            />
            <NumberInput
              label="Home Rate"
              description="Cost per kWh"
              value={homeRate}
              onChange={(v) => setHomeRate(Number(v))}
              decimalScale={3}
              min={0}
              leftSection={<IconCurrencyDollar size={16} />}
              suffix={` ${currency}`}
            />
            <NumberInput
              label="Public Rate"
              description="Cost per kWh"
              value={publicRate}
              onChange={(v) => setPublicRate(Number(v))}
              decimalScale={3}
              min={0}
              leftSection={<IconCurrencyDollar size={16} />}
              suffix={` ${currency}`}
            />
          </Group>
        </Paper>

        <Group grow>
          <NumberInput
            label="Current SOC"
            description="Battery % at start"
            leftSection={<IconBatteryCharging size={16} />}
            min={0}
            max={100}
            value={currentSoc}
            onChange={(v) => setCurrentSoc(Number(v))}
            suffix="%"
          />
          <NumberInput
            label="Target SOC"
            description="Desired % at dest."
            leftSection={<IconBatteryCharging size={16} />}
            min={0}
            max={100}
            value={targetSoc}
            onChange={(v) => setTargetSoc(Number(v))}
            suffix="%"
          />
        </Group>

        <NumberInput
          label="Avg. Consumption"
          description="kWh/100km (est.)"
          leftSection={<IconBolt size={16} />}
          min={10}
          max={40}
          decimalScale={1}
          value={avgConsumption}
          onChange={(v) => setAvgConsumption(Number(v))}
          suffix=" kWh/100km"
        />

        <Button
          fullWidth
          color="polestarOrange"
          onClick={handleSubmit}
          loading={loading}
          disabled={!startCoords || !endCoords}
        >
          Calculate Trip
        </Button>
      </Stack>
    </Paper>
  );
}
