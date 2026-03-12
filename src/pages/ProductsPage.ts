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

    // Step 3: navigate to Product page
    async navigateToProductPage() {
        await this.navigateTo('/products')
        await this.closeAdIfPresent()   // to close the ad 
    }


    async viewProductDetails() {
        await this.clickElement(this.productsMenuLink)
        await this.page.waitForLoadState('domcontentloaded') // ← change!
        await this.closeAdIfPresent()

        await expect(this.page.locator(this.searchField)).toBeVisible()
        await expect(this.page.locator(this.submitButton)).toBeVisible()

        const productCount = await this.page
            .locator(this.firstProduct)
            .count()
        expect(productCount).toBeGreaterThan(0)

        await this.closeAdIfPresent()
        await this.page.locator(this.addToCart).first().click({ force: true })

        await this.page.goto('/view_cart')
        await this.page.waitForLoadState('domcontentloaded') // ← change!
    }

    async searchProduct(productName: string) {
        // Go back to products page first!
        await this.navigateTo('/products')
        await this.page.waitForLoadState('domcontentloaded')
        await this.closeAdIfPresent()
        await this.enterText(this.searchField, productName)
        await this.clickElement(this.submitButton)
        await this.page.waitForLoadState('domcontentloaded')
        await this.closeAdIfPresent()
    }
}