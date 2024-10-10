import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";

interface Product {
  id: string; // Or number, depending on your data
  name: string;
  imagePath: string;
}

export default function CarouselContainer({
  products,
  queryPerformed,
}: {
  products: any;
  queryPerformed: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center w-full p-10">
      <h1 className="">{queryPerformed}</h1>
      <Carousel className="w-4/5">
        <CarouselContent>
          {products.map((product : Product) => (
            <CarouselItem key={product.id} className="sm:basis-full md:basis-1/2">
              <div className="relative h-[300px] w-full">
                <Image
                  src={`https://storage.googleapis.com/ecommerce-bucket-wds/${product.imagePath}`}
                  alt={product.name}
                  fill={true}
                  style={{ objectFit: "cover" }}
                />
              </div>
              <Link href={`/purchase/${product.id}`}>
                  <button className=" w-full bg-transparent hover:bg-green-500 z-50 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded">
                    Purchase
                  </button>
                </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
