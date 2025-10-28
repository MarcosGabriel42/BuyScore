'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import BottomNav from '@/components/BottomNav';

// Simulação de catálogo de produtos por categoria
const allProducts = {
  restaurantes: [
    { id: 1, name: 'Pizza Margherita', restaurant: 'Bella Itália', price: 'R$ 39,90', image: '/img/pizza.jpg' },
    { id: 2, name: 'Sushi Combo', restaurant: 'Tokyo Bar', price: 'R$ 59,90', image: '/img/sushi.jpg' },
    { id: 3, name: 'Churrasco Gourmet', restaurant: 'Costela & Cia', price: 'R$ 79,90', image: '/img/churrasco.jpg' },
    { id: 4, name: 'Prato Executivo', restaurant: 'Sabor & Arte', price: 'R$ 25,00', image: '/img/prato.jpg' },
  ],
  mercados: [
    { id: 5, name: 'Cesta Básica', restaurant: 'Mercadão Central', price: 'R$ 89,90', image: '/img/mercado.jpg' },
    { id: 6, name: 'Arroz 5kg', restaurant: 'Bom Preço', price: 'R$ 24,90', image: '/img/arroz.jpg' },
    { id: 7, name: 'Feijão 1kg', restaurant: 'Super Vale', price: 'R$ 9,90', image: '/img/feijao.jpg' },
    { id: 8, name: 'Macarrão', restaurant: 'Mercado Ideal', price: 'R$ 5,50', image: '/img/macarrao.jpg' },
  ],
  farmacias: [
    { id: 9, name: 'Analgésico 500mg', restaurant: 'Drogaria Saúde', price: 'R$ 12,90', image: '/img/remedio.jpg' },
    { id: 10, name: 'Protetor Solar', restaurant: 'Farma Bem', price: 'R$ 39,90', image: '/img/protetor.jpg' },
    { id: 11, name: 'Multivitamínico', restaurant: 'Saúde+ Farma', price: 'R$ 49,90', image: '/img/vitamina.jpg' },
    { id: 12, name: 'Xarope Infantil', restaurant: 'Drogasil', price: 'R$ 29,90', image: '/img/xarope.jpg' },
  ],
  outros: [
    { id: 13, name: 'Corte de Cabelo', restaurant: 'Barbearia Premium', price: 'R$ 35,00', image: '/img/barbearia.jpg' },
    { id: 14, name: 'Lavagem de Carro', restaurant: 'Auto Clean', price: 'R$ 50,00', image: '/img/lavagem.jpg' },
    { id: 15, name: 'Serviço de Pet Shop', restaurant: 'Pet Amigo', price: 'R$ 70,00', image: '/img/petshop.jpg' },
    { id: 16, name: 'Aula de Yoga', restaurant: 'Zen Studio', price: 'R$ 60,00', image: '/img/yoga.jpg' },
  ],
};

const categoryColors: Record<string, string> = {
  restaurantes: '#00a944',
  mercados: '#FFAD56',
  farmacias: '#FF5656',
  outros: '#5686FF',
};

export default function CategoriaPage() {
  const { id } = useParams();
  const categoryId = id as string;

  const products = allProducts[categoryId as keyof typeof allProducts] || [];
  const color = categoryColors[categoryId] || '#016DA7';
  const title = categoryId.charAt(0).toUpperCase() + categoryId.slice(1);

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Banner da categoria */}
      <div
        className="w-full py-10 text-center text-white font-bold text-2xl"
        style={{ backgroundColor: color }}
      >
        {title}
      </div>

      {/* Catálogo 2x2 */}
      <div className="max-w-5xl mx-auto px-4 py-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:scale-105 transition-transform"
          >
            <div className="relative w-full h-36 sm:h-40">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-3">
              <h3 className="font-semibold text-gray-800 text-sm truncate">{product.name}</h3>
              <p className="text-gray-500 text-xs truncate">{product.restaurant}</p>
              <p className="text-[#016DA7] font-bold text-sm mt-1">{product.price}</p>
            </div>
          </div>
        ))}
      </div>

      {/* BottomNav fixo */}
      <div className="fixed bottom-0 w-full max-w-6xl">
        <BottomNav />
      </div>
    </div>
  );
}
