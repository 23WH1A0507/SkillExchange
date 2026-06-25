import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/auth': 'https://skill-exchange-epm8.vercel.app',
      '/api': 'https://skill-exchange-epm8.vercel.app',
    }
  }
})
