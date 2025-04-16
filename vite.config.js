import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    origin: 'https://5173-geniusseeke-rockitwomen-rktazllxb34.ws-us118.gitpod.io',
    allowedHosts: 'all',
  },
});


