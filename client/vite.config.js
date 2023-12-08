// Start of JS file
// VITE config file;
// Connects the front-end to the back-end.
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5000,
    open: true,
    proxy: {
      '/generate-quote': 'http://localhost:5001/',
      '/graphql': {
        target: 'http://localhost:5001',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
// End of JS file