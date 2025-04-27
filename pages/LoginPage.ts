import {Page} from '@playwright/test';
import {BasePage} from "./basePage";


export class LoginPage extends BasePage {

    constructor(page: Page) {
        super(page);
    }

    async navigate(): Promise<void> {
        await this.page.goto(`https://ideas.ideascale.me/a/workspace/login`);
    }

    async fillEmail(): Promise<void> {
        await this.waitForPageLoad()
        const emailField = this.page.getByRole('textbox', {name: 'Email'});
        await emailField.click();
        await emailField.fill('superuser@ideascale.me');
    }

    async fillPassword(): Promise<void> {
        const passwordField = this.page.getByRole('textbox', {name: 'Password'});
        await passwordField.click();
        await passwordField.fill('brewski01');
    }

    async login(): Promise<void> {
        await this.acceptCookiesIfVisible();
        await this.fillEmail();
        await this.fillPassword();
        await this.page.getByRole('button', {name: 'Log in'}).click();
    }
}