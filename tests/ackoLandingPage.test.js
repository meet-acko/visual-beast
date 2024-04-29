const LandingPage = require("../pages/landing.page");

const pages = {
    landingPage : new LandingPage()
}

describe('Ackodev visual testing', () => {

    it('all landing pages visual testing from csv reading using playwright', async () => {
        await pages.landingPage.visualTestForLandingPagesUsingPlaywright("Acko URLs");
    });
});