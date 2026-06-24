import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/auth': 'http://localhost:8000',
      '/user': 'http://localhost:8000',
      '/chat': 'http://localhost:8000',
      '/message': 'http://localhost:8000',
      '/request': 'http://localhost:8000',
      '/report': 'http://localhost:8000',
      '/rating': 'http://localhost:8000',
    },
  },
})
