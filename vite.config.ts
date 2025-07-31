import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite configuration to build the React application.  We enable
// strict dev flags and leverage the built‑in JSX transform.  The
// public directory is copied to the output verbatim, which is where
// the service worker, manifest and static assets live.
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: true
  },
  server: {
    host: true,
    port: 5173
  }
});