import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: '../tests/API',
  timeout: 10 * 1000,
  retries: 0,
})
