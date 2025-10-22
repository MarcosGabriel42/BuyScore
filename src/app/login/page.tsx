'use client';

import { useState } from "react";
import Image from "next/image";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login:", { email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6">
      <div className="bg-white shadow-lg rounded-lg p-6 sm:p-8 w-full max-w-md flex flex-col items-center">
        
        {/* Logo */}
        <Image
          src="/logo.png" // Coloque sua logo na pasta public/logo.png
          alt="Logo"
          width={120}
          height={120}
          className="mb-4"
        />

        {/* Nome do site */}
        <h1 className="text-3xl font-bold mb-6 text-black" style={{ fontFamily: "'Ag Title Hero', Poppins, sans-serif" }}>
          BuyScore
        </h1>
        <h2 className="text-xl mb-6 text-black" >
          Faça seu login
        </h2>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="space-y-4 w-full">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-black">
              E-mail
            </label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-black focus:ring-[#016DA7] focus:border-[#016DA7] sm:text-sm p-2 sm:p-3"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-black">
              Senha
            </label>
            <input
              type="password"
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-black focus:ring-[#016DA7] focus:border-[#016DA7] sm:text-sm p-2 sm:p-3"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 sm:py-3 px-4 bg-[#016DA7] text-white font-semibold rounded-md hover:bg-blue-700 transition"
          >
            Entrar
          </button>
        </form>

        <p className="text-sm sm:text-base text-gray-500 text-center mt-4">
          Não tem conta? <a href="/cadastro" className="text-[#016DA7] hover:underline">Cadastre-se</a>
        </p>
      </div>
    </div>
  );
}
