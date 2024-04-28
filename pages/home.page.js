const { Helper } = require("../utils/helper");


class HomePage extends Helper{

    constructor(){
        super(__filename);
    }

    async webLogin(mobileNumber){
        await this.clickElement(await this.findWebElement("loginCTA"));
        let mobileNumberInput = await this.findWebElement("mobileNumberInput");
        await this.clickElement(await mobileNumberInput);
        await mobileNumberInput.setValue(mobileNumber);
        await this.clickElement(await this.findWebElement("getOTPCTA"));
        await this.findWebElement("otpSentText", mobileNumber);
        await this.sleep(1);
        let result = await this.executeSQLQuery(`SELECT template_context_data->>'otp' AS otp FROM sms_report WHERE template_name = 'send_otp_default' AND recipient='${mobileNumber}' AND created_on > NOW()- INTERVAL '600 second' ORDER BY id DESC LIMIT 1`);
        if("otp" in result[0]){
            let otp = result[0].otp;
            let input1 = await this.findWebElement("otpInput", "1");
            await input1.setValue(otp[0]);
            let input2 = await this.findWebElement("otpInput", "2");
            await input2.setValue(otp[1]);
            let input3 = await this.findWebElement("otpInput", "3");
            await input3.setValue(otp[2]);
            let input4 = await this.findWebElement("otpInput", "4");
            await input4.setValue(otp[3]);
        }
        await this.sleep(5);
    }

    async webLoginPlaywright(mobileNumber){
        let page = await Helper.getPage();
        await page.goto('https://www.ackodev.com/');
        await page.locator("//*[text()='Login']").first().click();
        await this.sleep(1);
        await page.locator("//*[@type='number']").first().click();
        await page.locator("//*[@type='number']").first().fill(mobileNumber);
        await page.locator("//*[text()='Log in']").first().click();
        await page.waitForSelector("//*[contains(text(),'sent to " + mobileNumber + "')]");
        await this.sleep(1);
        let result = await this.executeSQLQuery(`SELECT template_context_data->>'otp' AS otp FROM sms_report WHERE template_name = 'send_otp_default' AND recipient='${mobileNumber}' AND created_on > NOW()- INTERVAL '600 second' ORDER BY id DESC LIMIT 1`);
        if("otp" in await result[0]){
            let otp = await result[0].otp;
            await page.locator("(//input)[1]").first().fill(otp[0]);
            await page.locator("(//input)[2]").first().fill(otp[1]);
            await page.locator("(//input)[3]").first().fill(otp[2]);
            await page.locator("(//input)[4]").first().fill(otp[3]);
        }
        await this.sleep(5);
    }
    
}

module.exports = HomePage;