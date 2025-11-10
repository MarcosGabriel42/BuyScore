'use client';

import { Utensils, ShoppingCart, Pill, Grid } from 'lucide-react';
import Link from 'next/link';
import BottomNav from '@/components/BottomNav';
import ProductCarousel from '@/components/ProductCarousel';
import QrCodeButton from '@/components/QrCodeButton'; // 👈 Importa o botão QR Code

export default function HomePage() {
  const filters = [
    { id: 'restaurantes', label: 'Restaurantes', color: '#00a944', icon: <Utensils size={30} /> },
    { id: 'mercados', label: 'Mercados', color: '#FFAD56', icon: <ShoppingCart size={30} /> },
    { id: 'farmacias', label: 'Farmácias', color: '#FF5656', icon: <Pill size={30} /> },
    { id: 'outros', label: 'Outros Serviços', color: '#5686FF', icon: <Grid size={30} /> },
  ];

  const sampleProducts = [
    { id: 1, name: 'Pizza Margherita', restaurant: 'Bella Itália', price: 'R$ 39,90', image: '/img/pizza.jpg' },
    { id: 2, name: 'Sushi Combo', restaurant: 'Tokyo Bar', price: 'R$ 59,90', image: '/img/sushi.jpg' },
    { id: 3, name: 'Hambúrguer Artesanal', restaurant: 'Burger House', price: 'R$ 29,90', image: '/img/burger.jpg' },
    { id: 4, name: 'Churrasco Gourmet', restaurant: 'Costela & Cia', price: 'R$ 79,90', image: '/img/churrasco.jpg' },
    { id: 5, name: 'Prato Executivo', restaurant: 'Sabor & Arte', price: 'R$ 25,00', image: '/img/prato.jpg' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col overflow-x-hidden pb-24 relative">
      <main className="flex-1 max-w-6xl mx-auto px-4 py-8 w-full">
        {/* === GRID DE FILTROS === */}
        <div className="flex flex-wrap justify-between gap-3 sm:gap-5 mb-10 w-full">
          {filters.map((filter) => (
            <Link
              key={filter.id}
              href={`/categoria/${filter.id}`}
              className="flex flex-col items-center justify-center rounded-xl p-4 sm:p-6 text-white font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex-1 min-w-[45%] sm:min-w-[150px] max-w-[200px]"
              style={{
                backgroundColor: filter.color,
              }}
            >
              <div className="mb-2 sm:mb-3">{filter.icon}</div>
              <span className="text-xs sm:text-sm text-center leading-tight">{filter.label}</span>
            </Link>
          ))}
        </div>

        {/* === CARROSSEIS DE PRODUTOS === */}
        <ProductCarousel
          title="Restaurantes"
          color="#00a944"
          products={sampleProducts}
          seeMoreLink="/categoria/restaurantes"
        />

        <ProductCarousel
          title="Mercados"
          color="#FFAD56"
          products={sampleProducts}
          seeMoreLink="/categoria/mercados"
        />

        <ProductCarousel
          title="Farmácias"
          color="#FF5656"
          products={sampleProducts}
          seeMoreLink="/categoria/farmacias"
        />

        <ProductCarousel
          title="Outros Serviços"
          color="#5686FF"
          products={sampleProducts}
          seeMoreLink="/categoria/outros"
        />
      </main>


      <QrCodeButton />

      <BottomNav />
    </div>
  );
}
