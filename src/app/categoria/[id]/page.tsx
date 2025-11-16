'use client';

import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import BottomNav from '@/components/BottomNav';
import QrCodeButton from '@/components/QrCodeButton';
import ProductCard from '@/components/ProductCard';
import { auth } from '@/utils/auth';

// --- Tipos vindos da API ---
interface ApiComercio {
  comercioId: string;
  razaoSocial: string;
  descricao?: string;
  seguimento?: string;
  fotoUsuario?: string;
  pontosDoCliente?: number;
}

// --- Cores das categorias ---
const categoryColors: Record<string, string> = {
  restaurantes: '#00a944',
  mercados: '#FFAD56',
  farmacias: '#FF5656',
  outros: '#5686FF',
};

// --- Placeholders de imagens "commitadas" por segmento ---
const imageBySegment: Record<string, string> = {
  restaurantes: '/img/pizza.svg',
  mercados: '/img/prato.svg',
  farmacias: '/img/sushi.svg',
  outros: '/img/burger.svg',
};

export default function CategoriaPage() {
  const { id } = useParams();
  const categoryId = (id as string)?.toLowerCase();

  const [items, setItems] = useState<ApiComercio[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const color = categoryColors[categoryId] || '#016DA7';
  const title = useMemo(() => {
    if (!categoryId) return 'Categoria';
    return categoryId.charAt(0).toUpperCase() + categoryId.slice(1);
  }, [categoryId]);

  // Busca até 100 itens do seguimento
  const fetchCategoria = async (segment: string) => {
    try {
      setIsLoading(true);
      setError('');

      const token = auth.getToken();
      if (!token) throw new Error('Token de autenticação não encontrado');

      const url = `http://localhost:8081/comercio/top-seguimento?seguimento=${encodeURIComponent(segment)}&limite=100`;
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        throw new Error(`Erro ao buscar categoria ${segment}: ${res.status}`);
      }

      const json = await res.json();
      const list = Array.isArray(json)
        ? json
        : Array.isArray(json?.content)
        ? json.content
        : json
        ? [json]
        : [];

      setItems(list as ApiComercio[]);
    } catch (err: any) {
      setError(err?.message || 'Erro ao carregar categoria');
      setItems([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (categoryId) {
      fetchCategoria(categoryId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId]);

  // Mapeia para o formato usado por ProductCard
  const products = useMemo(() => {
    const placeholder = imageBySegment[categoryId] || '/img/default.svg';
    return items.map((c) => ({
      id: c.comercioId,
      name: c.razaoSocial,
      restaurant: c.descricao || c.seguimento || 'Estabelecimento',
      price: typeof c.pontosDoCliente === 'number' ? String(c.pontosDoCliente) : '—',
      image: placeholder,
    }));
  }, [items, categoryId]);

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Banner da categoria */}
      <div
        className="w-full py-10 text-center text-white font-bold text-2xl"
        style={{ backgroundColor: color }}
      >
        {title}
      </div>

      <main className="max-w-5xl mx-auto px-4 py-8 w-full">
        {/* Erro */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
            <button
              onClick={() => categoryId && fetchCategoria(categoryId)}
              className="ml-2 text-red-800 underline hover:text-red-900"
            >
              Tentar novamente
            </button>
          </div>
        )}

        {/* Loading */}
        {isLoading && (
          <div className="flex justify-center items-center py-8">
            <div className="text-lg text-gray-600">Carregando {title.toLowerCase()}...</div>
          </div>
        )}

        {/* Empty */}
        {!isLoading && !error && products.length === 0 && (
          <div className="text-center text-gray-600 py-8">
            Nenhum estabelecimento encontrado para esta categoria.
          </div>
        )}

        {/* Grid de produtos */}
        {!isLoading && products.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                restaurant={product.restaurant}
                price={product.price}
                image={product.image}
              />
            ))}
          </div>
        )}
      </main>

      {/* Navegação inferior fixa */}
      <div className="fixed bottom-0 w-full max-w-6xl">
        <QrCodeButton />
        <BottomNav />
      </div>
    </div>
  );
}
