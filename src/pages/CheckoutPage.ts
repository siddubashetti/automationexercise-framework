import { expect, Page } from '@playwright/test'
import { BasePage } from './BasePage'

export class CheckoutPage extends BasePage {

    readonly checkout = '[class="btn btn-default check_out"]'
    readonly commentBox = '[name="message"]'
    readonly placeOrder = '[href="/payment"]'
    readonly payAndConirm = '[data-qa="pay-button"]'

    constructor(page: Page) {
        super(page)
    }

    // // Step 3: navigate to register page
    // async navigateToViewCartPage() {
    //     await this.navigateTo('/view_cart')
    // }

    async ProceedcheckoutPage() {

        await this.clickElement(this.checkout)
        await this.enterText(this.commentBox, 'Nice Product')
        await this.clickElement(this.placeOrder)
        await expect(this.page.locator(this.payAndConirm)).toBeVisible()
    }
}