'use client';

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface LoginFormProps {
  tipo: "cliente" | "lojista";
}

export default function LoginForm({ tipo }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`Login como ${tipo}:`, { email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6">
      <div className="bg-white shadow-lg rounded-lg p-6 sm:p-8 w-full max-w-md flex flex-col items-center">
        
        {/* Logo */}
        <Image
          src="/logo.png"
          alt="Logo BuyScore"
          width={100}
          height={100}
          className="mb-4"
        />

        {/* Título */}
        <h1 className="text-3xl font-bold mb-2 text-black">BuyScore</h1>
        <h2 className="text-lg mb-6 text-gray-700 text-center">
          Faça seu login{" "}
          <span className="font-semibold text-[#016DA7]">
            como {tipo === "lojista" ? "lojista" : "cliente"}
          </span>
        </h2>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="space-y-4 w-full">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              E-mail
            </label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 p-3 text-black bg-gray-100 focus:bg-white focus:ring-[#016DA7] focus:border-[#016DA7]"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Senha
            </label>
            <input
              type="password"
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 p-3 text-black bg-gray-100 focus:bg-white focus:ring-[#016DA7] focus:border-[#016DA7]"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-[#016DA7] text-white font-semibold rounded-md hover:bg-blue-700 transition"
          >
            Entrar
          </button>
        </form>

        {/* Link para cadastro */}
        <p className="text-sm text-gray-500 text-center mt-4">
          Não tem conta?{" "}
          <Link
            href={`/cadastro?type=${tipo === "lojista" ? "lojista" : "cliente"}`}
            className="text-[#016DA7] hover:underline"
          >
            Cadastre-se
          </Link>
        </p>

      </div>
    </div>
  );
}
