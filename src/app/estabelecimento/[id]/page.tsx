'use client';

import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import BottomNav from '@/components/BottomNav';
import ProductCard from '@/components/ProductCard';
import QrCodeButton from '@/components/QrCodeButton';
import FavoriteButton from '@/components/FavoriteButton';
import { auth } from '@/utils/auth';

// Placeholders por seguimento (ignorando imagens do JSON)
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

interface ApiProduto {
  id: string;
  nome: string;
  descricao?: string;
  valor: number;
  ativo: boolean;
  fotoProduto?: string;
  comercio: ApiComercio;
}

export default function EstabelecimentoPage() {
  const { id } = useParams();
  const comercioId = id as string;

  const [favorito, setFavorito] = useState(false);
  const [produtos, setProdutos] = useState<ApiProduto[]>([]);
  const [estabelecimentoNome, setEstabelecimentoNome] = useState<string>('Estabelecimento');
  const [categoria, setCategoria] = useState<string>('');
  const [banner, setBanner] = useState<string>('/img/default.svg');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const currency = useMemo(() =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }),
  []);

  const fetchProdutos = async () => {
    try {
      setIsLoading(true);
      setError('');

      const token = auth.getToken();
      if (!token) throw new Error('Token de autenticação não encontrado');

      const url = `http://localhost:8081/produto/comercio/${encodeURIComponent(comercioId)}`;
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (!res.ok) {
        throw new Error(`Erro ao buscar produtos: ${res.status}`);
      }

      const json = await res.json();
      const items: ApiProduto[] = Array.isArray(json)
        ? json
        : Array.isArray(json?.content)
        ? json.content
        : json
        ? [json]
        : [];

      setProdutos(items);

      // Preencher dados do estabelecimento com base no primeiro item
      const first = items[0];
      if (first?.comercio) {
        setEstabelecimentoNome(first.comercio.razaoSocial || 'Estabelecimento');
        const seg = (first.comercio.seguimento || '').toLowerCase();
        setCategoria(seg);
        // Ignorar imagens do JSON: usar placeholders por seguimento
        const bannerPlaceholder = imageBySegment[seg] || '/img/default.svg';
        setBanner(bannerPlaceholder);
      }
    } catch (err: any) {
      setError(err?.message || 'Erro ao carregar produtos');
      setProdutos([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (comercioId) fetchProdutos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [comercioId]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center pb-20">
      {/* Banner do estabelecimento */}
      <div className="relative w-full h-56 sm:h-72 md:h-80 bg-gray-300">
        <Image
          src={banner}
          alt={estabelecimentoNome}
          fill
          className="object-cover rounded-b-2xl"
        />

        {/* Sobreposição e informações */}
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end p-6 text-white rounded-b-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">{estabelecimentoNome}</h1>
              <p className="text-sm sm:text-base text-gray-200">{categoria}</p>
            </div>

            <FavoriteButton
              isFavorite={favorito}
              onToggle={() => setFavorito(!favorito)}
            />
          </div>
        </div>
      </div>

      <div className="w-full max-w-6xl px-4 py-8">
        {/* Erro */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
            <button
              onClick={fetchProdutos}
              className="ml-2 text-red-800 underline hover:text-red-900"
            >
              Tentar novamente
            </button>
          </div>
        )}

        {/* Loading */}
        {isLoading && (
          <div className="flex justify-center items-center py-8">
            <div className="text-lg text-gray-600">Carregando produtos...</div>
          </div>
        )}

        {/* Empty */}
        {!isLoading && !error && produtos.length === 0 && (
          <div className="text-center text-gray-600 py-8">
            Nenhum produto encontrado para este estabelecimento.
          </div>
        )}

        {/* Grid de produtos (imagens ignoradas do JSON, usando placeholders) */}
        {!isLoading && produtos.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {produtos.map((p) => {
              const segKey = (categoria || '').toLowerCase();
              const placeholder = imageBySegment[segKey] || '/img/default.svg';
              const pontos = Number.isFinite(p.valor) ? Math.round(p.valor) : 0;
              return (
              <ProductCard
                key={p.id}
                id={p.id}
                name={p.nome}
                restaurant={estabelecimentoNome}
                  price={String(pontos)}
                image={placeholder}
                  priceSuffix="Pontos" // exibe 'Pontos'
                disableLink // não navega ao clicar
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
