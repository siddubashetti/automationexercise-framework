import { expect, Page } from '@playwright/test'
import { BasePage } from './BasePage'

export class PaymentPage extends BasePage {
    readonly cardName = '[data-qa="name-on-card"]'
    readonly cardNumber = '[data-qa="card-number"]'
    readonly cvv = '[data-qa="cvc"]'
    readonly month = '[data-qa="expiry-month"]'
    readonly year = '[data-qa="expiry-year"]'
    readonly payAndConirm = '[data-qa="pay-button"]'


    constructor(page: Page) {
        super(page)
    }

    // Step 3: navigate to Payment page
    // async navigateToPaymentPage() {
    //     await this.navigateTo('/payment')
    // }

    async paymentDetails(name: string, cardNum: string, cvv: string, month: string, year: string) {
        await this.enterText(this.cardName, name)
        await this.enterText(this.cardNumber, cardNum)
        await this.enterText(this.cvv, cvv)
        await this.enterText(this.month, month)
        await this.enterText(this.year, year)
        await this.clickElement(this.payAndConirm)
        await expect(this.page.getByText('Congratulations! Your order has been confirmed!')).toBeVisible()
    }
}