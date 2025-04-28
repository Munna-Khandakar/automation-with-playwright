import {test} from "./fixture";

test.describe("Reporting Dashboard", () => {
    test('should navigate to and validate the reporting home page', async ({dashboardPage}) => {
        await dashboardPage.goto();
        await dashboardPage.isValidPage();
    });

    test(' should successfully create a new dashboard with valid inputs', async ({dashboardPage}) => {
        const dashboardName = 'Test Dashboard';
        const dashboardDescription = 'Test Description for Dashboard';

        await dashboardPage.goto();
        await dashboardPage.clickCreateDashboardButton();
        await dashboardPage.submitCreateDashboardForm(dashboardName, dashboardDescription);
        await dashboardPage.assertDashboardCreated();
        await dashboardPage.clickAddReportsButton();
        await dashboardPage.addReportToDashboard()
    })

    test('should display for empty input', async ({dashboardPage}) => {
        await dashboardPage.goto();
        await dashboardPage.clickCreateDashboardButton();
        await dashboardPage.submitCreateDashboardForm();
        await dashboardPage.assertDashboardNameInputError();
    })
})
