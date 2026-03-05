import { expect, Page } from '@playwright/test'
import { BasePage } from './BasePage'

export class ViewcartPage extends BasePage {

    //step 1: define the locator
    readonly cartItem = '[class="cart_description"]'
    readonly cartRemoveButton = '[class="cart_quantity_delete"]'
    readonly checkout = '[class="btn btn-default check_out"]'
    readonly commentBox = '[class="form-control"]'
    readonly placeOrder = '[class="btn btn-default check_out"]'

    // Step 2: constructor
    constructor(page: Page) {
        super(page)
    }

    // Step 3: navigate to register page
    async navigateToViewCartPage() {
        await this.navigateTo('/view_cart')
    }

    //step 4: ViewCart 
    async viewCartItems() {
        await expect(this.page.locator(this.cartItem)).toBeVisible()
        //await expect(this.page.locator('Blue Top')).toBeVisible()
        await this.clickElement(this.cartRemoveButton)
        await expect(this.page.locator(this.checkout)).toBeVisible()
        await expect(this.page.getByText('Cart is empty!')).toBeVisible()
    }

    async checkoutPage() {
        await expect(this.page.locator(this.cartItem)).toBeVisible()
        await this.clickElement(this.checkout)
        await this.enterText(this.commentBox, 'Nice Product')
        await this.clickElement(this.placeOrder)
        await expect(this.page.getByText('Payment')).toBeVisible()
    }
}