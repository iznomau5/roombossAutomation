import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: '../tests/PixelMatching',
  timeout: 30 * 1000,
  retries: 0,
  use: {
    headless: true,
    baseURL: '',
    screenshot: 'on',
    video: 'retain-on-failure',
    viewport: { width: 1680, height: 1050 },
  },
  reporter: [['html', { open: 'never' }]],
   projects: [
    {
      name: 'Chrome',
      use: {
        browserName: 'chromium',
      },
    },
    {
      name: 'Firefox',
      use: {
        browserName: 'firefox',
      },
    },
    {
      name: 'Webkit',
      use: {
        browserName: 'webkit',
      },
    },
  ],
})
