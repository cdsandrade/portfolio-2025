import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import pugPlugin from 'vite-plugin-pug'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [vue(), pugPlugin()],
    server: {
      port: parseInt(env.VITE_PORT) || 5173
    },
    preview: {
      port: parseInt(env.VITE_PORT) || 4173
    },
    test: {
      globals: true,        // optional: use test/expect/etc. without import
      environment: 'jsdom', // simulates DOM for Vue components
      setupFiles: './tests/setup/msw.js' // optional: mock API setup
    }
  }
})
