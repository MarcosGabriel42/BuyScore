'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import BottomNav from '@/components/BottomNav';
import { LogOut, Edit } from 'lucide-react';
import QrCodeButton from '@/components/QrCodeButton';
import Base64Image from '@/components/Base64Image';
import { auth } from '@/utils/auth';

interface ApiCliente {
  nome: string;
  email: string;
  senha: string;
  perfilUsuario: number;
  fotoUsuario: string;
  cep: string;
  logradouro: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  numero: number;
  uf: string;
}

export default function PerfilPage() {
  const router = useRouter();
  const [usuario, setUsuario] = useState<ApiCliente | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchPerfil = async () => {
    try {
      setIsLoading(true);
      setError('');

      const token = auth.getToken();
      if (!token) {
        router.push('/login?type=cliente');
        return;
      }

      const res = await fetch('http://localhost:8081/cliente', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        if (res.status === 401) {
          auth.removeToken();
          router.push('/login?type=cliente');
          return;
        }
        throw new Error(`Erro ao carregar perfil: ${res.status}`);
      }

      const data = await res.json();
      setUsuario(data as ApiCliente);
    } catch (err: any) {
      setError(err?.message || 'Erro ao carregar perfil');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPerfil();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = () => {
    auth.removeToken();
    router.push('/login?type=cliente');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center pb-24">
        <div className="text-lg text-gray-600">Carregando perfil...</div>
      </div>
    );
  }

  if (error || !usuario) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center pb-24 px-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 max-w-md">
          {error || 'Erro ao carregar perfil'}
          <button
            onClick={fetchPerfil}
            className="ml-2 text-red-800 underline hover:text-red-900"
          >
            Tentar novamente
          </button>
        </div>
        <BottomNav />
      </div>
    );
  }

  const enderecoCompleto = `${usuario.logradouro}, ${usuario.numero}${usuario.complemento ? ` - ${usuario.complemento}` : ''} - ${usuario.bairro}, ${usuario.cidade}/${usuario.uf} - CEP: ${usuario.cep}`;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center pt-10 pb-24 px-4">
      
      {/* Foto e Nome */}
      <div className="flex flex-col items-center gap-4 mb-8">
        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-blue-500 shadow-lg">
          <Base64Image
            src={usuario.fotoUsuario || '/profile-placeholder.png'}
            alt="Foto de perfil"
            width={96}
            height={96}
            fallback="/profile-placeholder.png"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">{usuario.nome}</h2>
          <p className="text-sm text-gray-500">{usuario.email}</p>
        </div>
      </div>

      {/* Informações do Perfil */}
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Informações Pessoais</h3>
        <div className="space-y-3">
          <div>
            <p className="text-xs text-gray-500 uppercase">Nome</p>
            <p className="text-base text-gray-800">{usuario.nome}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase">E-mail</p>
            <p className="text-base text-gray-800">{usuario.email}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase">Endereço</p>
            <p className="text-base text-gray-800">{enderecoCompleto}</p>
          </div>
        </div>
      </div>

      {/* Botões */}
      <div className="flex flex-col items-center gap-4 w-full max-w-md">

        {/* Editar perfil */}
        <Link href="/editar-perfil" className="w-full">
          <Button className="w-full bg-[#016DA7] hover:bg-blue-700 text-white flex items-center justify-center gap-2 rounded-lg py-6 text-base">
            <Edit className="w-5 h-5" />
            Editar perfil
          </Button>
        </Link>

        {/* Sair */}
        <Button
          onClick={handleLogout}
          variant="outline"
          className="w-full border-red-500 text-red-500 hover:bg-red-50 flex items-center justify-center gap-2 rounded-lg py-6 text-base"
        >
          <LogOut className="w-5 h-5" />
          Sair
        </Button>

      </div>

      <QrCodeButton />
      <BottomNav />

    </div>
  );
}
