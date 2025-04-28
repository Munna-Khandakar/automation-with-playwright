import {Page} from '@playwright/test';
import {BasePage} from "./basePage";

export class ReportsPage extends BasePage {

    constructor(page: Page) {
        super(page);
    }

    async goto(): Promise<void> {
        await this.page.goto(`https://ideas.ideascale.me/reporting/reports`);
    }
}
