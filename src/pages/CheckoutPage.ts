import { expect, Page } from '@playwright/test'
import { BasePage } from './BasePage'

export class CheckoutPage extends BasePage {

    readonly checkoutButton = '[class="btn btn-default check_out"]'
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
        await this.closeAdIfPresent()
        await this.clickElement(this.checkoutButton)

        // Change networkidle to domcontentloaded!
        await this.page.waitForLoadState('domcontentloaded')

        await this.closeAdIfPresent()
        await this.enterText(this.commentBox, 'Nice Product')
        await this.clickElement(this.placeOrder)
        await expect(this.page.getByText('Pay and Confirm Order')).toBeVisible()
    }
}