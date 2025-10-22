'use client';

import { useState } from 'react';
import { Search, X } from 'lucide-react';

export default function Header() {
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleSearch = () => setShowSearch((prev) => !prev);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Pesquisando:', searchQuery);
  };

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

      {/* Campo de pesquisa animado */}
      {showSearch && (
        <form
          onSubmit={handleSubmit}
          className="bg-white flex items-center justify-center py-3 px-4 border-t border-gray-200 animate-fadeIn"
        >
          <input
            type="text"
            placeholder="Digite sua busca..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full max-w-md border border-gray-300 rounded-md px-4 py-2 text-gray-800 focus:ring-2 focus:ring-[#016DA7] outline-none"
          />
        </form>
      )}
    </header>
  );
}
