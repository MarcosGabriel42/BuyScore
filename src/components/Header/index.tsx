'use client';

import { useState } from 'react';
import { Search, X } from 'lucide-react';
import Link from 'next/link';
import { auth } from '@/utils/auth';
import { useRouter } from 'next/navigation';

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

export default function Header() {
  const router = useRouter();
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState('');
  const [results, setResults] = useState<ApiComercio[]>([]);

  const toggleSearch = () => {
    setShowSearch((prev) => {
      const next = !prev;
      if (!next) {
        // limpamos quando fecha a busca
        setSearchQuery('');
        setResults([]);
        setError('');
        setIsSearching(false);
      }
      return next;
    });
  };

  const doSearch = () => {
    const query = searchQuery.trim();
    if (!query) {
      setResults([]);
      setError('');
      return;
    }
    router.push(`/busca?nome=${encodeURIComponent(query)}`);
    setShowSearch(false);
    setIsSearching(false);
    setError('');
    setResults([]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    doSearch();
  };

  const hasResults = results && results.length > 0;

  return (
    <header className="bg-[#016DA7] text-white shadow-md sticky top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-end items-center">
        {/* Botão da lupa */}
        <button
          onClick={toggleSearch}
          className="p-2 rounded-full hover:bg-[#015d8e] transition"
          aria-label="Pesquisar"
        >
          {showSearch ? <X size={22} /> : <Search size={22} />}
        </button>
      </div>

      {/* Campo de pesquisa + resultados */}
      {showSearch && (
        <div className="bg-white border-t border-gray-200 animate-fadeIn">
          <form
            onSubmit={handleSubmit}
            className="flex items-center justify-center gap-2 py-3 px-4"
          >
            <input
              type="search"
              placeholder="Buscar estabelecimentos por nome..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); doSearch(); } }}
              className="w-full max-w-md border border-gray-300 rounded-md px-4 py-2 text-gray-800 focus:ring-2 focus:ring-[#016DA7] outline-none"
            />
            <button
              type="submit"
              className="bg-[#016DA7] text-white px-4 py-2 rounded-md hover:bg-[#015d8e] transition"
              aria-label="Buscar"
            >
              Buscar
            </button>
          </form>

          {/* Estado de busca/erro/resultado */}
          <div className="max-w-7xl mx-auto px-4 pb-3">
            {isSearching && (
              <div className="text-gray-600">Buscando...</div>
            )}
            {error && (
              <div className="text-red-600">{error}</div>
            )}
            {!isSearching && !error && hasResults && (
              <ul className="bg-white rounded-md shadow border border-gray-200 divide-y">
                {results.map((c) => (
                  <li key={c.id}>
                    <Link
                      href={`/estabelecimento/${c.id}`}
                      className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50"
                      onClick={() => setShowSearch(false)}
                    >
                      <div className="flex-1">
                        <div className="font-semibold text-gray-800">{c.razaoSocial}</div>
                        <div className="text-xs text-gray-500">{c.seguimento || '—'}</div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
            {!isSearching && !error && !hasResults && searchQuery.trim().length > 0 && (
              <div className="text-gray-600">Nenhum resultado encontrado.</div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
