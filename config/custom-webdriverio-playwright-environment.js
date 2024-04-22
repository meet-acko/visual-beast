const { default: NodeEnvironment } = require('jest-environment-node');
const { remote } = require('webdriverio');
const { chromium } = require('playwright');
const propertyReader = require("properties-reader");
const properties = new propertyReader(__dirname + "/config.properties");

class CustomEnvironment extends NodeEnvironment {
  async setup() {
    await super.setup();
    switch (properties.get("driverType")) {
      case "playwright" : {
          switch (properties.get("configType")) {
            case "web" : {
              switch (properties.get("executionMode")) {
                case "headed" : {
                  this.global.driver = await chromium.launch({ headless: false });
                  break;
                }
                case "headless" : {
                  this.global.driver = await chromium.launch({ headless: true });
                  break;
                }
              }
              break;
            }
          }
          break;
        }
      case "webdriverio" : {
        switch (properties.get("configType")) {
          case "web" : {
            switch (properties.get("executionMode")) {
              case "headed" : {
                this.global.driver = await remote({
                  capabilities: {
                    browserName: 'chrome'
                  }
                });
                break;
              }
              case "headless" : {
                this.global.driver = await remote({
                  capabilities: {
                    browserName: 'chrome',
                    'goog:chromeOptions': {
                        args: ['--headless']
                    }
                  }
                });
                break;
              }
            }
            break;
          }
        }
        break;
        }
    }
  }

  async teardown() {
    await super.teardown();
  }
}

module.exports = CustomEnvironment;