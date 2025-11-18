'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import BottomNav from '@/components/BottomNav';
import ProductCard from '@/components/ProductCard';
import QrCodeButton from '@/components/QrCodeButton';
import { auth } from '@/utils/auth';

// Placeholders por seguimento
const imageBySegment: Record<string, string> = {
  restaurantes: '/img/pizza.svg',
  mercados: '/img/prato.svg',
  farmacias: '/img/sushi.svg',
  outros: '/img/burger.svg',
};

interface ApiUsuario {
  id: string;
  nome: string;
  email: string;
  perfilUsuario: number;
  fotoUsuario?: string;
}

interface ApiEndereco {
  id: string;
  cep: string;
  logradouro: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  numero: number;
  uf: string;
}

interface ApiComercio {
  id: string;
  usuario: ApiUsuario & { endereco?: ApiEndereco };
  cnpj?: string;
  razaoSocial: string;
  descricao?: string;
  seguimento?: string;
  matriz?: any;
  vendas?: number;
}

export default function BuscaPage() {
  const params = useSearchParams();
  const router = useRouter();
  const query = params.get('nome') || '';

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [results, setResults] = useState<ApiComercio[]>([]);

  const fetchResultados = async (q: string) => {
    try {
      setIsLoading(true);
      setError('');

      if (!q.trim()) {
        setResults([]);
        return;
      }

      const token = auth.getToken();
      if (!token) throw new Error('Token de autenticação não encontrado');

      const url = `http://localhost:8081/comercio/buscar?nome=${encodeURIComponent(q)}`;
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (!res.ok) {
        throw new Error(`Erro na busca: ${res.status}`);
      }

      const json = await res.json();
      const list: ApiComercio[] = Array.isArray(json) ? json : json ? [json] : [];
      setResults(list);
    } catch (err: any) {
      setError(err?.message || 'Erro ao buscar comércios');
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchResultados(query);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const headerTitle = useMemo(() => {
    if (!query) return 'Resultados da busca';
    return `Resultados para "${query}"`;
  }, [query]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center pb-20">
      {/* Header simples */}
      <div className="w-full bg-[#016DA7] text-white py-6 text-center font-bold text-xl">
        {headerTitle}
      </div>

      <div className="w-full max-w-6xl px-4 py-8">
        {/* Erro */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
            <button
              onClick={() => fetchResultados(query)}
              className="ml-2 text-red-800 underline hover:text-red-900"
            >
              Tentar novamente
            </button>
          </div>
        )}

        {/* Loading */}
        {isLoading && (
          <div className="flex justify-center items-center py-8">
            <div className="text-lg text-gray-600">Carregando comércios...</div>
          </div>
        )}

        {/* Empty */}
        {!isLoading && !error && results.length === 0 && (
          <div className="text-center text-gray-600 py-8">
            Nenhum estabelecimento encontrado.
          </div>
        )}

        {/* Grid de comércios */}
        {!isLoading && results.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 w-full">
            {results.map((c) => {
              const segKey = (c.seguimento || '').toLowerCase();
              const placeholder = imageBySegment[segKey] || '/img/default.svg';
              return (
                <ProductCard
                  key={c.id}
                  id={c.id}
                  name={c.razaoSocial}
                  restaurant={c.descricao || c.seguimento || 'Estabelecimento'}
                  price=""
                  priceSuffix=""
                  image={c.usuario?.fotoUsuario || placeholder} // Usa foto do JSON ou fallback
                  href={`/estabelecimento/${c.id}`}
                />
              );
            })}
          </div>
        )}
      </div>

      {/* Menu de navegação inferior */}
      <div className="fixed bottom-0 w-full max-w-6xl">
        <QrCodeButton />
        <BottomNav />
      </div>
    </div>
  );
}
