import { test } from "@playwright/test";
import {accountPage  } from "../Page-Objects/accounPage.js";
import { getLogin } from "../Page-Objects/tokenPage.js";


test("logar usando cookie injection", async ({page}) => {

    //obter o token para realizar login 
    let loginToken;
    try {
        loginToken = await getLogin();
    } catch (error) {
        console.error("Erro ao obter o token de login:", error);
        return;
    }

    const Account = new accountPage(page)
    await Account.visit()

    await page.evaluate((loginTokenInsideBrowserCode) => {
        document.cookie = "token=" + loginTokenInsideBrowserCode
    }, loginToken)

    
    await Account.visit()
    await Account.pageHeading()
    
    await page.pause()
   

});