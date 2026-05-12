import { test as base } from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'
import { ProductPage } from '../pages/ProductsPage'
import { ViewcartPage } from '../pages/ViewCartPage'
import { CheckoutPage } from '../pages/CheckoutPage'
import { PaymentPage } from '../pages/PaymentPage'

// Define fixture types
type MyFixtures = {
    loginPage: LoginPage
    productPage: ProductPage
    viewCartPage: ViewcartPage
    checkoutPage: CheckoutPage
    paymentPage: PaymentPage
    loggedInPage: LoginPage
}

// Create custom test with fixtures
export const test = base.extend<MyFixtures>({

    // LoginPage fixture
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page)
        await use(loginPage)
    },

    // ProductPage fixture
    productPage: async ({ page }, use) => {
        const productPage = new ProductPage(page)
        await use(productPage)
    },

    // ViewCartPage fixture
    viewCartPage: async ({ page }, use) => {
        const viewCartPage = new ViewcartPage(page)
        await use(viewCartPage)
    },

    // CheckoutPage fixture
    checkoutPage: async ({ page }, use) => {
        const checkoutPage = new CheckoutPage(page)
        await use(checkoutPage)
    },

    // PaymentPage fixture
    paymentPage: async ({ page }, use) => {
        const paymentPage = new PaymentPage(page)
        await use(paymentPage)
    },

    // loggedInPage fixture — auto login!
    loggedInPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page)
        await loginPage.navigateToLoginPage()
        await loginPage.login('siddu123@gmail.com', 'Siddu123')
        await use(loginPage)
    }
})

export { expect } from '@playwright/test'