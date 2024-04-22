describe('Ackodev visual testing', () => {
    it('Two wheeler insuarance visual testing using playwright', async () => {
        const page = await driver.newPage();
        await page.goto('https://www.ackodev.com/two-wheeler-insurance/');
        let image = await page.screenshot({fullPage: true});
        await expect(image).toMatchImageSnapshot();
    }, 50000);

    it.only('Two wheeler insurance visual testing using webdriverio', async () => {
        await driver.url('https://www.acko.com/two-wheeler-insurance/');
        let bodyHeight = await driver.executeScript("return document.body.scrollHeight",[]);
        // let bodywidth = await driver.executeScript("return document.body.scrollWidth",[]);
        await driver.setWindowSize(1100, bodyHeight)
        await new Promise((resolve) => setTimeout(resolve, parseInt(3*1000)));
        let image = await driver.takeScreenshot();
        await expect(image).toMatchImageSnapshot();
    }, 50000);
});