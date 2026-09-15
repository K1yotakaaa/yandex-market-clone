import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { federation } from '@module-federation/vite';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'header',
      filename: 'remoteEntry.js',
      exposes: {
        './Header': './src/Header.tsx',
      },
      shared: {
        react: { singleton: true, eager: true },
        'react-dom': { singleton: true, eager: true },
      },
    }),
  ],
  server: {
    port: 5001,
    strictPort: true,
    cors: true,                          // ← new
    origin: 'http://localhost:5001',     // ← new
  },
  preview: {
    port: 5001,
    strictPort: true,
  },
  base: 'http://localhost:5001/',
  build: { target: 'chrome89' },
});