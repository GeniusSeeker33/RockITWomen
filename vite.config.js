import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    allowedHosts: 'all', // ✅ This allows *any* Gitpod subdomain
    origin: 'https://5173-fatemeghala-reacttailwi-54w5kih0j1c.ws-us118.gitpod.io'
  },
});
