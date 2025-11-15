'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import BottomNav from '@/components/BottomNav';
import QrCodeButton from '@/components/QrCodeButton';
import ProductCard from '@/components/ProductCard';
import { allProducts } from '@/data/allProducts/product';


// --- Cores das categorias ---
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

      {/* Grid de produtos */}
      <div className="max-w-5xl mx-auto px-4 py-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            restaurant={product.restaurant}
            price={product.price.toString()}
            image={product.image}
          />
        ))}
      </div>

      {/* Navegação inferior fixa */}
      <div className="fixed bottom-0 w-full max-w-6xl">
        <QrCodeButton />
        <BottomNav />
      </div>
    </div>
  );
}
