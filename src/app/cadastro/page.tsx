'use client';

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function CadastroPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    nome: "",
    cpf: "",
    email: "",
    celular: "",
    dataNascimento: "",
    cep: "",
    numero: "",
    logradouro: "",
    estado: "",
    senha: "",
    confirmarSenha: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();

    // Validação da primeira etapa
    if (!form.nome || !form.cpf || !form.email || !form.celular || !form.dataNascimento) {
      setError("Preencha todos os campos antes de continuar.");
      return;
    }

    setError("");
    setStep(2);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validação da segunda etapa
    if (!form.cep || !form.numero || !form.logradouro || !form.estado || !form.senha || !form.confirmarSenha) {
      setError("Preencha todos os campos obrigatórios.");
      return;
    }

    if (form.senha !== form.confirmarSenha) {
      setError("As senhas não coincidem.");
      return;
    }

    setError("");
    console.log("Cadastro enviado:", form);
    alert("Cadastro realizado com sucesso!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6">
      <div className="bg-white shadow-lg rounded-lg p-6 sm:p-8 w-full max-w-md flex flex-col items-center">
        {/* Logo */}
        <Image
          src="/logo.png"
          alt="Logo"
          width={100}
          height={100}
          className="mb-4"
        />

        {/* Nome do site */}
        <h1
          className="text-3xl font-bold mb-2 text-black"
          style={{ fontFamily: "'Ag Title Hero', Poppins, sans-serif" }}
        >
          BuyScore
        </h1>
        <h2 className="text-lg mb-6 text-black">
          {step === 1 ? "Informações pessoais" : "Endereço e senha"}
        </h2>

        {/* Mensagem de erro */}
        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        {/* Formulário */}
        <form
          onSubmit={step === 1 ? handleNextStep : handleSubmit}
          className="space-y-4 w-full"
        >
          {step === 1 && (
            <>
              <div>
                <label htmlFor="nome" className="block text-sm font-medium text-gray-700">
                  Nome completo
                </label>
                <input
                  type="text"
                  id="nome"
                  value={form.nome}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-black focus:ring-[#016DA7] focus:border-[#016DA7] sm:text-sm p-3"
                  required
                />
              </div>

              <div>
                <label htmlFor="cpf" className="block text-sm font-medium text-gray-700">
                  CPF
                </label>
                <input
                  type="text"
                  id="cpf"
                  value={form.cpf}
                  onChange={handleChange}
                  placeholder="000.000.000-00"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-black focus:ring-[#016DA7] focus:border-[#016DA7] sm:text-sm p-3"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  E-mail
                </label>
                <input
                  type="email"
                  id="email"
                  value={form.email}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-black focus:ring-[#016DA7] focus:border-[#016DA7] sm:text-sm p-3"
                  required
                />
              </div>

              <div>
                <label htmlFor="celular" className="block text-sm font-medium text-gray-700">
                  Celular
                </label>
                <input
                  type="tel"
                  id="celular"
                  value={form.celular}
                  onChange={handleChange}
                  placeholder="(00) 00000-0000"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-black focus:ring-[#016DA7] focus:border-[#016DA7] sm:text-sm p-3"
                  required
                />
              </div>

              <div>
                <label htmlFor="dataNascimento" className="block text-sm font-medium text-gray-700">
                  Data de nascimento
                </label>
                <input
                  type="date"
                  id="dataNascimento"
                  value={form.dataNascimento}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-black focus:ring-[#016DA7] focus:border-[#016DA7] sm:text-sm p-3"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-[#016DA7] text-white font-semibold rounded-md hover:bg-blue-700 transition"
              >
                Próximo
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <div>
                <label htmlFor="cep" className="block text-sm font-medium text-gray-700">
                  CEP
                </label>
                <input
                  type="text"
                  id="cep"
                  value={form.cep}
                  onChange={handleChange}
                  placeholder="00000-000"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-black focus:ring-[#016DA7] focus:border-[#016DA7] sm:text-sm p-3"
                  required
                />
              </div>

              <div>
                <label htmlFor="numero" className="block text-sm font-medium text-gray-700">
                  Número
                </label>
                <input
                  type="text"
                  id="numero"
                  value={form.numero}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-black focus:ring-[#016DA7] focus:border-[#016DA7] sm:text-sm p-3"
                  required
                />
              </div>

              <div>
                <label htmlFor="logradouro" className="block text-sm font-medium text-gray-700">
                  Logradouro
                </label>
                <input
                  type="text"
                  id="logradouro"
                  value={form.logradouro}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-black focus:ring-[#016DA7] focus:border-[#016DA7] sm:text-sm p-3"
                  required
                />
              </div>

              <div>
                <label htmlFor="estado" className="block text-sm font-medium text-gray-700">
                  Estado
                </label>
                <input
                  type="text"
                  id="estado"
                  value={form.estado}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-black focus:ring-[#016DA7] focus:border-[#016DA7] sm:text-sm p-3"
                  required
                />
              </div>

              <div>
                <label htmlFor="senha" className="block text-sm font-medium text-gray-700">
                  Senha
                </label>
                <input
                  type="password"
                  id="senha"
                  value={form.senha}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-black focus:ring-[#016DA7] focus:border-[#016DA7] sm:text-sm p-3"
                  required
                />
              </div>

              <div>
                <label htmlFor="confirmarSenha" className="block text-sm font-medium text-gray-700">
                  Confirmar senha
                </label>
                <input
                  type="password"
                  id="confirmarSenha"
                  value={form.confirmarSenha}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-black focus:ring-[#016DA7] focus:border-[#016DA7] sm:text-sm p-3"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-[#016DA7] text-white font-semibold rounded-md hover:bg-blue-700 transition"
              >
                Finalizar cadastro
              </button>

              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-full py-2 px-4 mt-2 bg-gray-200 text-gray-700 font-medium rounded-md hover:bg-gray-300 transition"
              >
                Voltar
              </button>
            </>
          )}
        </form>

        <p className="text-sm sm:text-base text-gray-500 text-center mt-4">
          Já tem conta?{" "}
          <Link href="/login" className="text-[#016DA7] hover:underline">
            Faça login
          </Link>
        </p>
      </div>
    </div>
  );
}
