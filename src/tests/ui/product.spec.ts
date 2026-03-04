import { test } from "@playwright/test";
import { ProductPage } from "../../pages/ProductsPage";

test("Product details ", async ({ page }) => {
    const Product = new ProductPage(page)

    await Product.navigateToProductPage()
    await Product.viewProductDetails()
    // Wait for modal to appear then check message
    //await expect(page.locator('.text-center')).toBeVisible()
    // await expect(page.getByText('Your product has been added to cart.')).toBeVisible()
    await Product.searchProduct('Top')
})