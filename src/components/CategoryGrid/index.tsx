'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
}

interface CategoryGridProps {
  products: Product[];
}

export default function CategoryGrid({ products }: CategoryGridProps) {
  const router = useRouter();

  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-6 px-4 py-6">
      {products.map((product) => (
        <div
          key={product.id}
          onClick={() => router.push(`/product/${product.id}`)}
          className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-3 cursor-pointer"
        >
          <div className="relative w-full h-32 sm:h-40 mb-3">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover rounded-lg"
            />
          </div>
          <h3 className="text-sm sm:text-base font-semibold text-gray-800 truncate">
            {product.name}
          </h3>
          <p className="text-[#016DA7] font-bold text-sm sm:text-base mt-1">
            {product.price}
          </p>
        </div>
      ))}
    </div>
  );
}
