import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [vue()],

  server: {
    host: 'localhost',
    port: 5173,
    strictPort: true,
    cors: true,
    headers: {
      // header "vazio" ou permissivo para desenvolvimento
      "Content-Security-Policy": "default-src *; connect-src *; img-src * blob: data:; style-src * 'unsafe-inline';"
    }
  },

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
