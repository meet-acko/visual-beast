const { devices } = require('@playwright/test');

module.exports = {
  outputDir: '../results',
  testDir: '../tests',
  testMatch: '**/*.test.js',
  timeout: 3000000,
  expect: {
    timeout: 500000
  },
  use: {
    headless: true,
    viewport: { width: 1920, height: 1080 },
    actionTimeout: 0,
    outputDir: '../results',
  },
  projects: [
    {
      name: 'Chromium',
      use: {...devices['Desktop Chrome']},
    },
  ],
};