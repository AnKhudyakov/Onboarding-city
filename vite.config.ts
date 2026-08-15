import path from 'path'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Mirrors the "paths" entry in tsconfig.app.json.
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    // The Pixi renderer alone is around 520 kB minified, 157 kB gzipped. That is the floor for a
    // WebGL demo and splitting it would only delay the first frame, so the warning is raised
    // rather than worked around.
    chunkSizeWarningLimit: 600,
  },
  css: {
    preprocessorOptions: {
      scss: {
        // Lets stylesheets @use 'shared/styles/...' without relative path chains.
        loadPaths: [path.resolve(__dirname, 'src')],
      },
    },
  },
})
