import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // vite.config.js
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8080', // Change 'localhost' to '127.0.0.1'
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
