const { default: NodeEnvironment } = require('jest-environment-node');

class CustomEnvironment extends NodeEnvironment {
  async setup() {
    await super.setup();
  }

  async handleTestEvent(event, state) {
    if (await event.name === 'test_start') {
        // Set the current test name in an environment variable
        this.global.currentTestCaseName = await event.test.name;
    }
  }

  async teardown() {
    await super.teardown();
  }
}

module.exports = CustomEnvironment;