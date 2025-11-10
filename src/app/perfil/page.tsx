'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import BottomNav from '@/components/BottomNav';
import { LogOut, User, Edit } from 'lucide-react';
import QrCodeButton from '@/components/QrCodeButton';

export default function PerfilPage() {
  const usuario = {
    nome: 'Marcos Gabriel',
    foto: '/profile-placeholder.png', // você pode trocar essa imagem depois
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center pt-10 pb-24">
      {/* Foto e Nome */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-blue-500 shadow-md">
          <Image
            src={usuario.foto}
            alt="Foto de perfil"
            width={80}
            height={80}
            className="object-cover w-full h-full"
          />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-800">{usuario.nome}</h2>
          <p className="text-sm text-gray-500">Usuário desde 2025</p>
        </div>
      </div>

      {/* Botões */}
      <div className="flex flex-col items-center gap-4 w-full max-w-xs">
        <Button
          className="w-full bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center gap-2 rounded-full py-6 text-base"
        >
          <Edit className="w-5 h-5" />
          Editar perfil
        </Button>

        <Button
          variant="outline"
          className="w-full border-red-500 text-red-500 hover:bg-red-50 flex items-center justify-center gap-2 rounded-full py-6 text-base"
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
