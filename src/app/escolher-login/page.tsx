'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function EscolherLoginPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-black px-6">
      {/* Logo e Nome */}
      <div className="flex flex-col items-center mb-10 animate-fadeIn">
        <div className="w-24 h-24 mb-4 relative">
          <Image
            src="/logo.png"
            alt="Logo BuyScore"
            fill
            className="object-contain"
          />
        </div>
        <h1 className="text-4xl font-bold tracking-wide">BuyScore</h1>
        <p className="text-sm mt-2 text-black-200 text-center max-w-sm">
          Escolha como deseja acessar sua conta
        </p>
      </div>

      {/* Opções de login */}
      <div className="flex flex-col gap-4 w-full max-w-xs animate-fadeIn">
        <button
          onClick={() => router.push('/login?tipo=cliente')}
          className="w-full bg-[#016DA7] text-white font-semibold py-3 rounded-lg shadow-md hover:bg-[#016da7c7] transition"
        >
          Entrar como Cliente
        </button>

        <button
          onClick={() => router.push('/login?tipo=logista')}
          className="text-[#016DA7] w-full bg-transparent border-2 border-[#016DA7] font-semibold py-3 rounded-lg hover:bg-[#016DA7] hover:text-white transition"
        >
          Entrar como Logista
        </button>
      </div>

      {/* Rodapé opcional */}
      <p className="mt-10 text-xs text-gray-300 text-center">
        Ao continuar, você concorda com nossos <br />
        <span className="underline cursor-pointer hover:text-white">
          Termos de uso e Política de privacidade
        </span>
      </p>
    </div>
  );
}
