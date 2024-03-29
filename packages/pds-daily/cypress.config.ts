import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    specPattern: 'cypress/e2e/**/*.{cy,spec}.{js,jsx,ts,tsx}',
    baseUrl: 'http://localhost:5173',
  },
  component: {
    viewportWidth: 1920,
    viewportHeight: 1080,
    devServer: {
      framework: 'vue',
      bundler: 'vite',
    },
  },
})
