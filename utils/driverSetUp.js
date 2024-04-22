const { remote } = require('webdriverio');
const { chromium } = require('playwright');
const { properties } = require('./config');


exports.getDriver = async function getDriver(){
    switch (properties.driverType) {
        case "playwright" : {
            switch (properties.configType) {
                case "web" : {
                    switch (properties.executionMode) {
                        case "headed" : {
                            return await chromium.launch({ headless: false, args: ['--start-maximized'] });
                        }
                        case "headless" : {
                            return await chromium.launch({ headless: true });
                        }
                    }
                    break;
                }
            }
            break;
        }
        case "webdriverio" : {
            switch (properties.configType) {
                case "web" : {
                    switch (properties.executionMode) {
                        case "headed" : {
                            return await remote({
                                capabilities: {
                                    browserName: 'chrome'
                                }
                            });
                        }
                        case "headless" : {
                            return await remote({
                                capabilities: {
                                    browserName: 'chrome',
                                    'goog:chromeOptions': {
                                        args: ['--headless']
                                    }
                                }
                            });
                        }
                    }
                    break;
                }
            }
            break;
        }
    }
}
    
exports.closeDriver = async function closeDriver(driver){
    switch (properties.driverType) {
        case "playwright" : {
            switch (properties.configType) {
                case "web" : {
                    await driver.close();
                    break;
                }
            }
            break;
        }
        case "webdriverio" : {
            switch (properties.configType) {
                case "web" : {
                    await driver.deleteSession();
                    break;
                    }
                }
            break;
        }
    }
}