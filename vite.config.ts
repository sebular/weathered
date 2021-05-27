import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import tsconfigPaths from 'vite-tsconfig-paths'
import fs from 'fs'
import dotenv from 'dotenv'

dotenv.config()

const env = process.env
const appid = env['API_KEY']
const keyPath = env['SSL_KEY_PATH']
const certPath = env['SSL_CERT_PATH']

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh(), tsconfigPaths()],
  server: {
    host: '0.0.0.0',
    https: {
      key: fs.readFileSync(keyPath),
      cert: fs.readFileSync(certPath)
    },
    proxy: {
      '/open-weather': {
        target: 'https://api.openweathermap.org/data/2.5/onecall',
        changeOrigin: true,
        rewrite: (path: string): string => (
          `${path.replace(/^\/open-weather/, '')}&appid=${appid}`
        )
      }
    }
  }
})
