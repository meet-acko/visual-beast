const { Helper } = require("../utils/helper");

class LandingPage extends Helper{
    constructor(){
        super(__filename);
    }

    async visualTestForLandingPages(columnName){
        let landingPagesData = await this.readCSVFile( __dirname + "/../data/landingPagesUrls.csv");
        for(let i=0; i<landingPagesData.length; i++){
            await this.setUrl(await landingPagesData[i][columnName]);
            await this.sleep(1);
            let image = await this.takeFullPageScreenshot();
            await expect(await image).toMatchImageSnapshot();
        };
    }
}

module.exports = LandingPage;