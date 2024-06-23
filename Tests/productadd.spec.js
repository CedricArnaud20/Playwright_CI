import { test, expect } from "@playwright/test";


test('Adicionar produto no carrinho', async({page}) => {
    
    await page.goto('/')

    const AddButton = page.locator('button[data-qa="product-button"]').first()
    const CheckBasket = page.locator('[data-qa="header-basket-count"]')

    //Clicar no produto e adicinar no carrinho
    await AddButton.waitFor()
    await expect(AddButton).toHaveText("Add to Basket");
    await expect(CheckBasket).toHaveText("0")
    await AddButton.click()

    await expect(AddButton).toHaveText("Remove from Basket");

    // Validar que o produto esta no carrinho

    await expect(CheckBasket).toHaveText("1")

    // Verificar que o produto esta no carrinho 

    const Carrinho = page.getByRole('link', { name: 'Checkout' })   

    await Carrinho.waitFor()
    await Carrinho.click()

    //await page.waitForURL("/basket")

}); 