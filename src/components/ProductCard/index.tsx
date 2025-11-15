'use client';

import Image from 'next/image';
import Link from 'next/link';

interface ProductCardProps {
  id: number;
  name: string;
  restaurant: string;
  price: string;
  image: string;
}

export default function ProductCard({
  id,
  name,
  restaurant,
  price,
  image,
}: ProductCardProps) {
  return (
    <Link href={`/product/${id}`}>
      <div className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:scale-105 transition-transform">
        <div className="relative w-full h-36 sm:h-40">
          <Image src={image} alt={name} fill className="object-cover" />
        </div>

        <div className="p-3">
          <h3 className="font-semibold text-gray-800 text-sm truncate">{name}</h3>
          <p className="text-gray-500 text-xs truncate">{restaurant}</p>
          <p className="text-[#016DA7] font-bold text-sm mt-1">{price} pts.</p>
        </div>
      </div>
    </Link>
  );
}
