const { toMatchImageSnapshot } = require('jest-image-snapshot');
const { properties } = require('../utils/config');
const { getDriver, closeDriver } = require('../utils/driverSetUp');
const { Helper } = require('../utils/helper');
let driver;

expect.extend({ 
    toMatchImageSnapshot(received, options) {
        const customConfig = {
            customSnapshotsDir: `${__dirname}/../results`,
                ...options,
            };
        return toMatchImageSnapshot.call(this, received, customConfig);
    } 
});

beforeAll(async function() {
});

beforeEach(async () => {
    if(properties.configType == "web"){
        switch (properties.driverType) {
            case "playwright" : {
                driver = await getDriver();
                await Helper.setDriver(await driver);
                let page = await driver.newPage()
                await page.setDefaultTimeout(3*60*60*1000);
                await Helper.setPage(await page);
                break;
            }
            case "webdriverio" : {
                driver = await getDriver();
                await Helper.setDriver(await driver);
                await driver.url("https://www.ackodev.com/");
                break;
            }
        }
    }
});

afterAll(async () => {
    
});

afterEach(async () => {
    await closeDriver(await Helper.getDriver());
    await Helper.verifySoftAssert();
});
