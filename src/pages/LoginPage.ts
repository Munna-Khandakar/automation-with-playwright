import {Page} from '@playwright/test';
import {BasePage} from "./BasePage";
import config from '../../playwright.config';

export class LoginPage extends BasePage {

    constructor(page: Page) {
        super(page);
    }

    async navigate(): Promise<void> {
        await this.page.goto(`https://ideas.ideascale.me/a/workspace/login`);
    }

    async fillEmail(): Promise<void> {
        const emailField = this.page.getByRole('textbox', {name: 'Email'});
        await emailField.click();
        await emailField.fill(config.use.httpCredentials.username);
    }

    async fillPassword(): Promise<void> {
        const passwordField = this.page.getByRole('textbox', {name: 'Password'});
        await passwordField.click();
        await passwordField.fill(config.use.httpCredentials.password);
    }

    async login(): Promise<void> {
        await this.acceptCookiesIfVisible();
        await this.fillEmail();
        await this.fillPassword();
        await this.page.getByRole('button', {name: 'Log in'}).click();
    }
}
