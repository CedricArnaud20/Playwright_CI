export class accountPage   {

    constructor(page){

        this.page = page
        this.pageHeading = page.locator('//h1[text()="My Account"]')
    } 

    visit =  async () =>{

        await this.page.goto("/my-account")
        await page.pause()
    }

    waitForPageHeading = async () =>{

        await this.pageHeading.waitFor()

    }

}