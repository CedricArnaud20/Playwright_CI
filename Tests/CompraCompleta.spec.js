import {test,  expect} from "@playwright/test";
import { v4 as uuidv4} from "uuid";
import {ProductsPage} from "../Page-Objects/ProductPage.js"
import {NavigationPage} from "../Page-Objects/NavPage.js"
import { CheckOut } from "../Page-Objects/CheckOut.js";
import {LoginPage} from "../Page-Objects/Loginpage.js"
import {RegisterPage} from "../Page-Objects/RegisterPage.js"
import {FormDelivery} from "../Page-Objects/FormDelivery.js"
import {deliveryDetails } from "../data/deliveryDetails.js"
import {PaymentPage} from "../Page-Objects/PaymentPage.js"

test("Jornada completa de compra", async({page}) => {
    

  const paginaProduto = new ProductsPage(page)

  await paginaProduto.visit()

  //Ordenar os produtos por orde asc
  await paginaProduto.OrderByPrice()

// adicionar produto no carinhi
  await paginaProduto.AddProduto(0)
  await paginaProduto.AddProduto(1)
  await paginaProduto.AddProduto(2)

  //Acessar o carrinho 
  const navigation = new NavigationPage(page)
  
  await navigation.goToCheckout()

  // remover o produto de menor preço do carrinho
  const checkout = new CheckOut(page)

  await checkout.RemoveChepeastItem()

  //Continuar a compra

  const CheckProd = new ProductsPage(page)

  await CheckProd.ContinueCheckout()

  //Acessar página de login e depois a pagina de cadastro 

  const login = new LoginPage(page) 


  await login.AcessRegisterPage()



  // Realizar craição da conta 

  const CreateAccount = new RegisterPage(page)

  const email= uuidv4() + '@gmail.com'
  const password = uuidv4()
  await CreateAccount.CreateAcount(email, password)
  
  // Preencher formulário de detalhes de entrega

  const Form = new FormDelivery(page)
  await Form.fillDeliveryForm(deliveryDetails)

  const saveAddress = new FormDelivery(page)
  await saveAddress.saveAdrres()

 //Continuar pagamento adicionando cupom de desconto

 const addDiscount = new PaymentPage(page)
 await addDiscount.getDiscount()

 // adicionar dados do cartão

 const fillCard = new PaymentPage(page)

 await fillCard.fillPaymentCard()




});
 