'use client';

import Image from 'next/image';
import { useParams } from 'next/navigation';

export default function ProductPage() {
  const { id } = useParams();

  // Exemplo de produto fictício (depois podemos buscar da API)
  const product = {
    id,
    name: 'Pizza Margherita',
    restaurant: 'Bella Itália',
    category: 'Restaurantes',
    price: 'R$ 39,90',
    image: '/img/pizza.jpg',
    description:
      'Deliciosa pizza com molho de tomate artesanal, mussarela fresca e folhas de manjericão. Massa crocante e leve, perfeita para saborear a qualquer hora.',
    address: 'Av. Central, 123 - Centro, Blumenau',
    hours: 'Seg a Dom: 11h às 23h',
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24 px-4 py-8">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="relative w-full h-60">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>

        <div className="p-5">
          <h1 className="text-2xl font-bold text-gray-800">{product.name}</h1>
          <p className="text-gray-500 text-sm mb-2">
            {product.restaurant} | {product.category}
          </p>
          <p className="text-[#016DA7] text-xl font-bold mb-3">
            {product.price}
          </p>

          <p className="text-gray-700 text-sm mb-4">{product.description}</p>

          <div className="border-t pt-3 text-sm text-gray-600">
            <p>
              <strong>Endereço:</strong> {product.address}
            </p>
            <p>
              <strong>Horário:</strong> {product.hours}
            </p>
          </div>

          <button className="mt-6 w-full bg-[#016DA7] text-white font-semibold py-3 rounded-lg hover:bg-[#015B8A] transition">
            Realizar troca dos pontos
          </button>
        </div>
      </div>
    </div>
  );
}
