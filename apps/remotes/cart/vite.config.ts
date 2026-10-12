import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { federation } from '@module-federation/vite';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'cart',
      filename: 'remoteEntry.js',
      exposes: {
        './CartPage': './src/CartPage.tsx',
        './FavoritesPage': './src/FavoritesPage.tsx',
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
    port: 5006,
    strictPort: true,
    cors: true,
    origin: 'http://localhost:5006',
  },
  preview: { port: 5006, strictPort: true },
  base: 'http://localhost:5006/',
  build: { target: 'chrome89' },
});