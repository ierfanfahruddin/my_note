import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      '3b60-112-215-172-202.ngrok-free.app' // Tambahkan URL ngrok di sini
    ]
  }
})
