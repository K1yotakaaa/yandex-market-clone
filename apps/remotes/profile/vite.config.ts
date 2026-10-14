import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { federation } from '@module-federation/vite';

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    federation({
      name: 'profile',
      filename: 'remoteEntry.js',
      exposes: {
        './ProfileApp': './src/ProfileApp.tsx',
      },
      shared: {
        react: { singleton: true, eager: true },
        'react-dom': { singleton: true, eager: true },
        '@marketplace/shared-state': { singleton: true },
      },
    }),
  ],
  css: {
    modules: {
      // Prefixed class names so the remote never collides with the shell or other remotes.
      generateScopedName:
        mode === 'production' ? 'pf_[hash:base64:6]' : 'pf_[name]_[local]_[hash:base64:4]',
    },
  },
  server: {
    port: 5007,
    strictPort: true,
    cors: true,
    origin: 'http://localhost:5007',
  },
  preview: { port: 5007, strictPort: true },
  base: 'http://localhost:5007/',
  build: { target: 'chrome89' },
}));
