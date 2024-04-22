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
    switch (properties.driverType) {
        case "playwright" : {
            driver = await getDriver();
            await Helper.setDriver(await driver);
            await Helper.setPage(await driver.newPage());
            break;
        }
        case "webdriverio" : {
            driver = await getDriver();
            await Helper.setDriver(await driver);
            await driver.url("https://www.ackodev.com/");
            break;
        }
    }
});

afterAll(async () => {
    
});

afterEach(async () => {
    await closeDriver(await Helper.getDriver());
});
