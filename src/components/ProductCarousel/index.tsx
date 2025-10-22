'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";

interface Product {
  id: number;
  name: string;
  restaurant: string;
  price: string;
  image: string;
}

interface ProductCarouselProps {
  title: string;
  color?: string;
  products: Product[];
  seeMoreLink: string;
}

export default function ProductCarousel({
  title,
  color,
  products,
  seeMoreLink,
}: ProductCarouselProps) {
  const router = useRouter();

  return (
    <section className="mb-10 w-full">
      <h2
        className="text-lg sm:text-2xl font-bold mb-3 sm:mb-4 px-2"
        style={{ color }}
      >
        {title}
      </h2>

      {/* Scroll horizontal adaptável e 100% fluido */}
      <div className="flex gap-3 sm:gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-2 sm:pb-4 px-2 snap-x snap-mandatory touch-pan-x w-full">
        {products.map((product) => (
          <div
            key={product.id}
            className="min-w-[70%] sm:min-w-[180px] md:min-w-[220px] bg-white rounded-xl shadow-md flex-shrink-0 cursor-pointer hover:scale-105 transition-transform snap-start"
          >
            <div className="relative w-full h-32 sm:h-36 rounded-t-xl overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-2 sm:p-3">
              <h3 className="font-semibold text-gray-800 text-sm sm:text-base truncate">
                {product.name}
              </h3>
              <p className="text-gray-500 text-xs sm:text-sm truncate">
                {product.restaurant}
              </p>
              <p className="text-[#016DA7] font-bold mt-1 text-sm sm:text-base">
                {product.price}
              </p>
            </div>
          </div>
        ))}

        {/* Botão "Ver mais" */}
        <button
          onClick={() => router.push(seeMoreLink)}
          className="min-w-[70%] sm:min-w-[180px] md:min-w-[220px] bg-gray-100 rounded-xl flex flex-col justify-center items-center hover:bg-gray-200 transition flex-shrink-0 snap-start"
        >
          <ChevronRight size={32} className="text-[#016DA7]" />
          <span className="text-[#016DA7] font-semibold mt-1 text-sm sm:text-base">
            Ver mais
          </span>
        </button>
      </div>
    </section>
  );
}
