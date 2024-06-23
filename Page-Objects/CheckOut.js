import { expect } from "@playwright/test";

export class CheckOut {


    constructor(page) {

        this.page = page;

        this.ItemPrice = page.locator('[data-qa="basket-item-price"]')
        this.CardItem = page.locator('[data-qa="basket-card"]')
        this.RemoveItem = page.locator('[data-qa="basket-card-remove-item"]')
    }


    // Função para remover o produto de menor preço do carriho de compra
    RemoveChepeastItem = async () => {

        await this.CardItem.first().waitFor()
        const ItemBeforeRemoval = await this.CardItem.count()
        await this.ItemPrice.first().waitFor()
        
        //Constante para receveber somente o texto precço dos itens
        const allPriceTexts = await this.ItemPrice.allInnerTexts()
        //[ '499$', '599$', '320$' ] -> [ 499, 599, 320 ]
        //função para extrair somente numero real 
        const justNunbers = allPriceTexts.map((element) => {
            const withoutSign = element.replace("$", "") //'320$' -> '320'
            return parseInt(withoutSign, 10)

        })

        const smallPrice = Math.min(justNunbers)
        const smallPriceIdex = justNunbers.indexOf(smallPrice)
        const specificRemoveButton = this.RemoveItem.nth(smallPriceIdex)
        
        await specificRemoveButton.waitFor()
        await specificRemoveButton.click()

        await expect(this.CardItem).toHaveCount(ItemBeforeRemoval-1)
       // await this.page.pause()
        
       
    }


}