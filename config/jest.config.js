module.exports = {
    testEnvironment: './config/custom-webdriverio-playwright-environment.js',
    setupFilesAfterEnv: ["./config/jest-setup.js"],
    rootDir: '../',
    testTimeout: 3*60*60*1000
};