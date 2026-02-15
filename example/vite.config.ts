import { resolve } from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@docs-ui': resolve(__dirname, '../docs/src/components/ui'),
      '@/lib': resolve(__dirname, '../docs/src/lib'),
      // Force single React instance to prevent "Invalid hook call" errors
      react: resolve(__dirname, './node_modules/react'),
      'react-dom': resolve(__dirname, './node_modules/react-dom'),
    },
  },
})
