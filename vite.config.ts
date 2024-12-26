import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: 'https://bhmt.github.io/leavemealone/',
  server: {
    port: 8000,
  }
})
