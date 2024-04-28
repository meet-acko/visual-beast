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
                            return await chromium.launch({ headless: false, args: ['--window-size=1920,1080'] });
                        }
                        case "headless" : {
                            return await chromium.launch({ headless: true, args: ['--window-size=1920,1080'] });
                        }
                    }
                }
                case "api" : {
                    return;
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
                                    browserName: 'chrome',
                                    'goog:chromeOptions': {
                                        args: ['--window-size=1920,1080']  // Start Chrome maximized
                                    }
                                }
                            });
                        }
                        case "headless" : {
                            return await remote({
                                capabilities: {
                                    browserName: 'chrome',
                                    'goog:chromeOptions': {
                                        args: ['--headless', '--window-size=1920,1080']
                                    }
                                }
                            });
                        }
                    }
                }
                case "api" : {
                    return;
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