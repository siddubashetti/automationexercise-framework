// import { Page } from '@playwright/test';

// export class BasePage {
//     // 'readonly' means we won't accidentally overwrite the page object
//     readonly page: Page;

//     constructor(page: Page) {
//         this.page = page;
//     }

//     // A reusable method to navigate to any URL
//     async openUrl(path: string) {
//         // Since baseURL is in your config, we just pass the path like '/login'
//         await this.page.goto(path);
//     }

//     // A reusable method to get the page title
//     async getPageTitle() {
//         return await this.page.title();
//     }
// }

import { Page } from '@playwright/test'

export class BasePage {

    readonly page: Page
    // constructor - how do we store the page object?
    constructor(page: Page) {
        this.page = page
    }

    // write a method to navigate to a URL
    async navigateTo(url: string) {
        await this.page.goto(url)
    }

    // write a method to get page title
    async getTitle() {
        return await this.page.title();
    }

    // Wait for an element to be visible
    async waitForElement(locator: string) {
        await this.page.waitForSelector(locator)
    }

    // Click any element
    async clickElement(locator: string) {
        await this.page.click(locator)
    }

    // Type text into any input field
    async enterText(locator: string, text: string) {
        await this.page.fill(locator, text)
    }

    // Check if element is visible - returns true or false
    async isElementVisible(locator: string): Promise<boolean> {
        return await this.page.isVisible(locator)
    }

    //To Close the perticular ad , when we are trying to serach in search field
    async closeAdIfPresent() {
        try {
            const closeBtn = this.page.locator('[id="dismiss-button"]')
            if (await closeBtn.isVisible({ timeout: 3000 })) {
                await closeBtn.click()
                console.log('Ad closed!')
            }
        } catch {
            console.log('No ad found, continuing...')
        }
    }

}