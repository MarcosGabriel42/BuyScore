'use client';

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { auth, API_ENDPOINTS } from "@/utils/auth";

interface LoginFormProps {
  tipo: "cliente" | "lojista";
}

export default function LoginForm({ tipo }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(API_ENDPOINTS.LOGIN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          senha: password
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erro ao fazer login");
      }

      const data = await response.json();
      
      // Salvar token - esperando que o backend retorne apenas { "token": "jwt_token_here" }
      if (data.token) {
        auth.saveToken(data.token);
      } else if (typeof data === 'string') {
        // Caso o backend retorne apenas o token como string
        auth.saveToken(data);
      }
      
      // Redirecionar baseado no tipo de usuário
      if (tipo === "lojista") {
        router.push("/dashboard-lojista");
      } else {
        router.push("/dashboard-cliente");
      }

      console.log("Login realizado com sucesso:", data);
      
    } catch (err: any) {
      setError(err.message || "Erro interno do servidor");
      console.error("Erro no login:", err);
    } finally {
      setIsLoading(false);
    }
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
          {/* Exibir erro se houver */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

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
              disabled={isLoading}
              className="mt-1 block w-full rounded-md border border-gray-300 p-3 text-black bg-gray-100 focus:bg-white focus:ring-[#016DA7] focus:border-[#016DA7] disabled:opacity-50"
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
              disabled={isLoading}
              className="mt-1 block w-full rounded-md border border-gray-300 p-3 text-black bg-gray-100 focus:bg-white focus:ring-[#016DA7] focus:border-[#016DA7] disabled:opacity-50"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 bg-[#016DA7] text-white font-semibold rounded-md hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Entrando..." : "Entrar"}
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
