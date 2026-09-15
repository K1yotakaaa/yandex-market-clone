import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { federation } from '@module-federation/vite';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'shell',
      remotes: {
        header: {
          type: 'module',
          name: 'header',
          entry: 'http://localhost:5001/remoteEntry.js',
        },
      },
      shared: {
        react: { singleton: true },
        'react-dom': { singleton: true },
      },
    }),
  ],
  server: { port: 5000, strictPort: true },
  preview: { port: 5000, strictPort: true },
  build: { target: 'chrome89' },
});