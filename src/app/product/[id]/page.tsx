'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import ProductDetailCard from '@/components/ProductDetailCard';
import QrPopup from '@/components/QrCodePopup';
import BottomNav from '@/components/BottomNav';
import QrCodeButton from '@/components/QrCodeButton';
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
  endereco?: {
    id: string;
    cep: string;
    logradouro: string;
    complemento?: string;
    bairro: string;
    cidade: string;
    numero: number;
    uf: string;
  };
}

interface ApiComercio {
  id: string;
  usuario: ApiUsuario;
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

export default function ProductPage() {
  const { id } = useParams();
  const produtoId = id as string;

  const [showPopup, setShowPopup] = useState(false);
  const [produto, setProduto] = useState<ApiProduto | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const fetchProduto = async () => {
    try {
      setIsLoading(true);
      setError('');

      const token = auth.getToken();
      if (!token) throw new Error('Token de autenticação não encontrado');

      const url = `http://localhost:8081/produto/${encodeURIComponent(produtoId)}`;
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        throw new Error(`Erro ao buscar produto: ${res.status}`);
      }

      const json = await res.json();
      setProduto(json as ApiProduto);
    } catch (err: any) {
      setError(err?.message || 'Erro ao carregar produto');
      setProduto(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (produtoId) fetchProduto();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [produtoId]);

  const handleOpenPopup = () => {
    setShowPopup(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 pb-24 px-4 py-8 flex justify-center items-center">
        <div className="text-lg text-gray-600">Carregando produto...</div>
      </div>
    );
  }

  if (error || !produto) {
    return (
      <div className="min-h-screen bg-gray-50 pb-24 px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error || 'Produto não encontrado'}
          <button
            onClick={fetchProduto}
            className="ml-2 text-red-800 underline hover:text-red-900"
          >
            Tentar novamente
          </button>
        </div>
        <BottomNav />
      </div>
    );
  }

  // Mapear dados do produto para o formato esperado pelo ProductDetailCard
  const seguimento = (produto.comercio.seguimento || 'outros').toLowerCase();
  const placeholder = imageBySegment[seguimento] || '/img/default.svg';
  const pontos = Number.isFinite(produto.valor) ? Math.round(produto.valor) : 0;

  const endereco = produto.comercio.usuario?.endereco;
  const addressText = endereco
    ? `${endereco.logradouro}, ${endereco.numero} - ${endereco.bairro}, ${endereco.cidade} - ${endereco.uf}`
    : 'Endereço não disponível';

  const productData = {
    id: produto.id,
    name: produto.nome,
    restaurant: produto.comercio.razaoSocial,
    restaurantId: produto.comercio.id,
    category: produto.comercio.seguimento || 'Outros',
    price: `${pontos} Pontos`,
    image: produto.fotoProduto || placeholder, // Usa foto do JSON ou fallback
    description: produto.descricao || 'Sem descrição disponível.',
    address: addressText,
    hours: 'Horário não disponível', // API não retorna horário
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24 px-4 py-8">
      <ProductDetailCard {...productData} onRedeem={handleOpenPopup} />

      {/* Popup */}
      {showPopup && <QrPopup onClose={() => setShowPopup(false)} />}

      <QrCodeButton />
      <BottomNav />
    </div>
  );
}
