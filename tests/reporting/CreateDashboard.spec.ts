import {test} from "./fixture";

test.describe("Reporting Dashboard", () => {
    test('should navigate to and validate the reporting home page', async ({loggedInPage}) => {
        await loggedInPage.isValidPage();
    });

    test(' should successfully create a new dashboard with valid inputs', async ({loggedInPage}) => {
        const dashboardName = 'Test Dashboard';
        const dashboardDescription = 'Test Description for Dashboard';
        
        await loggedInPage.clickCreateDashboardButton();
        await loggedInPage.submitCreateDashboardForm(dashboardName, dashboardDescription);
        await loggedInPage.assertDashboardCreated();
        await loggedInPage.clickAddReportsButton();
        await loggedInPage.addReportToDashboard()
    })

    test('should display for empty input', async ({loggedInPage}) => {
        await loggedInPage.clickCreateDashboardButton();
        await loggedInPage.submitCreateDashboardForm();
        await loggedInPage.assertDashboardNameInputError();
    })
})
