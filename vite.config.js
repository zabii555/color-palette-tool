import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // When deploying to GitHub Pages for project sites, set base to your repo name
  base: '/color-palette-tool/',
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
});
