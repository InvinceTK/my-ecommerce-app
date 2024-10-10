import prisma from "../../../../db/db";
import ProductTable from "./_components/ProductTable";


  
export default async function DashboardPage(){
    
    const products = await prisma.product.findMany()
        
 

    return(
        <>
        
        <ProductTable products = {products}/>
        </>
    )
}