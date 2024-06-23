import { expect } from "@playwright/test";
import { cardDetails } from "../data/PaymentDetails";

export class PaymentPage {

    constructor(page) {
        this.page = page;

        this.discount = page.frameLocator('[data-qa="active-discount-container"]')
            .locator('[data-qa="discount-code"]')
        this.discountInput = page.locator('[data-qa="discount-code-input"]')
        this.submitDiscount = page.locator('[data-qa="submit-discount-button"]')
        this.discountActiveMessage = page.locator('[data-qa="discount-active-message"]')
        this.discountTotalValue = page.locator('[data-qa="total-with-discount-value"]')
        this.totaValue = page.locator('[data-qa="total-value"]')

        this.cardOwner = page.locator('[data-qa="credit-card-owner"]')
        this.cardNumber = page.locator('[data-qa="credit-card-number"]')
        this.cardValidate = page.locator('[data-qa="valid-until"]')
        this.cardCvc = page.locator('[data-qa="credit-card-cvc"]')
        this.payButtton = page.locator('[data-qa="pay-button"]')

    }

    //função para pegar o numero de cupom de  desconto inserir e inserir no campo de desconto
    getDiscount = async () => {


        await this.discount.waitFor()
        const discountCode = await this.discount.innerText()

        await this.discountInput.waitFor()
        await this.discountInput.fill(discountCode)

        await expect(this.discountInput).toHaveValue(discountCode)

        // segunda opção

        // await this.discountInput.focus()
        // await this.discountInput.type(discountcode, {delay: 1000})
        // expect(await this.discountInput.inputValue()).toBe(discountcode)

        //Aplicar o desconto e validar se o foi abatido no valor total do produto

        expect(await this.discountTotalValue.isVisible()).toBe(false)
        expect(await this.discountActiveMessage.isVisible()).toBe(false)
        await this.submitDiscount.waitFor()
        await this.submitDiscount.click()

        await this.discountActiveMessage.waitFor()

        // 
        await this.discountTotalValue.waitFor()
        const discountValueText = await this.discountTotalValue.innerText()
        const discontValueOnlyNumber = discountValueText.replace("$", "")
        const discontValueNumber = parseInt(discontValueOnlyNumber, 10)


        await this.totaValue.waitFor()
        const totalValueText = await this.totaValue.innerText()
        const totalValueOnlyNumber = totalValueText.replace("$", "")
        const totalValueNumber = parseInt(totalValueOnlyNumber, 10)

        await expect(discontValueNumber).toBeLessThan(totalValueNumber)


    }


    // Preencher os dados do cartão

    fillPaymentCard = async () => {

        await this.cardOwner.waitFor()
        await this.cardOwner.fill(cardDetails.Owner)

        await this.cardNumber.waitFor()
        await this.cardNumber.fill(cardDetails.cardNumer)

        await this.cardValidate.waitFor()
        await this.cardValidate.fill(cardDetails.cardValid)

        await this.cardCvc.waitFor()
        await this.cardCvc.fill(cardDetails.cardCvc)

        await this.payButtton.waitFor()
        await this.payButtton.click()

        await this.page.waitForURL(/\/thank-you/, {timeout: 5000})
    }

}