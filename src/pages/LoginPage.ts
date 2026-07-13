
import { BasePage } from "./BasePage";

import { Locator, Page } from "@playwright/test";

export class LoginPage extends BasePage {   
    //Locators: private
    private readonly emailId: Locator;
    private readonly password: Locator;
    private readonly loginBtn: Locator;
    private readonly forgotPasswordLink: Locator;
    private readonly loginErrorMessage: Locator;

    //constructor of class: init the locators
    constructor(page: Page) {
        super(page);
        this.emailId = page.getByRole('textbox', {name: 'E-Mail Address'});
        this.password = page.getByRole('textbox', { name: 'Password' });
        this.loginBtn = page.getByRole('button', { name: 'Login' });
        this.forgotPasswordLink = page.getByRole('link', { name: 'Forgotten Password' }).first();
        this.loginErrorMessage = page.locator('.alert-danger.alert-dismissible')
    };

    //public page actions(method)/behavior

    async goToLoginPage(): Promise<void> {
        await this.page.goto('opencart/index.php?route=account/login');
    }

    async isForgotPwdLinkExists(): Promise<boolean> {
        return await this.forgotPasswordLink.isVisible();
    }

    async doLogin(username: string, password: string): Promise<void> {
        console.log(`user creds: ${username} - ${password}`);
        await this.emailId.fill(username);
        await this.password.fill(password);
        await this.loginBtn.click();
    }

     async isInvalidLoginErrorDisplayed(): Promise<boolean> {
        return await this.loginErrorMessage.isVisible();
    }

}


