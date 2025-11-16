'use client';

import Image from "next/image";
import Link from "next/link";

interface ProductDetailCardProps {
  id: string | number;
  name: string;
  restaurant: string;
  restaurantId: number;
  category: string;
  price: string;
  image: string;
  description: string;
  address: string;
  hours: string;
  onRedeem: () => void;
}

export default function ProductDetailCard({
  id,
  name,
  restaurant,
  restaurantId,
  category,
  price,
  image,
  description,
  address,
  hours,
  onRedeem,
}: ProductDetailCardProps) {
  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="relative w-full h-60">
        <Image src={image} alt={name} fill className="object-cover" />
      </div>

      <div className="p-5">
        <h1 className="text-2xl font-bold text-gray-800">{name}</h1>

        <p className="text-gray-500 text-sm mb-2">
          <Link
            href={`/estabelecimento/${restaurantId}`}
            className="text-[#016DA7] hover:underline font-medium"
          >
            {restaurant}
          </Link>{" "}
          | {category}
        </p>

        <p className="text-[#016DA7] text-xl font-bold mb-3">{price}</p>

        <p className="text-gray-700 text-sm mb-4">{description}</p>

        <div className="border-t pt-3 text-sm text-gray-600">
          <p>
            <strong>Endereço:</strong> {address}
          </p>
          <p>
            <strong>Horário:</strong> {hours}
          </p>
        </div>

        <button
          onClick={onRedeem}
          className="mt-6 w-full bg-[#016DA7] text-white font-semibold py-3 rounded-lg hover:bg-[#015B8A] transition"
        >
          Realizar troca dos pontos
        </button>
      </div>
    </div>
  );
}
