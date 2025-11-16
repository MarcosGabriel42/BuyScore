'use client';

import { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Star } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import ProductCard from "@/components/ProductCard";
import QrCodeButton from "@/components/QrCodeButton";
import FavoriteButton from "@/components/FavoriteButton";


export default function EstabelecimentoPage() {
  const { id } = useParams();
  const [favorito, setFavorito] = useState(false);

  // Simulação dos dados do estabelecimento
  const estabelecimento = {
    id,
    nome: "Restaurante Sabor da Serra",
    categoria: "Pizzas",
    banner: "/banner-exemplo.jpg",
    produtos: [
      {
        id: 1,
        name: "Lasanha de Frango",
        price: "120 pontos",
        image: "/produtos/lasanha.jpg",
      },
      {
        id: 2,
        name: "Pizza Marguerita",
        price: "95 pontos",
        image: "/produtos/pizza.jpg",
      },
      {
        id: 3,
        name: "Refrigerante 350ml",
        price: "30 pontos",
        image: "/produtos/refri.jpg",
      },
      {
        id: 4,
        name: "Sobremesa da Casa",
        price: "60 pontos",
        image: "/produtos/sobremesa.jpg",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center pb-20">
      
      {/* Banner do estabelecimento */}
      <div className="relative w-full h-56 sm:h-72 md:h-80 bg-gray-300">
        <Image
          src={estabelecimento.banner}
          alt={estabelecimento.nome}
          fill
          className="object-cover rounded-b-2xl"
        />

        {/* Sobreposição e informações */}
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end p-6 text-white rounded-b-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">
                {estabelecimento.nome}
              </h1>
              <p className="text-sm sm:text-base text-gray-200">
                {estabelecimento.categoria}
              </p>
            </div>

            {/* Estrela de favorito */}
            <FavoriteButton 
              isFavorite={favorito}
              onToggle={() => setFavorito(!favorito)}
            />
          </div>
        </div>
      </div>

      {/* Catálogo reutilizando o mesmo ProductCard */}
      <div className="w-full max-w-6xl px-4 py-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {estabelecimento.produtos.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              restaurant={estabelecimento.nome}  // opcional
              price={product.price}
              image={product.image}
            />
          ))}
        </div>
      </div>

      {/* Menu de navegação inferior */}
      <div className="fixed bottom-0 w-full max-w-6xl">
        <QrCodeButton />
        <BottomNav />
      </div>
    </div>
  );
}
