import { expect } from "@playwright/test";



export class LoginPage {

    constructor(page){

        this.page = page

        this.RegisterButton = page.locator('[data-qa="go-to-signup-button"]')
    }

    //Função para cessar a página de cadastro de conta
    AcessRegisterPage = async ()=>{

        await this.RegisterButton.waitFor()
    
        await this.RegisterButton.click()
    
        await this.page.waitForURL(/\/signup/gm, {timeout: 5000})
    } 
    

}



