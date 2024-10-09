"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Product {
  id: string;
  name: string;
  imagePath: string; // The filename or path stored in the database
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/getProducts");
        const data = await response.json();
        console.log(data.products);
        setProducts(data.products);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-5  ">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className=" p-4 border rounded-lg ">
      <div className="flex justify-between mb-5">
        <div className="bg-slate-100">{product.name}</div>
        <div className="bg-slate-100">£{product.price}</div>
      </div>
      <div className="relative h-[300px] w-full ">
        <Image
          src={`https://storage.googleapis.com/ecommerce-bucket-wds/${product.imagePath}`}
          alt={product.name}
          fill={true}
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className=" justify-end mt-5">
        <Link href={`/purchase/${product.id}`}>
          <button className=" w-full bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded">
            Purchase
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Products;
