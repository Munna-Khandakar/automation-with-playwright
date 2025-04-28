import {expect, Page} from '@playwright/test';
import {BasePage} from "./basePage";

export class ReportsPage extends BasePage {

    constructor(page: Page) {
        super(page);
    }

    async goto(): Promise<void> {
        await this.page.goto(`/reporting/reports`);
    }

    async assertTitle(): Promise<void> {
        await expect(this.page).toHaveTitle(/Reporting/);
    }
}
