const request = require("./requestHandler");
const fs = require("fs");
const path = require('path');
const { Pool } = require("pg");
const { properties } = require("./config");
const { parse } = require('csv-parse');
const stringify = require('csv-stringify');
let driver;

exports.Helper = class Helper{
    static page;

    constructor(file){
        if(file){
            if(file.includes("\\pages\\")){
                this.file = file.replace("\\pages\\", "\\locators\\").replace(".js", ".json");
            }else{
                this.file = file.replace("/pages/", "/locators/").replace(".js", ".json");
            }
        }
        console.log(this.file);
        this.request = request;
    }

    static async setDriver(driverToBeSet){
        driver = await driverToBeSet;
    }

    static async getDriver(){
        return await driver;
    }

    static async setPage(pageToBeSet){
        this.page = await pageToBeSet;
    }

    static async getPage(){
        return await this.page;
    }

    async sleep(second) {
        return new Promise((resolve) => setTimeout(resolve, parseInt(second*1000)));
    }

    async executeSQLQuery(sqlQuery, host=properties.masterDBHost, username=properties.masterDBUsername, password=properties.masterDBPassword, databaseName=properties.masterDBName, port=properties.masterDBPort){
        let pool = await new Pool({
            host: host,
            user: username,
            password: password,
            database: databaseName,
            port: port,
            statement_timeout: 30000
        });
        return await new Promise(function (resolve, reject) {
            pool.connect((err, client, done) => {
                if (err) throw err;
                console.log(`SQL Query : ${sqlQuery}`);
                client.query(sqlQuery, (err, res) => {
                    done();
                    if (err) {
                      console.log("Error executing query :" + sqlQuery);
                      reject(0);
                    } else {
                        resolve(res.rows);
                    }
                });
            });
        });
    }

    async replaceElement(element, replaceWith) {
        if (await replaceWith) {
            let result = await element.replace("$", String(replaceWith));
            return result;
        }
        return element;
    }

    async findWebElement(elementName, replaceWith, timeOut = 9.5, elementStatus = "clickable", returnListElements = false, refreshCount = 0){
        let resultElement;
        return await new Promise(async (resolve, reject) => {
            try{
                await fs.readFile(this.file, "utf8", async (err, data) => {
                    if (err) {
                        reject(err);
                    }
                    let obj = await JSON.parse(data);
                    let webElement;
                    if (await obj[elementName]) {
                        if("context" in obj[elementName]) {
                            await this.switchContext(obj[elementName].context);
                            await delete obj[elementName].context;
                        }
                        let startTime = await (new Date()).getTime();
                        let endTime = await startTime + parseInt(timeOut * 1000);
                        let refreshInterval = await parseInt((timeOut* 1000)/(refreshCount+1));
                        let refreshTime = await startTime + await refreshInterval;
                        while( await ((new Date()).getTime() < endTime)){
                            let locators = await obj[elementName];
                            for (let locator in locators) {
                                if (await returnListElements) { // not working
                                    webElement = await driver.$$(await this.replaceElement(locators[locator], replaceWith));
                                    await this.sleep(0.1);                                    
                                } else {
                                    webElement = await driver.$(await this.replaceElement(locators[locator], replaceWith));
                                    await this.sleep(0.1);
                                    let webEleExist = await webElement.isExisting();
                                    if( await webEleExist && await (elementStatus == "clickable")){
                                        if (await webElement.isClickable()) {
                                            resultElement = await webElement;
                                            break;
                                        }
                                    }else if(await webEleExist && await (elementStatus == "displayed")){
                                        if (await webElement.isDisplayed()) {
                                            resultElement = await webElement;
                                            break;
                                        }
                                    }else if(await webEleExist){
                                        resultElement = await webElement;
                                        break;
                                    }
                                }
                            }
                            if (await resultElement) {
                                break;
                            }
                            await this.sleep(0.5);
                            if(await ((new Date()).getTime() > refreshTime) && await refreshCount >0){
                                await driver.refresh();
                                await --refreshCount;
                                refreshTime += await refreshInterval;
                            }
                        }
                        if (await resultElement) {
                            await resolve(await resultElement);
                        }else{
                            let errorMsg="";
                            errorMsg+="\nurl - "+ await driver.getUrl();
                            for (let locator in obj[elementName]) {
                                errorMsg = await errorMsg + "\n" + locator+" - " + await this.replaceElement(obj[elementName][locator],replaceWith);
                            }
                            await reject(new Error(elementName + " not found" + errorMsg));
                        }
                    }else{
                        await reject(new Error(elementName + " is not available in json file"));
                    }
                });
            }catch(e){
                await reject(e);
            }
        });
    }

    async clickElement(element){
        switch(properties.configType){
            case "web":
                return await element.click();
            case "mweb":
                return await element.click();
            case "android":
                switch (Helper.getCurrentContext()) {
                    case "webview":
                        return await element.click();
                    case "native":
                        return await driver.elementClick(element);
                }
        }
    }

    async readCSVFile(csvFilePath){
        try {
            let records = [];
            let parser = await fs.createReadStream(csvFilePath).pipe(parse({
                    columns: true, // Parse columns as properties of an object
                    trim: true, // Trim leading and trailing spaces in columns
                    skip_empty_lines: true
                }));
            for await (let record of await parser) {
                await records.push(record);
            }
            return await records;
        }catch(error){
            await console.error('Error during CSV parsing:', error);
        }
    }

    async writeCSVFile(csvFilePath, data){
        // sample data = [
        // { name: 'John Doe', age: 30, city: 'New York' },
        // { name: 'Jane Smith', age: 25, city: 'Los Angeles' }
        // ];
        const output = await fs.createWriteStream(csvFilePath);
        const stringifier = await stringify({
            header: true, // Include column headers as the first line
            // columns: { name: 'NAME', age: 'AGE', city: 'CITY' }, // Map object keys to column headers
        });
        await stringifier.pipe(output);
        await data.forEach(item => {
            stringifier.write(item);
        });
        await stringifier.end();
        await output.on('finish', () => {
            console.log('CSV file has been written successfully.');
        });
    }

    async setUrl(url){
        switch(properties.configType){
            case "web":{
                await driver.url(url)
                return;
            }
            case "mweb":{
                await driver.url(url)
                return;
            }
            case "android":{
                await driver.navigateTo(url);
                return;
            }
            default:
                await driver.navigateTo(url);
                return;
        }
    }

    async takeFullPageScreenshot(){
        let bodyHeight = await driver.executeScript("return document.body.scrollHeight",[]);
        // let bodywidth = await driver.executeScript("return document.body.scrollWidth",[]);
        await driver.setWindowSize(1100, bodyHeight)
        await this.sleep(1);
        return await driver.takeScreenshot();
    }
}