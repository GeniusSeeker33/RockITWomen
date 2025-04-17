import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    global: 'window' // Ensure global context is correctly set
  },
  build: {
    target: 'esnext',
    commonjsOptions: {
      transformMixedEsModules: true
    }
  }
});





