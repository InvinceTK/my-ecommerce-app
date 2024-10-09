import CarouselContainer from "@/app/_components/carouselContainer"
import prisma from "../../../../db/db"

export default async function FindRecentlyAdded(){
    const products =  await prisma.product.findMany({
        orderBy:{
            createdAt: "desc"
        },
        take: 3,
    })
    return(
        <CarouselContainer products = {products}/>
    )
}