# Polestar Telemetry - Complete Guide

**Author**: Digvijay Singh <diggudg@gmail.com>  
**Version**: 1.0.0  
**Last Updated**: December 5, 2025

---

## Table of Contents

- [Quick Start](#quick-start)
- [For Users](#for-users)
- [For Developers](#for-developers)
- [Architecture Overview](#architecture-overview)
- [Contributing](#contributing)

---

## Quick Start

### Try It Now

1. Visit: `https://diggudg.github.io/polestar-telemetry/`
2. Upload your CSV or XLSX journey log file
3. Explore your data with interactive charts, maps, and tables

### Run Locally

```bash
git clone https://github.com/diggudg/polestar-telemetry.git
cd polestar-telemetry/app
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## For Users

### What is Polestar Telemetry?

A web-based dashboard for analyzing your electric vehicle journey data. Upload your CSV/XLSX files and explore comprehensive statistics, visualizations, and insights—all processed locally in your browser with complete privacy.

### Key Features

- **📊 Statistics Dashboard**: 11+ key metrics including carbon savings
- **📈 Interactive Charts**: Distance, consumption, and efficiency trends
- **🗺️ Map View**: Geographic trip visualization with route linking
- **📋 Data Table**: Searchable, sortable, filterable trip list
- **🌓 Dark/Light Theme**: Toggle for comfortable viewing
- **📱 Responsive Design**: Works on desktop, tablet, and mobile
- **🔒 100% Private**: All data processing happens in your browser

### Uploading Your Data

**Supported Formats**: CSV (.csv) or Excel (.xlsx, .xls)

**Required Columns**:

- Start/End Date & Time
- Start/End Address
- Distance (km)
- Consumption (kWh)
- GPS Coordinates (latitude/longitude)
- Battery State of Charge (SOC)

**How to Upload**:

1. Drag and drop your file onto the upload area, or click to browse
2. Wait a few seconds for processing
3. Your dashboard appears automatically!

### Understanding the Dashboard

#### Statistics Cards

Eight key metrics displayed at the top:

1. **Total Trips**: Number of journeys in your log
2. **Total Distance**: Cumulative distance traveled (km)
3. **Total Consumption**: Total energy used (kWh)
4. **Average Efficiency**: Overall efficiency (kWh/100km)
5. **Best Efficiency**: Your most efficient trip
6. **Worst Efficiency**: Your least efficient trip
7. **Average Trip Distance**: Mean distance per trip
8. **Odometer Range**: Vehicle's odometer readings

#### Charts View

Five different visualizations:

1. **Daily Distance & Consumption** (Line Chart)
   - Shows distance and energy over time
   - Last 30 days of data

2. **Trip Distance Distribution** (Pie Chart)
   - Breakdown by distance ranges (0-5km, 5-10km, 10-20km, 20-50km, 50+km)

3. **Efficiency per Trip** (Bar Chart)
   - Color-coded by efficiency:
     - 🟢 Green: Excellent (< 15 kWh/100km)
     - 🟡 Yellow: Good (15-20 kWh/100km)
     - 🟠 Orange: Moderate (20-25 kWh/100km)
     - 🔴 Red: Poor (> 25 kWh/100km)

4. **Battery SOC Changes** (Line Chart)
   - Battery percentage at start/end of trips
   - Last 20 trips

5. **Daily Trip Count** (Bar Chart)
   - Number of trips per day

#### Map View

Interactive geographic visualization:

- **Trip Routes**: Lines connecting start and end points
- **Color-Coded Routes**: Routes colored by efficiency
- **Markers**: Start (circles) and end (stars) points
- **Popups**: Click markers for trip details
- **Trip Selector**: View all trips or select specific ones
- **Multiple Tile Layers**: OpenStreetMap, Stadia Maps, Vector Tiles

#### Table View

Detailed, sortable data grid:

- **Search**: Find trips by address or date
- **Sort**: Click column headers to sort
- **Filter**: Use dropdown to organize data
- **Color-Coded Efficiency**: Visual badges for easy identification

### Tips for Better Efficiency

**Factors Affecting Efficiency**:

- Weather (cold reduces efficiency)
- Speed (highway uses more energy)
- Terrain (hills increase consumption)
- Driving style (smooth acceleration helps)
- Climate control (heating/AC impacts range)
- Tire pressure (proper inflation improves efficiency)

**How to Improve**:

1. Identify inefficient trips (red-coded in charts/table)
2. Consider route alternatives
3. Optimize driving style (smooth acceleration/braking)
4. Precondition your car while plugged in during winter

### Troubleshooting

**File Won't Upload**

- Ensure file is CSV or XLSX format
- Check that file contains required columns
- Try converting XLSX to CSV or vice versa

**No Data Showing**

- Verify file contains valid journey data
- Check that Distance column has values > 0
- Ensure dates are in correct format

**Map Not Loading**

- Check internet connection (map tiles require internet)
- Verify trips have valid GPS coordinates
- Try selecting a specific trip from dropdown

**Performance Issues**

- Upload smaller data files (split by time period)
- Use a modern browser (Chrome, Firefox, Safari, Edge)
- Close other browser tabs to free memory

### Privacy & Security

- **No Server Upload**: All processing happens in your browser
- **No Storage**: Data is not saved or transmitted anywhere
- **Complete Privacy**: Your journey data never leaves your device
- **No Tracking**: No analytics or third-party services

---

## For Developers

### Technology Stack

**Core**:

- React 18.3.1 (UI framework)
- Vite 5.4.9 (build tool)
- Mantine UI 7.13.2 (component library)

**Data Processing**:

- PapaParse 5.4.1 (CSV parsing)
- XLSX 0.18.5 (Excel parsing)
- DayJS 1.11.13 (date handling)

**Visualization**:

- Recharts 2.12.7 (charts)
- OpenLayers (ol) 10.7.0 (maps)
- Tabler Icons 3.19.0 (icons)

### Project Structure

```
polestar-telemetry/
├── app/
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── Dashboard.tsx
│   │   │   ├── FileUploader.tsx
│   │   │   ├── StatsCards.tsx
│   │   │   ├── ChartsView.tsx
│   │   │   ├── MapView.tsx
│   │   │   └── TableView.tsx
│   │   ├── utils/           # Utility functions
│   │   │   └── dataParser.js
│   │   ├── App.tsx          # Root component
│   │   └── main.tsx         # Entry point
│   ├── public/              # Static assets
│   ├── index.html
│   ├── package.json
│   └── vite.config.ts
├── docs/                    # Documentation
└── README.md
```

### Development Workflow

**Setup**:

```bash
git clone https://github.com/diggudg/polestar-telemetry.git
cd polestar-telemetry/app
npm install
npm run dev
```

**Available Commands**:

```bash
npm run dev        # Start dev server (http://localhost:5173)
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run linter
npm run lint:fix   # Fix linting issues
npm run format     # Format code
npm run deploy     # Deploy to GitHub Pages
```

**Making Changes**:

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make your changes in `app/src/`
3. Test with sample CSV/XLSX files
4. Commit: `git commit -m "feat: your feature description"`
5. Push and create pull request

### Component Development

**Creating a New Component**:

```tsx
import { Paper, Title } from '@mantine/core';

function YourComponent({ data }) {
  return (
    <Paper p="md" withBorder>
      <Title order={3}>Your Component</Title>
      {/* Component content */}
    </Paper>
  );
}

export default YourComponent;
```

**Best Practices**:

- Use TypeScript for type safety
- Use `useMemo` for expensive calculations
- Use `useCallback` for function props
- Keep components focused and reusable
- Follow existing code style

### Data Flow

```
User Upload → File Parser → Data Validation → Data Transformation
→ Statistics Calculation → React State Update → Dashboard Render
→ Charts/Map/Table Display
```

### Building & Deployment

**Production Build**:

```bash
npm run build
```

**Manual Deployment**:

```bash
npm run deploy
```

**Automatic Deployment**:

- Push to `main` branch
- GitHub Actions automatically builds and deploys to GitHub Pages

### Configuration

**Vite Config** (`vite.config.ts`):

```typescript
export default defineConfig({
  plugins: [react()],
  base: '/',  // Update for your repo
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
});
```

**Mantine Theme** (`main.tsx`):

```tsx
<MantineProvider 
  defaultColorScheme="dark"
  theme={{
    primaryColor: 'blue',
  }}
>
```

---

## Architecture Overview

### System Design

**Client-Side Architecture**:

- 100% browser-based processing
- No backend infrastructure required
- Direct file parsing and in-memory data processing
- Can be hosted on any static file server

### Component Architecture

1. **App Component** (Root)
   - Application shell and state management
   - Manages journey data and upload status

2. **FileUploader Component**
   - Drag-and-drop interface
   - CSV and XLSX support
   - File validation and error handling

3. **Dashboard Component**
   - Tab-based navigation
   - Statistics overview
   - Orchestrates sub-components

4. **StatsCards Component**
   - Displays key metrics
   - Calculates aggregated statistics

5. **ChartsView Component**
   - Data visualization through charts
   - Five different chart types

6. **MapView Component**
   - Geographic visualization
   - Interactive map with trip routes
   - Multiple tile layer options

7. **TableView Component**
   - Tabular data display
   - Searchable, sortable, filterable

### Data Model

**Journey Record**:

```javascript
{
  id: number,
  startDate: string,
  endDate: string,
  startAddress: string,
  endAddress: string,
  distanceKm: number,
  consumptionKwh: number,
  startLat: number,
  startLng: number,
  endLat: number,
  endLng: number,
  socSource: number,
  socDestination: number,
  efficiency: number,  // Calculated
  socDrop: number      // Calculated
}
```

### Performance Considerations

- Large files (>1000 trips) processed in chunks
- Map limits displayed trips to 50 by default
- Statistics calculated with `useMemo`
- Chart data memoized to prevent recalculation
- Tree-shaking enabled via Vite

### Security

- Client-side only (no data transmission)
- Input validation for file types and data formats
- React automatically escapes content (XSS prevention)
- No API keys or credentials needed

---

## Contributing

### How to Contribute

1. **Report Bugs**: Open an issue with details
2. **Suggest Features**: Describe use case and proposed solution
3. **Submit Code**: Fork, create branch, make changes, submit PR
4. **Improve Docs**: Fix typos, clarify sections, add examples

### Code of Conduct

- Use welcoming and inclusive language
- Be respectful of differing viewpoints
- Accept constructive criticism gracefully
- Focus on what's best for the community

### Pull Request Process

1. Fork the repository
2. Create feature branch from `main`
3. Make your changes following coding standards
4. Test thoroughly with different datasets
5. Update documentation if needed
6. Submit pull request with clear description

### Coding Standards

**Naming Conventions**:

- Components: PascalCase (`MyComponent.tsx`)
- Variables: camelCase (`myVariable`)
- Constants: UPPER_SNAKE_CASE (`MAX_VALUE`)
- Functions: camelCase (`handleSubmit`)
- Booleans: Prefix with `is`, `has`, `should` (`isLoading`)

**Code Style**:

```tsx
// ✅ Use destructuring
function Component({ data, onUpdate }) { }

// ✅ Use arrow functions
const processData = (data) => data.filter(item => item.valid);

// ✅ Use template literals
const message = `Loaded ${count} items`;

// ✅ Use optional chaining
const value = data?.items?.[0]?.value;
```

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types**: feat, fix, docs, style, refactor, perf, test, chore

**Example**:

```
feat(charts): add pie chart for trip distribution

Add a new pie chart showing trip distance distribution
across different ranges (0-5km, 5-10km, etc.)

Closes #123
```

---

## Future Enhancements

### Planned Features

1. **Data Export**: Export analyzed data and reports
2. **Comparison Mode**: Compare multiple log files
3. **Advanced Filters**: Time range, efficiency range, location filters
4. **Heatmaps**: Density maps for frequently visited areas
5. **Route Optimization**: Suggest more efficient routes
6. **Carbon Footprint**: Enhanced environmental impact analysis
7. **Custom Categories**: User-defined trip categories
8. **PWA Support**: Offline functionality

### Technical Improvements

1. **Web Workers**: Offload parsing to background threads
2. **Virtual Scrolling**: Handle thousands of trips efficiently
3. **PDF Export**: Generate reports
4. **Internationalization**: Multi-language support
5. **Unit Tests**: Comprehensive test coverage
6. **E2E Tests**: Automated testing

---

## FAQ

**Q: Where does my data go?**  
A: Nowhere! All processing happens locally in your browser. Your data never leaves your device.

**Q: Can I use this on mobile?**  
A: Yes! The interface is responsive and works on tablets and phones.

**Q: What if my file format is different?**  
A: Ensure your file has similar columns to the expected format. You may need to rename or reformat columns in Excel before uploading.

**Q: Is there a file size limit?**  
A: No hard limit, but files with 1000+ trips may take longer to process.

**Q: Can I compare multiple files?**  
A: Not yet, but this feature is planned for future releases.

---

## Support

- **Issues**: [GitHub Issues](https://github.com/diggudg/polestar-telemetry/issues)
- **Discussions**: [GitHub Discussions](https://github.com/diggudg/polestar-telemetry/discussions)
- **Repository**: [github.com/diggudg/polestar-telemetry](https://github.com/diggudg/polestar-telemetry)

---

## License

MIT License - See [LICENSE](../LICENSE) file for details.

Copyright (c) 2025 Digvijay Singh <diggudg@gmail.com>

---

## Acknowledgments

- Polestar for creating amazing electric vehicles
- The open-source community for excellent libraries

---

**Built with ⚡ for Polestar drivers by the community**
