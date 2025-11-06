'use client';

import Link from 'next/link';
import { Star } from 'lucide-react';

interface LojaFavoritaCardProps {
  id: number;
  nome: string;
  categoria: string;
  corCategoria?: string;
}

const categoriaCores: Record<string, string> = {
  Restaurantes: '#00a944',
  Mercados: '#FFAD56',
  Farmácias: '#FF5656',
  Outros: '#5686FF',
};

export default function LojaFavoritaCard({
  id,
  nome,
  categoria,
  corCategoria,
}: LojaFavoritaCardProps) {
  const cor = corCategoria || categoriaCores[categoria] || '#016DA7';

  return (
    <Link
      href={`/estabelecimento/${id}`}
      className="flex items-center justify-between bg-white shadow-sm rounded-xl px-4 py-3 mb-3 hover:shadow-md transition hover:scale-[1.02]"
    >
      <div>
        <h3 className="text-gray-900 font-semibold text-base">{nome}</h3>
        <p className="text-sm text-gray-500" style={{ color: cor }}>
          {categoria}
        </p>
      </div>

      <Star className="text-yellow-400 fill-yellow-400 w-6 h-6" />
    </Link>
  );
}
