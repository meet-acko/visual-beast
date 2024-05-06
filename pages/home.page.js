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
        await this.sleep(1);
        await this.findWebElement("dontHaveAnyPolicy");
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
        await this.sleep(1);
        await this.waitForSelector("//*[contains(text(),'t have any policy')]")
    }
    
    async goToLifeSemPage(){
        await this.setUrl("https://www.ackodev.com/life/p/semLifeBuy");
    }

    async doVisualTestOfLifeSemJourney(mobileNumber){
        await this.sleep(1);
        await this.clickElement(await this.findWebElement("nameInput"));
        await this.sendKeys("Meet Marakana");
        await this.clickElement(await this.findWebElement("maleGenderInput"));
        await this.clickElement(await this.findWebElement("noSmokedInput"));
        await this.clickElement(await this.findWebElement("ageInput"));
        await this.sendKeys("26");
        await this.executeJSScript(`(document.evaluate("//video", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue).remove()`)
        await this.clickElement(await this.findWebElement("pincodeInput"));
        await this.sendKeys("560068");
        await this.takeVisualSnapshot();
        await this.clickElement(await this.findWebElement("phoneNumberInput"));
        await this.sendKeys(mobileNumber);
        let checkPricesCTA = await this.findWebElement("checkPricesCTA");
        await this.clickElement(await checkPricesCTA);
        await this.findWebElement("seeBreakupLink");
        await this.takeVisualSnapshot();
        await this.clickElement(await this.findWebElement("continueCTA"));
        let dontWantCoverCTA = await this.findWebElement("dontWantCoverCTA");
        await this.takeVisualSnapshot();
        await this.clickElement(await dontWantCoverCTA);
        let justWantBasicCoverCTA = await this.findWebElement("justWantBasicCoverCTA");
        await this.takeVisualSnapshot();
        await this.clickElement(await justWantBasicCoverCTA);
        await this.findWebElement("twoMoreThingsText");
        await this.clickElement(await this.findWebElement("lifeDOBInput"));
        await this.setDatePickerValue("15/05/1997");
        await this.clickElement(await this.findWebElement("emailInput"));
        await this.sendKeys("meet.marakana@acko.tech");
        let reviewMyPlanCTA = await this.findWebElement("reviewMyPlanCTA");
        await this.takeVisualSnapshot();
        await this.clickElement(await reviewMyPlanCTA);
        await this.findWebElement("ackoLifePlanDetails");
        await this.executeJSScript(`(document.evaluate("//*[text()='${await mobileNumber}']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue).innerHTML="8980301203"`)
        await this.takeVisualSnapshot();
        await this.sleep(10);
    }

    async setDatePickerValue(date){
        let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        date = date.split("/");
        let day = parseInt(date[0]);
        let month = parseInt(date[1])-1;
        let year = date[2];
        let curMonth = months[month];
        let datePickerYearCTA = await this.findWebElement("datePickerYearCTA", year);
        await this.clickElement(datePickerYearCTA);
        let datePickerMonthCTA = await this.findWebElement("datePickerMonthCTA", curMonth);
        await this.sleep(0.2);
        await this.clickElement(datePickerMonthCTA);
        let datePickerDayCTA = await this.findWebElement("datePickerDayCTA", day);
        await this.sleep(0.2);
        await this.clickElement(datePickerDayCTA);
    }
}

module.exports = HomePage;