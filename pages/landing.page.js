const { properties } = require("../utils/config");
const { Helper } = require("../utils/helper");

class LandingPage extends Helper{
    constructor(){
        super(__filename);
    }

    async visualTestForLandingPages(columnName){
        let landingPagesData = await this.readCSVFile( __dirname + "/../data/landingPagesUrls.csv");
        for(let i=0; i<landingPagesData.length; i++){
            await this.setUrl(await landingPagesData[i][columnName]);
            await this.takeVisualSnapshot();
            await this.takeHTMLSnapshot();
        };
    }

    async visualTestForLandingPagesUsingPlaywright(){
        let columnName = properties.ackoLandingPageVisualTestingColumnName;
        let landingPagesData = await this.readCSVFile( __dirname + "/../"+properties.strapiMigrationCsvFilePath);
        for(let i=0; i<landingPagesData.length; i++){
            let page = await Helper.getPage();
            await page.goto(await landingPagesData[i][columnName]);
            await this.takeVisualSnapshot();
            await this.takeHTMLSnapshot();
        }
    }

    async visualTestForLandingPagesInPlaywright(columnName, page){
        let landingPagesData = await this.readCSVFile( __dirname + "/../data/landingPagesUrls.csv");
        for(let i=0; i<landingPagesData.length; i++){

            await page.goto(await landingPagesData[i][columnName]);
            await this.takeVisualSnapshotInPlaywright(await page);
        }
        await Helper.verifySoftAssert();
    }

    async takeVisualSnapshotInPlaywright(page){
        await page.evaluate(() => {
            const totalHeight = document.body.scrollHeight;
            let currentScroll = window.scrollY || window.pageYOffset;
            const scrollStep = 50;
            const scrollDelay = 25;
        
            function scrollDown() {
                if (currentScroll < totalHeight - window.innerHeight) {
                    currentScroll += scrollStep;
                    window.scrollTo(0, currentScroll);
                    setTimeout(scrollDown, scrollDelay);
                } else {
                    window.scrollTo(0, totalHeight);
                }
            }
            scrollDown();
        })
        let bodyHeight = await page.evaluate(()=>{return document.body.scrollHeight});
        await this.sleep((await bodyHeight)/2000);
        await Helper.softAssert.assertImageInPlaywright(await page);
    }
}

module.exports = LandingPage;