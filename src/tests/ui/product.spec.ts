import { test } from "@playwright/test";
import { ProductPage } from "../../pages/ProductsPage";
import { LoginPage } from "../../pages/LoginPage";
import { log } from "node:console";

test("Product details ", async ({ page }) => {
    const Product = new ProductPage(page)
    const loginPage = new LoginPage(page)

    await loginPage.navigateToLoginPage()
    await loginPage.login('siddu123@gmail.com', 'Siddu123')

    await Product.navigateToProductPage()
    await Product.viewProductDetails()

    await Product.searchProduct('Top')
})