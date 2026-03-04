import { test, expect } from '@playwright/test'
import { LoginPage } from '../../pages/LoginPage'

test.describe('Login Tests', () => {

    // Test 1: valid login
    test('should login with valid credentials', async ({ page }) => {
        const loginPage = new LoginPage(page)
        await loginPage.navigateToLoginPage()
        await loginPage.login('siddu123@gmail.com', 'Siddu123')

        // hint: after login, check page URL changed
        expect(page.url()).toContain('https://www.automationexercise.com/')
    })

    // Test 2: invalid login
    test('should show error with invalid credentials', async ({ page }) => {
        const loginPage = new LoginPage(page)
        await loginPage.navigateToLoginPage()
        await loginPage.login('wrong@email.com', 'wrongpassword')
        // hint: check error message is visible
        await expect(page.getByText('Your email or password is incorrect!')).toBeVisible()

    })

})