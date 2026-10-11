import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { federation } from '@module-federation/vite';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'main',
      filename: 'remoteEntry.js',
      exposes: {
        './MainPage': './src/MainPage.tsx',
      },
      shared: {
        react: { singleton: true, eager: true },
        'react-dom': { singleton: true, eager: true },
      },
    }),
  ],
  server: {
    port: 5002,
    strictPort: true,
    cors: true,
    origin: 'http://localhost:5002',
  },
  preview: { port: 5002, strictPort: true },
  base: 'http://localhost:5002/',
  build: { target: 'chrome89' },
});