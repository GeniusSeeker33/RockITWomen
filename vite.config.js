import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    strictPort: true,
    allowedHosts: [
      // 👇 Add your actual Gitpod host here
      '5173-geniusseeke-rockitwomen-rktazllxb34.ws-us118.gitpod.io'
    ]
  }
});




