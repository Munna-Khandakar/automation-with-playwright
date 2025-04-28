import {test as setup} from '@playwright/test';
import {LoginPage} from "@page/LoginPage";

setup('authenticate', async ({page}) => {
    const loginPage = new LoginPage(page)
    await loginPage.navigate()
    await loginPage.login()
    await page.waitForEvent('load');

    await page.context().storageState({path: ".auth/user.json"});
});
