import { expect } from "@playwright/test";
import { NavigationPage } from "../Page-Objects/NavPage.js";
import { isDesktop } from "../utils/IsDesktopV.js";



export class ProductsPage {

    constructor(page) {
        this.page = page;


        this.AddButton = page.locator('[data-qa="product-button"]')
        this.DropButton = page.locator('[data-qa="sort-dropdown"]')
        this.productValue = page.locator('[data-qa="product-title"]')
        this.ContinueCheck = page.locator('[data-qa="continue-to-checkout"]')

    }

    // Função para acessar a página
    visit = async () => {
        await this.page.goto('/')

    }


    //Função de addição de produto e validação de item no carrinho

    AddProduto = async (index) => {

        const ButtoAdd = this.AddButton.nth(index)

        await ButtoAdd.waitFor()
        await expect(ButtoAdd).toHaveText("Add to Basket")

        const navigation = new NavigationPage(this.page)
        //only desktop
        let basketBeforeAdd
        if (isDesktop(this.page)) {
            basketBeforeAdd = await navigation.getBasketCount()
        }


        await ButtoAdd.click()

        await expect(ButtoAdd).toHaveText("Remove from Basket")
        //only desktop
        if (isDesktop(this.page)) {
            const basketAfterAdd = await navigation.getBasketCount()
            expect(basketAfterAdd).toBeGreaterThan(basketBeforeAdd)
        }




    }


    // Função para odernar preço e validar que a ordem dos produts foi alterado
    OrderByPrice = async () => {

        await this.DropButton.waitFor()
        // validar nome do produto antes de filtrar
        await this.productValue.first().waitFor()
        const ProducBeforeSort = await this.productValue.allInnerTexts()

        await this.DropButton.selectOption('price-asc')

        // validar nome do produto depois o filtro
        const ProducAfterSort = await this.productValue.allInnerTexts()

        expect(ProducAfterSort).not.toEqual(ProducBeforeSort)

    }

    ContinueCheckout = async () => {

        await this.ContinueCheck.waitFor()
        await this.ContinueCheck.click()
        await this.page.waitForURL(/\/login/gm, { timeout: 3000 })

    }








}

