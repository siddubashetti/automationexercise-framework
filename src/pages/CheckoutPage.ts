import { expect, Page } from '@playwright/test'
import { BasePage } from './BasePage'

export class CheckoutPage extends BasePage {

    readonly checkout = '[class="btn btn-default check_out"]'
    readonly commentBox = '[name="message"]'
    readonly placeOrder = '[href="/payment"]'
    readonly payAndConfirm = '[data-qa="pay-button"]'

    constructor(page: Page) {
        super(page)
    }

    // // Step 3: navigate to register page
    // async navigateToViewCartPage() {
    //     await this.navigateTo('/view_cart')
    // }

    async ProceedcheckoutPage() {
        // Close ad before clicking checkout
        await this.closeAdIfPresent()

        await this.clickElement(this.checkout)

        // Wait for checkout page to load
        await this.page.waitForLoadState('networkidle')

        // Close ad again on checkout page
        await this.closeAdIfPresent()

        await this.enterText(this.commentBox, 'Nice Product')
        await this.clickElement(this.placeOrder)
        await this.closeAdIfPresent()
        await expect(this.page.locator(this.payAndConfirm)).toBeVisible()
    }
}