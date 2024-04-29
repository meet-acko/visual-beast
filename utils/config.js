const propertyReader = require("properties-reader");
const properties = new propertyReader(__dirname + "/../config/config.properties");

exports.properties = {
    configType : process.env.configType ? process.env.configType : properties.get("configType"),
    executionMode : process.env.executionMode ? process.env.executionMode : properties.get("executionMode"),
    driverType : process.env.driverType ? process.env.driverType : properties.get("driverType"),
    
    masterDBHost : process.env.masterDBHost ? process.env.masterDBHost : properties.get("masterDBHost"),
    masterDBUsername : process.env.masterDBUsername ? process.env.masterDBUsername : properties.get("masterDBUsername"),
    masterDBPassword : process.env.masterDBPassword ? process.env.masterDBPassword : properties.get("masterDBPassword"),
    masterDBName : process.env.masterDBName ? process.env.masterDBName : properties.get("masterDBName"),
    masterDBPort : process.env.masterDBPort ? process.env.masterDBPort : properties.get("masterDBPort"),
    
    masterMySqlDBHost : process.env.masterMySqlDBHost ? process.env.masterMySqlDBHost : properties.get("masterMySqlDBHost"),
    masterMySqlDBUsername : process.env.masterMySqlDBUsername ? process.env.masterMySqlDBUsername : properties.get("masterMySqlDBUsername"),
    masterMySqlDBPassword : process.env.masterMySqlDBPassword ? process.env.masterMySqlDBPassword : properties.get("masterMySqlDBPassword"),
    
    appiumPort : process.env.appiumPort ? process.env.appiumPort : properties.get("appiumPort"),
    appiumAutomationName : process.env.appiumAutomationName ? process.env.appiumAutomationName : properties.get("appiumAutomationName"),
    androidPlatform : process.env.androidPlatform ? process.env.androidPlatform : properties.get("androidPlatform"),
    androidDeviceName : process.env.androidDeviceName ? process.env.androidDeviceName : properties.get("androidDeviceName"),
    androidBuildPath : process.env.androidBuildPath ? process.env.androidBuildPath : properties.get("androidBuildPath"),
    chromeDriverExecutablePath : process.env.chromeDriverExecutablePath ? process.env.chromeDriverExecutablePath : properties.get("chromeDriverExecutablePath"),
    chromeDriverMappingFilePath : process.env.chromeDriverMappingFilePath ? process.env.chromeDriverMappingFilePath : properties.get("chromeDriverMappingFilePath"),

    strapiMigrationCsvFilePath :process.env.strapiMigrationCsvFilePath ? process.env.strapiMigrationCsvFilePath : properties.get("strapiMigrationCsvFilePath"),
    ackoLandingPageVisualTestingColumnName : process.env.ackoLandingPageVisualTestingColumnName ? process.env.ackoLandingPageVisualTestingColumnName : properties.get("ackoLandingPageVisualTestingColumnName"),
};