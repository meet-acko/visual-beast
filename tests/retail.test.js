const { driver } = require("../config/jest-setup");
const BasePage = require("../pages/base.page");
const HomePage = require("../pages/home.page");
const RetailPage = require("../pages/retail.page");

const pages = {
    basePage : new BasePage(),
    homePage : new HomePage(),
    retailPage : new RetailPage()
}

describe('Health retail visual testing suite', () => {
    it('Health retail buy journey visual testing using playwright', async () => {
        let mobileNumber = pages.basePage.mobileNumber();
        await pages.homePage.webLoginPlaywright(mobileNumber);
    }, 50000);
    
    it.only('Health retail buy journey visual testing using webdriverio', async () => {
        let mobileNumber = pages.basePage.mobileNumber();
        await pages.homePage.webLogin(mobileNumber);
    }, 50000);
});