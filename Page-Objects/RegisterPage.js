import { expect } from "@playwright/test";

export class RegisterPage {


    constructor(page) {

        this.page = page;

        this.EmailField = page.getByPlaceholder('E-Mail')
        this.PasswordField = page.getByPlaceholder('Password')
        this.ButtonRegister = page.getByRole('button', { name: 'Register' })
        this.GetTitle = page.locator('//h1[@class="mb-6 font-bold text-xl"]')


    }

    //função para criação de nova conta 
    CreateAcount = async (email, password) => {

        await this.EmailField.waitFor()

        //usando umA dependenca para gerar e-mail  e senha randômico
        //const emailid = uuidv4()
        //const email = emailid + '@gmail.com'
        await this.EmailField.waitFor()
        await this.EmailField.type(email)
        await this.PasswordField.waitFor()
        //const passwordid = uuidv4()
        //const password = passwordid
        await this.PasswordField.type(password)
        await this.ButtonRegister.waitFor()
        await this.ButtonRegister.click()
        await expect(this.GetTitle).toHaveText('Delivery details')

    }



}