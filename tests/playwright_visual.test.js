const { test, expect } = require('@playwright/test');
const LandingPage = require("../pages/landing.page");

const pages = {
    landingPage : new LandingPage()
}

// Use below command to run this script in playwright
// npx playwright test tests/playwright_visual.test.js --config=config/playwright.config.js

test('homepage visual test', async ({ page }, testInfo) => {
    await pages.landingPage.visualTestForLandingPagesInPlaywright("Acko URLs", await page);
});