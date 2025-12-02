import { DataValidator } from './app/src/utils/DataValidator.js';

// Mock Data
const mockData = [
    {
        id: 0,
        startDate: '2025-07-18',
        distanceKm: 20,
        consumptionKwh: 675831, // Anomaly: Extreme consumption
        efficiency: 3379155,
        tripType: 'SINGLE'
    },
    {
        id: 1,
        startDate: '2025-07-19',
        distanceKm: 50,
        consumptionKwh: 10,
        efficiency: 20, // Normal
        tripType: 'SINGLE'
    },
    {
        id: 2,
        startDate: '2025-07-20',
        distanceKm: 0.1,
        consumptionKwh: 5,
        efficiency: 5000, // Anomaly: High efficiency (bad calculation)
        tripType: 'SINGLE'
    }
];

console.log('--- Starting Verification ---');

// 1. Test Validation
console.log('Running DataValidator.validate()...');
const anomalies = DataValidator.validate(mockData);

console.log(`Found ${anomalies.length} anomalies.`);

if (anomalies.length !== 2) {
    console.error('FAILED: Expected 2 anomalies.');
    process.exit(1);
}

const anomaly1 = anomalies.find(a => a.tripIndex === 0);
if (!anomaly1 || !anomaly1.issues[0].includes('Extreme energy consumption')) {
    console.error('FAILED: Did not detect extreme consumption.');
    process.exit(1);
}

console.log('PASSED: Validation logic detected correct anomalies.');

// 2. Test Correction Logic (Simulation of FileUploader logic)
console.log('Testing Correction Logic...');

// Mock User Corrections
const corrections = [
    {
        tripIndex: 0,
        action: 'correct',
        newData: {
            distanceKm: 20,
            consumptionKwh: 6.7 // Corrected value
        }
    },
    {
        tripIndex: 2,
        action: 'skip',
        newData: null
    }
];

const correctionMap = new Map(corrections.map(c => [c.tripIndex, c]));

const finalData = mockData.map((trip, index) => {
    const correction = correctionMap.get(index);
    if (!correction) return trip;
    
    if (correction.action === 'skip') return null;
    if (correction.action === 'correct' && correction.newData) {
        return {
            ...trip,
            ...correction.newData,
            efficiency: ((correction.newData.consumptionKwh / correction.newData.distanceKm) * 100).toFixed(2)
        };
    }
    return trip;
}).filter(trip => trip !== null);

console.log(`Final data length: ${finalData.length}`);

if (finalData.length !== 2) {
    console.error('FAILED: Expected 2 records after skipping one.');
    process.exit(1);
}

const correctedTrip = finalData.find(t => t.id === 0);
if (correctedTrip.consumptionKwh !== 6.7) {
    console.error('FAILED: Correction not applied.');
    process.exit(1);
}

console.log('PASSED: Correction logic works as expected.');
console.log('--- Verification Complete ---');
