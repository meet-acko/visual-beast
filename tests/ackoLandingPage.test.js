const LandingPage = require("../pages/landing.page");

const pages = {
    landingPage : new LandingPage()
}

describe('Ackodev visual testing', () => {
    it('all landing pages visual testing from csv reading', async () => {
        await pages.landingPage.visualTestForLandingPages("Acko URLs");
    }, 100000);
});