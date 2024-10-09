"use server"
import { revalidatePath } from "next/cache";
import prisma from "../../../../db/db";

export default async function DeleteProduct(id:string){
    
        await prisma.product.delete({
            where: {id: id }
        })

        revalidatePath("/admin/dashboard")
    
}