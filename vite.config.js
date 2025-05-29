import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import mkcert from 'vite-plugin-mkcert'
import fs from 'fs'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server:{
    host: '0.0.0.0',
    port: 3000,
    https: {
      key:fs.readFileSync('localhost+1-key.pem'),
      cert:fs.readFileSync('localhost+1.pem')
    }
  }
})
