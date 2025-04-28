import {Page, test as base} from '@playwright/test';
import {DashboardPage} from "@page/DashboardPage";
import {ReportsPage} from "@page/ReportsPage";

type TestFixtures = {
    dashboardPage: DashboardPage;
    reportsPage: ReportsPage;
    publicPage: Page;
}

export const test = base.extend<TestFixtures>({
    dashboardPage: async ({page}, use) => {
        const dashboardPage = new DashboardPage(page);
        await use(dashboardPage);
    },
    reportsPage: async ({page}, use) => {
        const reportsPage = new ReportsPage(page);
        await use(reportsPage);
    },
    publicPage: async ({browser}, use) => {
        const context = await browser.newContext({storageState: null});
        const page = await context.newPage();
        await use(page);
        await context.close();
    },
});
