import { expect } from "@playwright/test";

export class FormDelivery {

    constructor(page) {
        this.page = page;


        this.FirstNameInput = page.getByPlaceholder('First name')
        this.LastNameInput = page.getByPlaceholder('Last name')
        this.streetInput = page.getByPlaceholder('Street')
        this.postalCodeInput = page.getByPlaceholder('Post code')
        this.cityInput = page.getByPlaceholder('City')

        this.countrySeletor = page.locator('[data-qa="country-dropdown"]')
        this.saveAddressButt = page.locator('[data-qa="save-address-button"]')
        this.addressSaved = page.locator('[data-qa="saved-address-container"]')

        this.firstNameText = page.locator('[data-qa="saved-address-firstName"]')
        this.LastNameText = page.locator('[data-qa="saved-address-lastName"]')
        this.streetText = page.locator('[data-qa="saved-address-street"]')
        this.postaCodeText = page.locator('[data-qa="saved-address-postcode"]')
        this.cityText = page.locator('[data-qa="saved-address-city"]')
        this.countryText = page.locator('[data-qa="saved-address-country"]')


        this.continuePaymentButt = page.locator('[data-qa="continue-to-payment-button"]')
    }

    //função para preencher formulário de enviou

    fillDeliveryForm = async (deliveryDetails) => {

        await this.FirstNameInput.waitFor()
        await this.FirstNameInput.type(deliveryDetails.firstName)
    
        await this.LastNameInput.waitFor()
        await this.LastNameInput.type(deliveryDetails.lastName)
    
        await this.streetInput.waitFor()
        await this.streetInput.type(deliveryDetails.street)
        
        await this.postalCodeInput.waitFor()
        await this.postalCodeInput.type(deliveryDetails.postalCode)

        await this.cityInput.waitFor()
        await this.cityInput.type(deliveryDetails.city)

        await this.countrySeletor.waitFor()
        await this.countrySeletor.selectOption(deliveryDetails.country)
    
    }

    //Função para validar que os dados foram adicionados e gravados
    saveAdrres = async () =>{

        //clicar no botão para salvar os dados
        const AdressContainerBeforsave = await this.addressSaved.count()
        await this.saveAddressButt.waitFor()
        await this.saveAddressButt.click()
        await expect(this.saveAddressButt).toHaveCount(AdressContainerBeforsave + 1) 

       // validar se cada dados gravado corresponde aos dados adicionados

        await this.firstNameText.first().waitFor()
        expect (await this.firstNameText.first().innerText()).toBe(await this.FirstNameInput.inputValue())

        await this.LastNameText.first().waitFor()
        expect (await this.LastNameText.first().innerText()).toBe(await this.LastNameInput.inputValue())


        await this.streetText.first().waitFor()
        expect (await this.streetText.first().innerText()).toBe(await this.streetInput.inputValue())

        await this.postaCodeText.first().waitFor()
        expect (await this.postaCodeText.first().innerText()).toBe(await this.postalCodeInput.inputValue())


        await this.cityText.first().waitFor()
        expect (await this.cityText.first().innerText()).toBe(await this.cityInput.inputValue())

        await this.countryText.first().waitFor()
        expect (await this.countryText.first().innerText()).toBe(await this.countrySeletor.inputValue())

        //Ir para página de pagamento

        await this.continuePaymentButt.waitFor()
        await this.continuePaymentButt.click()

    }




}


