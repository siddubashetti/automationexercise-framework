import { expect, Page } from '@playwright/test'
import { BasePage } from './BasePage'

export class ProductPage extends BasePage {
    //step 1: define the locator
    readonly productsMenuLink = '[class="material-icons card_travel"]'
    readonly searchField = '[id="search_product"]'
    readonly submitButton = '[id="submit_search"]'
    //first
    readonly firstProduct = '[class="productinfo text-center"]'
    //first
    readonly addToCart = '[data-product-id="1"]'
    readonly continueShopping = '[data-dismiss="modal"]'

    // Step 2: constructor
    constructor(page: Page) {
        super(page)
    }

    // Step 3: navigate to register page
    async navigateToProductPage() {
        await this.navigateTo('/products')
        await this.closeAdIfPresent()   // to close the ad 
    }

    async viewProductDetails() {
        await this.clickElement(this.productsMenuLink)
        await expect(this.page.locator(this.searchField)).toBeVisible()
        await expect(this.page.locator(this.submitButton)).toBeVisible()
        // there are a multiple values are there , therefore we have to use this
        const productCount = await this.page
            .locator(this.firstProduct)
            .count()
        expect(productCount).toBeGreaterThan(0)

        // Close ad before clicking
        await this.closeAdIfPresent()

        // Force click add to cart
        await this.page.locator(this.addToCart).first().click({ force: true })

        // Wait a moment for modal to appear
        await this.page.waitForTimeout(2000)

        // Close ad again if it appeared after click
        await this.closeAdIfPresent()

        // Wait a moment for modal to appear
        await this.page.waitForTimeout(2000)

        // Only click continueShopping if modal is visible!
        const modal = this.page.locator(this.continueShopping)
        if (await modal.isVisible()) {
            await modal.click({ force: true })
        } else {
            // Modal didn't open — try clicking add to cart again
            await this.page.locator(this.addToCart).first().click({ force: true })
            await this.page.waitForTimeout(2000)
            await this.closeAdIfPresent()
            await modal.click({ force: true })
        }
    }

    async searchProduct(productName: string) {
        // enter text in search field
        // click submit button
        // verify results are displayed

        // await this.clickElement(this.continueShopping)
        await this.enterText(this.searchField, productName)
        await this.clickElement(this.submitButton)
        // Step 3: verify results are displayed
        const resultCount = await this.page
            .locator(this.firstProduct)
            .count()
        expect(resultCount).toBeGreaterThan(0)


    }
}