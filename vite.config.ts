import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, 'src'),
      '@designcodeio/threeui/style.css': path.resolve(import.meta.dirname, 'src/shaders/threeui.css'),
      '@designcodeio/threeui': path.resolve(import.meta.dirname, 'src/shaders/threeui-index.tsx'),
    },
  },
})
