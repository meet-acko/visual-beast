module.exports = {
    testEnvironment: './config/custom-webdriverio-playwright-environment.js',
    setupFilesAfterEnv: ["./config/jest-hooks.js"],
    rootDir: '../',
    testTimeout: 3*60*60*1000
};