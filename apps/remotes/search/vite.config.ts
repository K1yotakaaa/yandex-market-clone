import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { federation } from '@module-federation/vite';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'search',
      filename: 'remoteEntry.js',
      exposes: {
        './SearchPage': './src/SearchPage.tsx',
      },
      shared: {
        react: { singleton: true, eager: true },
        'react-dom': { singleton: true, eager: true },
        '@marketplace/shared-state': { singleton: true },
        '@marketplace/shared-types': { singleton: true },
      },
    }),
  ],
  server: {
    port: 5003,
    strictPort: true,
    cors: true,
    origin: 'http://localhost:5003',
  },
  preview: { port: 5003, strictPort: true },
  base: 'http://localhost:5003/',
  build: { target: 'chrome89' },
});