"use server"

import prisma from "../../../../db/db"
import PurchasePageContents from "./purchasePageContents"

export default async function purchasePage({params} : {params : {id : string}}){

    const data = await prisma.product.findUnique({
        where:{
            id : params.id
        }
    })
    if(data){
        const {price,id} : {price : number; id : string} = data

        return(
            <PurchasePageContents id = {id} amount = {price}/>
        )
    }
     
}