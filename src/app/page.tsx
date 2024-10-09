import prisma from "../../db/db";
import CarouselContainer from "./_components/carouselContainer";
import PageHeaderClient from "./_components/pageHeaderClient";

export default async function Home() {
  async function FindRecentlyAdded() {
    const products = await prisma.product.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 3,
    });
    return products;
  }

  async function FindCheapest() {
    const products = await prisma.product.findMany({
      orderBy: {
        price: "asc",
      },
      take: 3,
    });
    return products
  }

  async function FindMostExpensive() {
    const products = await prisma.product.findMany({
      orderBy: {
        price: "desc",
      },
      take: 3,
    });
    return products
  }

  const recentProducts = await FindRecentlyAdded();
  const mostExpensiveProducts = await FindMostExpensive()
  const leastExpensiveProducts = await FindCheapest()

  return (
    <>
      <PageHeaderClient />
      <CarouselContainer products={recentProducts} queryPerformed = {"Recently Added "}/>
      <CarouselContainer products={mostExpensiveProducts} queryPerformed = {"Most Expensive"}/>
      <CarouselContainer products={leastExpensiveProducts} queryPerformed = {"Cheapest"}/>
    </>
  );
}
