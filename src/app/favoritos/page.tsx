'use client';

import LojaFavoritaCard from '@/components/LojaFavoritaCard';
import BottomNav from '@/components/BottomNav';
import QrCodeButton from '@/components/QrCodeButton';
// Dados simulados (futuramente virão da API)
const lojasFavoritas = [
  { id: 12, nome: 'Bella Itália', categoria: 'Restaurantes' },
  { id: 7, nome: 'Super Vale', categoria: 'Mercados' },
  { id: 3, nome: 'Drogaria Saúde', categoria: 'Farmácias' },
  { id: 9, nome: 'Pet Amigo', categoria: 'Outros' },
];

export default function FavoritosPage() {
  return (
    <div className="min-h-screen bg-gray-50 pb-24 px-4 pt-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Meus Favoritos 
      </h1>

      <div className="max-w-md mx-auto">
        {lojasFavoritas.map((loja) => (
          <LojaFavoritaCard
            key={loja.id}
            id={loja.id}
            nome={loja.nome}
            categoria={loja.categoria}
          />
        ))}
      </div>

      <BottomNav />
      <QrCodeButton />      
    </div>
  );
}
