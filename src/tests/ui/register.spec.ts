import { expect, test } from "@playwright/test";
import { RegisterPage } from "../../pages/RegisterPage";


test("Register Page", async ({ page }) => {
    const Register = new RegisterPage(page)

    await Register.navigateToRegisterPage()
    await Register.enterSignupDetails('siddu', 'siddu123@gmail.com')
    await expect(page.getByText('Email Address already exist!')).toBeVisible()
})