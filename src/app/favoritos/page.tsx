'use client';

import { useEffect, useState } from 'react';
import LojaFavoritaCard from '@/components/LojaFavoritaCard';
import BottomNav from '@/components/BottomNav';
import QrCodeButton from '@/components/QrCodeButton';
import { auth } from '@/utils/auth';

// Tipagem parcial baseada no retorno do backend
interface FavoritoApi {
  id: string; // UUID do comércio favorito (comércio)
  razaoSocial: string;
  seguimento?: string; // e.g. 'mercados', 'restaurantes', 'farmacias', 'outros'
}

const mapSegmentToCategoria = (seg?: string): string => {
  const s = (seg || '').toLowerCase();
  switch (s) {
    case 'restaurantes':
      return 'Restaurantes';
    case 'mercados':
      return 'Mercados';
    case 'farmacias':
    case 'farmácias':
      return 'Farmácias';
    default:
      return 'Outros';
  }
};

export default function FavoritosPage() {
  const [favoritos, setFavoritos] = useState<FavoritoApi[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchFavoritos = async () => {
    try {
      setIsLoading(true);
      setError('');

      const token = auth.getToken();
      if (!token) throw new Error('Token de autenticação não encontrado');

      const res = await fetch('http://localhost:8081/cliente/comercio-favoritos', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        throw new Error(`Erro ao carregar favoritos: ${res.status}`);
      }

      const json = await res.json();
      const items: FavoritoApi[] = Array.isArray(json) ? json : [];
      setFavoritos(items);
    } catch (err: any) {
      setError(err.message || 'Erro ao carregar favoritos');
      console.error('Erro ao buscar favoritos:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFavoritos();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pb-24 px-4 pt-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Meus Favoritos
      </h1>

      {error && (
        <div className="max-w-md mx-auto bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
          <button onClick={fetchFavoritos} className="ml-2 underline">
            Tentar novamente
          </button>
        </div>
      )}

      {isLoading ? (
        <div className="max-w-md mx-auto text-center text-gray-600">Carregando favoritos...</div>
      ) : favoritos.length === 0 ? (
        <div className="max-w-md mx-auto text-center text-gray-600">Você ainda não possui favoritos.</div>
      ) : (
        <div className="max-w-md mx-auto">
          {favoritos.map((loja) => (
            <LojaFavoritaCard
              key={loja.id}
              id={loja.id}
              nome={loja.razaoSocial}
              categoria={mapSegmentToCategoria(loja.seguimento)}
            />
          ))}
        </div>
      )}

      <BottomNav />
      <QrCodeButton />
    </div>
  );
}
