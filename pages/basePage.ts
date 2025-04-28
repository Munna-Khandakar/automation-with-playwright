import {Page, Locator} from '@playwright/test';

export abstract class BasePage {
    readonly page: Page;
    protected static readonly SPINNER_SELECTOR = 'svg.spinner circle.path';
    protected static readonly PACE_LOADER_SELECTOR = '.pace-running';

    constructor(page: Page) {
        this.page = page;
    }

    async waitForPageLoad(timeout = 30000): Promise<void> {
        try {
            if (await this.page.locator(BasePage.PACE_LOADER_SELECTOR).count() > 0) {
                await this.page.waitForFunction(
                    (selector) => document.querySelectorAll(selector).length === 0,
                    BasePage.PACE_LOADER_SELECTOR,
                    {timeout}
                );
            }
        } catch (error) {
            console.log('Pace loader check failed, page might be navigating');
        }
    }

    protected async waitForSpinner(timeout = 30000): Promise<void> {
        try {
            if (await this.page.locator(BasePage.SPINNER_SELECTOR).count() > 0) {
                await this.page.waitForFunction(
                    (selector) => document.querySelectorAll(selector).length === 0,
                    BasePage.SPINNER_SELECTOR,
                    {timeout}
                );
            }
        } catch (error) {
            console.log('Spinner check failed, page might be navigating');
        }
    }

    protected async acceptCookiesIfVisible(): Promise<void> {
        try {
            const cookieBanner = this.page.locator('text=Accept');
            if (await cookieBanner.isVisible()) {
                await cookieBanner.click();
            }
        } catch (error) {
            console.log('Cookie banner check failed, page might be navigating');
        }
    }
}
