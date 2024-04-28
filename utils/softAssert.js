const playwright = require('@playwright/test');

class SoftAssert {
    constructor() {
        this.errors = [];
    }

    async assert(condition, message) {
        try {
            const chai = await import('chai');
            await chai.assert(condition, message);
        } catch (error) {
            await this.errors.push(error);
        }
    }

    async assertImage(image) {
        try {
            await expect(await image).toMatchImageSnapshot();
        } catch (error) {
            await this.errors.push(error);
        }
    }

    async assertHTML(pageSource){
        try {
            await expect(await pageSource).toMatchSnapshot();
        } catch (error) {
            await this.errors.push(error);
        }
    }

    async assertImageInPlaywright(page) {
        try {
            await playwright.expect(await page).toHaveScreenshot({ fullPage: true });
        } catch (error) {
            await this.errors.push(error);
        }
    }

    async verify() {
        if (this.errors.length > 0) {
            const errorMsg = await this.errors.map((err, index) => `Error ${index + 1}: ${err.message}`).join('\n');
            throw await new Error(`Soft Assert Errors:\n${errorMsg}`);
        }
    }
}

module.exports = SoftAssert;