const { devices } = require('@playwright/test');

module.exports = {
  outputDir: '../results',
  testDir: '../tests',
  testMatch: '**/*.test.js',
  timeout: 30000,
  expect: {
    timeout: 5000
  },
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
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