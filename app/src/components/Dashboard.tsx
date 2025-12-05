import { useMemo, useState } from "react";
import {
  Button,
  Stack,
  Group,
  ActionIcon,
  Tooltip,
  Text,
  Paper,
  Box,
  NavLink,
  Title,
  Divider,
  rem,
} from "@mantine/core";
import {
  IconArrowLeft,
  IconChartBar,
  IconMap,
  IconList,
  IconDownload,
  IconHelp,
  IconBook,
  IconCurrencyDollar,
  IconSettings,
  IconDeviceAnalytics,
  IconCar,
  IconGauge,
  IconShieldCheck,
  IconWind,
  IconTemperature,
  IconBolt,
  IconRoad,
  IconUpload,
} from "@tabler/icons-react";
import { FileButton } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import StatsCards from "./stats/StatsCards";
import ChartsView from "./charts/ChartsView";
import JourneyExplorer from "./JourneyExplorer";
import AnalyticsView from "./analytics/AnalyticsView";
import DataGuide from "./DataGuide";
import Filters from "./filters/Filters";
import { calculateStatistics } from "../utils/dataParser";
import { TableExporter } from "../services/table/TableDataProcessor";
import HelpModal from "./HelpModal";
import CostCalculatorModal from "./CostCalculatorModal";

import VehicleStatus from "./vehicle/VehicleStatus";

import type { Trip } from '../types';

// Columns to be used for CSV export and potentially other components.
const COLUMNS = [
  { key: "startDate", label: "Start Date" },
  { key: "endDate", label: "End Date" },
  { key: "startAddress", label: "Start Address" },
  { key: "endAddress", label: "End Address" },
  { key: "distanceKm", label: "Distance (km)" },
  { key: "consumptionKwh", label: "Consumption (kWh)" },
  { key: "efficiency", label: "Efficiency (kWh/100km)" },
  { key: "category", label: "Category" },
  { key: "socSource", label: "SOC Start" },
  { key: "socDestination", label: "SOC End" },
  { key: "socDrop", label: "SOC Drop" },
  { key: "startOdometer", label: "Start Odometer" },
  { key: "endOdometer", label: "End Odometer" },
];

// Initialize the stateless TableExporter once outside the component
const tableExporter = new TableExporter();

interface DashboardProps {
  data: Trip[];
  vehicleStatusData: any;
  chargingData: any;
  onReset: () => void;
  onDataLoaded: (type: string, data: any) => void;
}

