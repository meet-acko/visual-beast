module.exports = {
    testEnvironment: './config/custom-webdriverio-playwright-environment.js',
    setupFilesAfterEnv: ["./config/jest-setup.js"],
    rootDir: '../',
    // testMatch: [
    //     "test/**.js", // Matches any .js file inside any folder under the 'test' directory
    // ]
    // Additional Jest configurations
};