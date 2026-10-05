import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { federation } from '@module-federation/vite';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'about',
      filename: 'remoteEntry.js',
      exposes: {
        './AboutPage': './src/AboutPage.tsx',
      },
      shared: {
        react: { singleton: true, eager: true },
        'react-dom': { singleton: true, eager: true },
      },
    }),
  ],
  server: {
    port: 5017,
    strictPort: true,
    cors: true,
    origin: 'http://localhost:5017',
  },
  preview: {
    port: 5017,
    strictPort: true,
  },
  base: 'http://localhost:5017/',
  build: { target: 'chrome89' },
});