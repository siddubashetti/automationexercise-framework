import { test } from '@playwright/test'
import { ViewcartPage } from '../../pages/ViewCartPage'
import { ProductPage } from '../../pages/ProductsPage'


test("view cart details", async ({ page }) => {
    const viewCart = new ViewcartPage(page)
    const product = new ProductPage(page)

    await product.navigateToProductPage()
    await product.viewProductDetails()

    await viewCart.navigateToViewCartPage()
    await viewCart.viewCartItems()

    // await product.navigateToProductPage()
    // await product.viewProductDetails()


})