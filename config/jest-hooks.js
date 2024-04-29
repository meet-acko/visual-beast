const { toMatchImageSnapshot } = require('jest-image-snapshot');
const { properties } = require('../utils/config');
const { getDriver, closeDriver } = require('../utils/driverSetUp');
const { Helper } = require('../utils/helper');

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
                global.driver = await getDriver();
                await Helper.setDriver(await global.driver);
                global.page = await global.driver.newPage()
                await global.page.setDefaultTimeout(3*60*60*1000);
                await Helper.setPage(await global.page);
                break;
            }
            case "webdriverio" : {
                global.driver = await getDriver();
                await Helper.setDriver(await global.driver);
                await global.driver.url("https://www.ackodev.com/");
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
