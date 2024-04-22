const { test, expect } = require('@playwright/test');

test('homepage visual test', async ({ page }, testInfo) => {
    await page.goto('https://www.acko.com/two-wheeler-insurance/');
    await expect(page).toHaveScreenshot({ fullPage: true, maxDiffPixels: 100 });
    await page.goto('https://www.ackodev.com/two-wheeler-insurance/');
    await expect(page).toHaveScreenshot({ fullPage: true, maxDiffPixels: 100 });
}); 