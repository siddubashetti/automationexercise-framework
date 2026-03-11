import { Page } from '@playwright/test'
import { BasePage } from './BasePage'

export class LoginPage extends BasePage {

    // define your locators
    private readonly emailInput = "[data-qa='login-email']"
    private readonly passwordInput = "[data-qa='login-password']"
    private readonly loginButton = "[data-qa='login-button']"

    // constructor
    constructor(page: Page) {
        super(page)
    }

    // navigate to login page
    async navigateToLoginPage() {
        // hint: use navigateTo from BasePage
        // login page url is /login
        await this.navigateTo('/login')
    }

    // login method
    async login(email: string, password: string) {
        // used enterText and clickElement from BasePage
        await this.enterText(this.emailInput, email)
        await this.enterText(this.passwordInput, password)
        await this.closeAdIfPresent()   // to close the ad
        await this.clickElement(this.loginButton)
    }

}