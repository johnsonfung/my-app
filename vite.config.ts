import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/my-app/',
  server: {
    host: '0.0.0.0',
    allowedHosts: true,
  },
})
