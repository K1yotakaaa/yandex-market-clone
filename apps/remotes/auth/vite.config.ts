import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { federation } from '@module-federation/vite';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'auth',
      filename: 'remoteEntry.js',
      exposes: {
        './AuthPage': './src/AuthPage.tsx',
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
    port: 5005,
    strictPort: true,
    cors: true,
    origin: 'http://localhost:5005',
  },
  preview: { port: 5005, strictPort: true },
  base: 'http://localhost:5005/',
  build: { target: 'chrome89' },
});