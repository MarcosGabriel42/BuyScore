'use client';

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { API_ENDPOINTS, auth } from "@/utils/auth";

export default function ClienteForm() {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [form, setForm] = useState({
    nome: "",
    cpf: "",
    email: "",
    celular: "",
    dataNascimento: "",
    cep: "",
    numero: "",
    logradouro: "",
    complemento: "",
    bairro: "",
    cidade: "",
    uf: "",
    senha: "",
    confirmarSenha: "",
    fotoUsuario: ""
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nome || !form.cpf || !form.email || !form.celular || !form.dataNascimento) {
      setError("Preencha todos os campos antes de continuar.");
      return;
    }
    setError("");
    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação dos campos obrigatórios
    if (!form.cep || !form.numero || !form.logradouro || !form.bairro || !form.cidade || !form.uf || !form.senha || !form.confirmarSenha) {
      setError("Preencha todos os campos obrigatórios.");
      return;
    }
    
    if (form.senha !== form.confirmarSenha) {
      setError("As senhas não coincidem.");
      return;
    }
    
    setError("");
    setIsLoading(true);

    try {
      // Preparar dados para a API
      const dadosCadastro = {
        nome: form.nome,
        email: form.email,
        senha: form.senha,
        fotoUsuario: form.fotoUsuario || "https://exemplo.com/foto-default.jpg", // URL padrão se não informada
        cep: form.cep,
        logradouro: form.logradouro,
        complemento: form.complemento,
        bairro: form.bairro,
        cidade: form.cidade,
        numero: parseInt(form.numero),
        uf: form.uf
      };

      const response = await fetch(API_ENDPOINTS.CADASTRO_CLIENTE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dadosCadastro),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erro ao realizar cadastro");
      }

      const data = await response.json();
      console.log("Cadastro realizado com sucesso:", data);
      
      // Salvar token retornado pela API de cadastro
      if (data.token) {
        auth.saveToken(data.token);
      } else if (typeof data === 'string') {
        // Caso o backend retorne apenas o token como string
        auth.saveToken(data);
      }
      
      // Redirecionar diretamente para home (usuário já está logado)
      router.push("/home");
      
    } catch (err: any) {
      setError(err.message || "Erro interno do servidor");
      console.error("Erro no cadastro:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 sm:p-8 w-full max-w-md flex flex-col items-center">
      <Image src="/logo.png" alt="Logo" width={100} height={100} className="mb-4" />
      <h1 className="text-3xl font-bold mb-2 text-black">BuyScore</h1>
      <h2 className="text-lg mb-6 text-black">
        {step === 1 ? "Informações pessoais" : "Endereço e senha"}
      </h2>

      {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

      <form onSubmit={step === 1 ? handleNextStep : handleSubmit} className="space-y-4 w-full">
        {step === 1 ? (
          <>
            <input type="text" id="nome" placeholder="Nome completo" value={form.nome} onChange={handleChange} className="border p-3 rounded w-full text-black" />
            <input type="text" id="cpf" placeholder="CPF" value={form.cpf} onChange={handleChange} className="border p-3 rounded w-full text-black" />
            <input type="email" id="email" placeholder="E-mail" value={form.email} onChange={handleChange} className="border p-3 rounded w-full text-black" />
            <input type="tel" id="celular" placeholder="Celular" value={form.celular} onChange={handleChange} className="border p-3 rounded w-full text-black" />
            <input type="date" id="dataNascimento" value={form.dataNascimento} onChange={handleChange} className="border p-3 rounded w-full text-black" />
            <button type="submit" className="w-full py-3 bg-[#016DA7] text-white font-semibold rounded-md hover:bg-blue-700 transition">
              Próximo
            </button>
          </>
        ) : (
          <>
            <input type="text" id="cep" placeholder="CEP" value={form.cep} onChange={handleChange} className="border p-3 rounded w-full text-black" />
            <input type="text" id="logradouro" placeholder="Logradouro" value={form.logradouro} onChange={handleChange} className="border p-3 rounded w-full text-black" />
            <input type="text" id="numero" placeholder="Número" value={form.numero} onChange={handleChange} className="border p-3 rounded w-full text-black" />
            <input type="text" id="complemento" placeholder="Complemento (opcional)" value={form.complemento} onChange={handleChange} className="border p-3 rounded w-full text-black" />
            <input type="text" id="bairro" placeholder="Bairro" value={form.bairro} onChange={handleChange} className="border p-3 rounded w-full text-black" />
            <input type="text" id="cidade" placeholder="Cidade" value={form.cidade} onChange={handleChange} className="border p-3 rounded w-full text-black" />
            <input type="text" id="uf" placeholder="UF (ex: SP)" value={form.uf} onChange={handleChange} className="border p-3 rounded w-full text-black" maxLength={2} />
            <input type="url" id="fotoUsuario" placeholder="URL da foto (opcional)" value={form.fotoUsuario} onChange={handleChange} className="border p-3 rounded w-full text-black" />
            <input type="password" id="senha" placeholder="Senha" value={form.senha} onChange={handleChange} className="border p-3 rounded w-full text-black" />
            <input type="password" id="confirmarSenha" placeholder="Confirmar senha" value={form.confirmarSenha} onChange={handleChange} className="border p-3 rounded w-full text-black" />
            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full py-3 bg-[#016DA7] text-white font-semibold rounded-md hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Cadastrando..." : "Finalizar cadastro"}
            </button>
            <button type="button" onClick={() => setStep(1)} disabled={isLoading} className="w-full py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition disabled:opacity-50">
              Voltar
            </button>
          </>
        )}
      </form>

      <p className="text-sm text-gray-500 text-center mt-4">
        Já tem conta?{" "}
        <Link href="/login?type=cliente" className="text-[#016DA7] hover:underline">
          Faça login
        </Link>
      </p>
    </div>
  );
}
