import {test as base} from '@playwright/test';
import {LoginPage} from "../../pages/LoginPage";
import {ReportingHomePage} from "../../pages/reporting/ReportingHomePage";

export const test = base.extend<{
    loggedInPage: ReportingHomePage;
}>({
    loggedInPage: async ({page}, use) => {
        const loginPage = new LoginPage(page)
        await loginPage.navigate()
        await loginPage.login()

        const reportingHomePage = new ReportingHomePage(page);
        await page.waitForEvent('load');
        await reportingHomePage.goto();
        await use(reportingHomePage);
    }
});
