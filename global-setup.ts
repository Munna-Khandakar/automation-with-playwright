import {chromium} from "@playwright/test";
import {LoginPage} from "@page/LoginPage";

async function globalSetup() {
    const browser = await chromium.launch({headless: false});
    const context = await browser.newContext();
    const page = await context.newPage();

    const loginPage = new LoginPage(page)
    await loginPage.navigate()
    await loginPage.login()
    await page.waitForEvent('load');
    console.log('==== setup completed ====');
    await page.context().storageState({path: ".auth/user.json"});
    await browser.close();
}

export default globalSetup;