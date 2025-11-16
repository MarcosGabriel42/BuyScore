'use client';

import Image from 'next/image';
import Link from 'next/link';

interface ProductCardProps {
  id: number | string;
  name: string;
  restaurant: string;
  price: string;
  image: string;
  href?: string;
  priceSuffix?: string;
  disableLink?: boolean;
}

export default function ProductCard({
  id,
  name,
  restaurant,
  price,
  image,
  href,
  priceSuffix = 'Pontos',
  disableLink,
}: ProductCardProps) {
  const content = (
    <div className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:scale-105 transition-transform">
      <div className="relative w-full h-36 sm:h-40">
        <Image src={image} alt={name} fill className="object-cover" />
      </div>

      <div className="p-3">
        <h3 className="font-semibold text-gray-800 text-sm truncate">{name}</h3>
        <p className="text-gray-500 text-xs truncate">{restaurant}</p>
        <p className="text-[#016DA7] font-bold text-sm mt-1">
          {price}
          {priceSuffix ? ` ${priceSuffix}` : ''}
        </p>
      </div>
    </div>
  );

  if (disableLink) {
    return content;
  }

  const linkHref = href ?? `/estabelecimento/${id}`;
  return (
    <Link href={linkHref}>
      {content}
    </Link>
  );
}
