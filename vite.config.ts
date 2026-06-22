import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const apiTarget = process.env.VITE_PROXY_TARGET ?? 'http://localhost:8002/api'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/auth': apiTarget,
      '/appconfig': apiTarget,
      '/orders': apiTarget,
      '/report_template': apiTarget,
      '/user_mapping': apiTarget,
      '/documents': apiTarget,
    },
  },
})
