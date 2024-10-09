"use server"

import { revalidatePath } from "next/cache"
import prisma from "../../../../db/db"

export default async function ToggleActive(id : string,isActive : boolean){
    
    await prisma.product.update({
        where: {id : id},
        data : {isActive : isActive },
    })
    revalidatePath("/admin/dashboard")
}