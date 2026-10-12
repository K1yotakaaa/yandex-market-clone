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
        main: {
          type: 'module',
          name: 'main',
          entry: 'http://localhost:5002/remoteEntry.js',
        },
        search: {
          type: 'module',
          name: 'search',
          entry: 'http://localhost:5003/remoteEntry.js',
        },
        product: { 
          type: 'module', 
          name: 'product', 
          entry: 'http://localhost:5004/remoteEntry.js' 
        },
        about: {
          type: 'module',
          name: 'about',
          entry: 'http://localhost:5017/remoteEntry.js',
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