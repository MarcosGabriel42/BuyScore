'use client';

import { useSearchParams } from 'next/navigation';
import ClienteForm from './ClienteForm';
import LojistaForm from './LojistaForm';

export default function CadastroForm() {
  const searchParams = useSearchParams();
  const tipo = (searchParams.get('type') as 'cliente' | 'lojista') || 'cliente';

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6">
      {tipo === 'lojista' ? <LojistaForm /> : <ClienteForm />}
    </div>
  );
}
