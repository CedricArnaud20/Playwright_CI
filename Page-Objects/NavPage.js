import { isDesktop } from "../utils/IsDesktopV.js";

export class NavigationPage {


    constructor(page) {
        this.page = page;

        this.BasketCount = page.locator('[data-qa="header-basket-count"]')
        this.Basket = page.getByRole('link', { name: 'Checkout' })

        this.burgerButton = page.locator('[data-qa="burger-button"]')

    }


    // Função para validar incrementação de item no carrino
    getBasketCount = async () => {
        await this.BasketCount.waitFor()
        const text = await this.BasketCount.innerText()
        return parseInt(text, 10)
    }

    goToCheckout = async () => {
        const MainBasket = this.Basket

        if (!isDesktop(this.page)) {
            await this.burgerButton.waitFor()
            await this.burgerButton.click()
        }
        
        await MainBasket.waitFor()
        await MainBasket.click()
        await this.page.waitForURL("/basket")

    }


}