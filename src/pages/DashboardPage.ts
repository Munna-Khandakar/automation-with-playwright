import {expect, Locator, Page} from '@playwright/test';
import {BasePage} from "./basePage";

export class DashboardPage extends BasePage {
    private readonly createDashboardButton: Locator;
    private readonly addReportsButton: Locator;
    private readonly dashboardNameField: Locator;
    private readonly dashboardNameFieldError: Locator;
    private readonly descriptionField: Locator;
    private readonly submitButton: Locator;

    constructor(page: Page) {
        super(page);
        this.createDashboardButton = this.page.getByRole('button', {name: 'Create Dashboard'});
        this.dashboardNameField = this.page.locator('input[name="name"]');
        this.dashboardNameFieldError = page.locator('input[name="name"] + .invalid-feedback');
        this.descriptionField = this.page.locator('textarea[name="description"]');
        this.submitButton = this.page.locator('[data-test-element-id="submit-button"]');
        this.addReportsButton = this.page.getByRole('button', {name: 'Add Reports'});
    }

    async goto(): Promise<void> {
        await this.page.goto(`https://ideas.ideascale.me/reporting`);
    }

    async isValidPage(): Promise<void> {
        const pageId = this.page.locator('[data-test-element-id="dashboard-details"]');
        await expect(pageId).toHaveCount(1);
    }

    async clickCreateDashboardButton(): Promise<void> {
        await this.createDashboardButton.click();
        
    }

    async submitCreateDashboardForm(name: string = '', description: string = ''): Promise<void> {
        await this.dashboardNameField.click();
        await this.dashboardNameField.fill(name);

        await this.descriptionField.click();
        await this.descriptionField.fill(description);

        await this.submitButton.click();
        
    }

    async assertDashboardCreated(): Promise<void> {
        const pageUrl = this.page.url();
        expect(pageUrl).toContain('create');
    }

    async clickAddReportsButton(): Promise<void> {
        await this.addReportsButton.click();
        
    }

    async addReportToDashboard(): Promise<void> {
        const checkboxes = this.page.locator('input[type="checkbox"]');
        await checkboxes.nth(0).click({force: true});
        await checkboxes.nth(1).click({force: true});
        await this.submitButton.click();
    }

    async assertDashboardNameInputError(): Promise<void> {
        await expect(this.dashboardNameFieldError).toHaveText('This field is required.');
    }
}
