import { test } from '@playwright/test'
import { ViewcartPage } from '../../pages/ViewCartPage'
import { CheckoutPage } from '../../pages/CheckoutPage'
import { ProductPage } from '../../pages/ProductsPage'
import { LoginPage } from '../../pages/LoginPage'

test("Checkout Page details", async ({ page }) => {
    const checkout = new CheckoutPage(page)
    const viewCart = new ViewcartPage(page)
    const product = new ProductPage(page)
    const login = new LoginPage(page)

    await login.navigateToLoginPage()
    await login.login('siddu123@gmail.com', 'Siddu123')

    await product.navigateToProductPage()
    await product.viewProductDetails()

    await viewCart.navigateToViewCartPage()

    await checkout.ProceedcheckoutPage()




})