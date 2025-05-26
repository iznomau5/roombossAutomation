import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: '../tests/UI',
  timeout: 30 * 1000,
  retries: 0,
  use: {
    headless: true,
    baseURL: '',
    screenshot: 'on',
    video: 'retain-on-failure',
    viewport: { width: 1680, height: 1050 },
  },
  // expect: {
  //   toMatchSnapshot: {
  //     threshold: 0.1,
  //   }
  // },
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
      name: 'WebKit',
      use: {
        browserName: 'webkit',
      },
    },
  ],
})
