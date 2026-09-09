import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
// @ts-ignore
import { app as apiServer } from './server/index.js';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'kisan-setu-api-middleware',
      configureServer(server) {
        server.middlewares.use(apiServer);
      },
    },
  ],
});
