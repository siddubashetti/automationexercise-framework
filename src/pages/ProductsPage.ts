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

        // Close ad first!
        await this.closeAdIfPresent()

        // force: true → bypasses any overlay blocking click!
        await this.page.locator(this.addToCart).first().click({ force: true })

        await expect(this.page.getByText('Your product has been added to cart.')).toBeVisible()
        await this.clickElement(this.continueShopping)
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