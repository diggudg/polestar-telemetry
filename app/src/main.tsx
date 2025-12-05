import { createTheme, MantineProvider, rem } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import '@mantine/core/styles.css';
import '@mantine/charts/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/dropzone/styles.css';
import '@mantine/dates/styles.css';
import './mobile.css';
import { MantineColors } from './theme/colors';

const theme = createTheme({
  primaryColor: 'polestarOrange',
  colors: {
    polestarOrange: MantineColors.polestarOrange,
    polestarRed: MantineColors.polestarRed,
    polestarGrey: MantineColors.polestarGrey,
    polestarGreen: MantineColors.polestarGreen,
    polestarCyan: MantineColors.polestarCyan,
    polestarYellow: MantineColors.polestarYellow,
    orange: MantineColors.polestarOrange,
    red: MantineColors.polestarRed,
    green: MantineColors.polestarGreen,
    cyan: MantineColors.polestarCyan,
    yellow: MantineColors.polestarYellow,
    dark: [
      '#C8C9C7',
      '#B1B3B3',
      '#97999B',
      '#75787B',
      '#53565A',
      '#3A3C3F',
      '#25262B',
      '#1A1B1E',
      '#141517',
      '#101113',
    ],
  },
  fontFamily: 'Inter, sans-serif',
  headings: {
    fontFamily: 'Inter, sans-serif',
    sizes: {
      h1: { fontSize: rem(36) },
      h2: { fontSize: rem(30) },
      h3: { fontSize: rem(24) },
      h4: { fontSize: rem(20) },
      h5: { fontSize: rem(16) },
      h6: { fontSize: rem(14) },
    },
  },
  defaultRadius: 'md',
  components: {
    Button: {
      defaultProps: {
        fw: 500,
      },
    },
    Card: {
      defaultProps: {
        withBorder: true,
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <Notifications />
      <App />
    </MantineProvider>
  </React.StrictMode>
);
