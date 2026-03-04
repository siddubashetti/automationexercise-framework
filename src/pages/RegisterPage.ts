import { Page } from '@playwright/test'
import { BasePage } from './BasePage'

export class RegisterPage extends BasePage {

    // Step 1: define locators using data-qa
    private readonly signUpName = '[data-qa="signup-name"]'
    private readonly signUpEmail = '[data-qa="signup-email"]'
    private readonly signUpButton = '[data-qa="signup-button"]'


    // Step 2: constructor
    constructor(page: Page) {
        super(page)
    }

    // Step 3: navigate to register page
    async navigateToRegisterPage() {
        await this.navigateTo('/signup')
    }

    // Step 4: enter signup details
    async enterSignupDetails(name: string, email: string) {
        await this.enterText(this.signUpName, name)
        await this.enterText(this.signUpEmail, email)
        await this.clickElement(this.signUpButton)

    }

}