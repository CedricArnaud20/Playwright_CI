
import  * as nodeFetch  from "node-fetch";


export const getLogin = async () =>{
    
    const reponse = await nodeFectch("http://localhost:2221/api/login", {
        method:"POST",
    body: JSON.stringify({"username": "teste01@gmail.com","password":"789456123"}),

    })

    if (reponse.statusCode !== 200) {
        throw new Error("Houve um erro tenta novamente ")
    }

    const body = await reponse.json()
    return body.token

}