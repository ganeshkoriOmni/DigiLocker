import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 60000,
  },
  server: {
    port: 2015,
    host: '0.0.0.0',
  },
  assetsInclude: ['**/*.xlsx']
})
