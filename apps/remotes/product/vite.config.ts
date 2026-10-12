import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { federation } from '@module-federation/vite';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'product',
      filename: 'remoteEntry.js',
      exposes: {
        './ProductPage': './src/ProductPage.tsx',
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
    port: 5004,
    strictPort: true,
    cors: true,
    origin: 'http://localhost:5004',
  },
  preview: { port: 5004, strictPort: true },
  base: 'http://localhost:5004/',
  build: { target: 'chrome89' },
});