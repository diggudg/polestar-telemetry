// @ts-nocheck

import { Button, Paper, Stack, Text, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconCar, IconUpload } from '@tabler/icons-react';
import { useState } from 'react';
import AnomalyCorrectionModal from './components/AnomalyCorrectionModal';
import AnalyticsView from './components/analytics/AnalyticsView';
import Dashboard from './components/Dashboard';
import FileUploadModal from './components/FileUploadModal';
import JourneyExplorer from './components/JourneyExplorer';
import MainLayout from './components/Layout/MainLayout';
import TripPlanner from './components/TripPlanner/TripPlanner';
import VehicleStatus from './components/vehicle/VehicleStatus';
import { DataValidator } from './utils/DataValidator';

function App() {
  const [journeyData, setJourneyData] = useState(null);
  const [vehicleStatusData, setVehicleStatusData] = useState(null);
  const [chargingData, setChargingData] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [uploadModalOpened, { open: openUploadModal, close: closeUploadModal }] =
    useDisclosure(false);
  const [costCalculatorSignal, setCostCalculatorSignal] = useState(0);

  const [anomalies, setAnomalies] = useState([]);
  const [pendingJourneyData, setPendingJourneyData] = useState(null);
  const [anomalyModalOpened, { open: openAnomalyModal, close: closeAnomalyModal }] =
    useDisclosure(false);

  const handleDataLoaded = (type, data) => {
    if (type === 'journey') {
      const issues = DataValidator.validate(data);
      if (issues.length > 0) {
        setAnomalies(issues);
        setPendingJourneyData(data);
        openAnomalyModal();
      } else {
        setJourneyData(data);
      }
    }
    if (type === 'vehicle' || type === 'vts') setVehicleStatusData(data);
    if (type === 'charging' || type === 'chronos') setChargingData(data);
  };

  const handleAnomalyCorrection = (corrections) => {
    const cleanedData = [...pendingJourneyData];

    const indicesToRemove = new Set();
    const updates = new Map();

    corrections.forEach((c) => {
      if (c.action === 'skip') {
        indicesToRemove.add(c.tripIndex);
      } else if (c.action === 'correct') {
        updates.set(c.tripIndex, c.newData);
      }
    });

    const finalData = cleanedData
      .filter((_item, index) => !indicesToRemove.has(index))
      .map((item, index) => {
        if (indicesToRemove.has(index)) return null;

        if (updates.has(index)) {
          return { ...item, ...updates.get(index) };
        }
        return item;
      })
      .filter(Boolean);

    setJourneyData(finalData);
    setPendingJourneyData(null);
    setAnomalies([]);
    closeAnomalyModal();
  };

  const openCostCalculator = () => {
    setActiveTab('overview');
    setCostCalculatorSignal((prev) => prev + 1);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return journeyData ? (
          <Dashboard data={journeyData} costCalculatorSignal={costCalculatorSignal} />
        ) : (
          <Paper p="xl" withBorder radius="md" ta="center" mt="xl">
            <Stack align="center" gap="md">
              <IconUpload size={48} stroke={1.5} color="var(--mantine-color-polestarGrey-5)" />
              <Title order={3}>No Journey Data</Title>
              <Text c="dimmed" maw={400}>
                Upload your journey log file (csv/xlsx) to see your dashboard.
              </Text>
              <Button
                variant="light"
                color="polestarOrange"
                leftSection={<IconUpload size={16} />}
                onClick={openUploadModal}
              >
                Upload Data
              </Button>
            </Stack>
          </Paper>
        );
      case 'explorer':
        return journeyData ? (
          <JourneyExplorer data={journeyData} />
        ) : (
          <Paper p="xl" withBorder radius="md" ta="center" mt="xl">
            <Text c="dimmed">Please upload journey data to view the explorer.</Text>
          </Paper>
        );

      case 'planner':
        return <TripPlanner />;
      case 'analytics':
        return journeyData ? (
          <AnalyticsView data={journeyData} />
        ) : (
          <Paper p="xl" withBorder radius="md" ta="center" mt="xl">
            <Text c="dimmed">Please upload journey data to view analytics.</Text>
          </Paper>
        );
      case 'vehicle':
      case 'charging':
      case 'health': {
        let subTab = 'overview';
        if (activeTab === 'charging') subTab = 'charging';
        if (activeTab === 'health') subTab = 'health';

        return vehicleStatusData ? (
          <VehicleStatus
            telematics={vehicleStatusData.telematics}
            charging={chargingData}
            activeTab={subTab}
            onUpload={(_file) => {
              openUploadModal();
            }}
          />
        ) : (
          <Paper p="xl" withBorder radius="md" ta="center" mt="xl">
            <Stack align="center">
              <IconCar size={48} stroke={1.5} color="var(--mantine-color-polestarGrey-5)" />
              <Title order={3}>No Vehicle Data</Title>
              <Text c="dimmed" maw={400}>
                Upload your vehicle status file (vts.json) to see battery, service, and location
                information.
              </Text>
              <Button
                variant="light"
                color="polestarOrange"
                leftSection={<IconUpload size={16} />}
                onClick={openUploadModal}
              >
                Upload vts.json
              </Button>
            </Stack>
          </Paper>
        );
      }
      default:
        return null;
    }
  };

  return (
    <MainLayout
      activeTab={activeTab}
      onTabChange={setActiveTab}
      onUploadClick={openUploadModal}
      onCostCalculatorClick={openCostCalculator}
    >
      {renderContent()}
      <FileUploadModal
        opened={uploadModalOpened}
        onClose={closeUploadModal}
        onDataLoaded={handleDataLoaded}
      />
      <AnomalyCorrectionModal
        opened={anomalyModalOpened}
        onClose={closeAnomalyModal}
        anomalies={anomalies}
        onApply={handleAnomalyCorrection}
      />
    </MainLayout>
  );
}

export default App;
