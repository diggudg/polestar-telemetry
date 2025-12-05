import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const GH_PAGES_BASE = '/polestar-telemetry/';

export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' ? GH_PAGES_BASE : '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
});