function Dashboard({ data, vehicleStatusData, chargingData, onReset, onDataLoaded }: DashboardProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [activeVehicleTab, setActiveVehicleTab] = useState("overview");
  const [filteredData, setFilteredData] = useState(data);
  const [helpOpened, setHelpOpened] = useState(false);
  const [costModalOpened, setCostModalOpened] = useState(false);

  const statistics = useMemo(
    () => calculateStatistics(filteredData),
    [filteredData]
  );

  const handleFilterChange = (filtered: Trip[]) => {
    setFilteredData(filtered);
  };

  const exportToCSV = () => {
    const csvContent = tableExporter.exportToCSV(filteredData, COLUMNS);
    const filename = `polestar-journey-export-${new Date()
      .toISOString()
      .slice(0, 10)}.csv`;

    tableExporter.downloadFile(csvContent, filename, "text/csv;charset=utf-8;");

    notifications.show({
      title: "Export successful",
      message: `Exported ${filteredData.length} trips to CSV`,
      color: "polestarOrange",
    });
  };

  const handleFileUpload = (file: File | null, type: 'vehicle' | 'charging') => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = JSON.parse(e.target?.result as string);
        // Map 'vehicle' to 'vts' and 'charging' to 'chronos' if needed by onDataLoaded
        // Assuming onDataLoaded expects 'vts' or 'chronos' based on previous context, 
        // but DashboardProps says 'type: string'. 
        // Let's check how App.tsx uses it. Usually it's 'vts' or 'chronos'.
        // Based on "Upload your vehicle status file (vts.json)", type should likely be 'vts'.
        const dataType = type === 'vehicle' ? 'vts' : 'chronos';
        onDataLoaded(dataType, content);
        notifications.show({ 
          title: 'Success', 
          message: `${type === 'vehicle' ? 'Vehicle' : 'Charging'} data uploaded successfully`, 
          color: 'polestarOrange' 
        });
      } catch (error) {
        notifications.show({ title: 'Error', message: 'Invalid JSON file', color: 'red' });
      }
    };
    reader.readAsText(file);
  };

  const navItems = [
    { value: "overview", label: "Dashboard", icon: IconChartBar },
    { value: "explorer", label: "Journey Explorer", icon: IconMap },
    { value: "analytics", label: "Analytics", icon: IconDeviceAnalytics },
    { value: "guide", label: "User Guide", icon: IconBook },
  ];

  const vehicleSubItems = [
    { value: "overview", label: "Overview", icon: IconGauge },
    { value: "health", label: "Health & Safety", icon: IconShieldCheck },
    { value: "air", label: "Air Quality", icon: IconWind },
    { value: "climate", label: "Climate", icon: IconTemperature },
    { value: "charging", label: "Charging", icon: IconBolt },
    { value: "stats", label: "Stats", icon: IconRoad },
  ];

  return (
    <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
      {/* Left Sidebar */}
      <Paper
        p="md"
        radius="md"
        withBorder
        style={{
          width: 280,
          minWidth: 280,
          position: "sticky",
          top: 80, // Adjust based on header height
          height: "calc(100vh - 100px)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Stack gap="md" style={{ flex: 1 }}>
          <Button
            leftSection={<IconArrowLeft size={16} />}
            variant="light"
            color="polestarGrey"
            onClick={onReset}
            fullWidth
          >
            Upload New File
          </Button>

          <Divider />

          <Stack gap={4}>
            <Text size="xs" fw={500} c="dimmed" mb={4}>
              ANALYTICS
            </Text>
            {navItems.slice(0, 1).map((item) => (
              <NavLink
                key={item.value}
                active={activeTab === item.value}
                label={item.label}
                leftSection={<item.icon size={18} stroke={1.5} />}
                onClick={() => setActiveTab(item.value)}
                variant="light"
                color="orange"
                style={{ borderRadius: "var(--mantine-radius-sm)" }}
              />
            ))}
            
            {/* Vehicle Status with nested sub-navigation */}
            <NavLink
              active={activeTab === "vehicle"}
              label="Vehicle Status"
              leftSection={<IconCar size={18} stroke={1.5} />}
              variant="light"
              color="orange"
              opened={activeTab === "vehicle"}
              style={{ borderRadius: "var(--mantine-radius-sm)" }}
              onClick={() => {
                setActiveTab("vehicle");
              }}
            >
              {vehicleSubItems.map((sub) => (
                <NavLink
                  key={sub.value}
                  active={activeTab === "vehicle" && activeVehicleTab === sub.value}
                  label={sub.label}
                  leftSection={<sub.icon size={16} stroke={1.5} />}
                  onClick={() => {
                    setActiveTab("vehicle");
                    setActiveVehicleTab(sub.value);
                  }}
                  variant="light"
                  color="orange"
                  style={{ borderRadius: "var(--mantine-radius-sm)" }}
                />
              ))}
            </NavLink>

            {navItems.slice(1).map((item) => (
              <NavLink
                key={item.value}
                active={activeTab === item.value}
                label={item.label}
                leftSection={<item.icon size={18} stroke={1.5} />}
                onClick={() => setActiveTab(item.value)}
                variant="light"
                color="orange"
                style={{ borderRadius: "var(--mantine-radius-sm)" }}
              />
            ))}
          </Stack>

          <Divider />

          <Stack gap={4}>
            <Text size="xs" fw={500} c="dimmed" mb={4}>
              TOOLS
            </Text>
            <NavLink
              label="Cost Calculator"
              leftSection={<IconCurrencyDollar size={18} stroke={1.5} />}
              onClick={() => setCostModalOpened(true)}
              variant="subtle"
              style={{ borderRadius: "var(--mantine-radius-sm)" }}
            />
            <NavLink
              label="Export CSV"
              leftSection={<IconDownload size={18} stroke={1.5} />}
              onClick={exportToCSV}
              variant="subtle"
              style={{ borderRadius: "var(--mantine-radius-sm)" }}
            />
          </Stack>

          <div style={{ marginTop: "auto" }}>
            <Filters data={data} onFilterChange={handleFilterChange} />
          </div>
        </Stack>
      </Paper>

      {/* Main Content */}
      <Stack gap="lg" style={{ flex: 1, minWidth: 0 }}>
        {activeTab !== "overview" && <StatsCards statistics={statistics} hideCostButton />}

        <Box style={{ position: "relative" }}>
            {activeTab === "overview" && (
              <Stack gap="lg">
                <StatsCards statistics={statistics} />
                <ChartsView data={filteredData} />
              </Stack>
            )}

            {activeTab === "vehicle" && (
              vehicleStatusData ? (
                <VehicleStatus 
                  telematics={vehicleStatusData.telematics} 
                  charging={chargingData}
                  activeTab={activeVehicleTab}
                  onUpload={(file) => handleFileUpload(file, 'charging')}
                />
              ) : (
                <Paper p="xl" withBorder radius="md" ta="center">
                  <Stack align="center">
                    <IconCar size={48} stroke={1.5} color="var(--mantine-color-polestarGrey-5)" />
                    <Title order={3}>No Vehicle Data</Title>
                    <Text c="dimmed" maw={400}>
                      Upload your vehicle status file (vts.json) to see battery, service, and location information.
                    </Text>
                    <FileButton onChange={(file) => handleFileUpload(file, 'vehicle')} accept="application/json">
                      {(props) => (
                        <Button 
                          {...props} 
                          variant="light" 
                          color="polestarOrange" 
                          leftSection={<IconUpload size={16} />}
                        >
                          Upload vts.json
                        </Button>
                      )}
                    </FileButton>
                  </Stack>
                </Paper>
              )
            )}

            {activeTab === "explorer" && (
              <JourneyExplorer data={data} />
            )}

            {activeTab === "analytics" && (
              <AnalyticsView data={filteredData} />
            )}
          {activeTab === "guide" && <DataGuide />}
        </Box>
      </Stack>

      <HelpModal opened={helpOpened} onClose={() => setHelpOpened(false)} />
      <CostCalculatorModal
        opened={costModalOpened}
        onClose={() => setCostModalOpened(false)}
        statistics={statistics}
      />
    </div>
  );
}

export default Dashboard;
