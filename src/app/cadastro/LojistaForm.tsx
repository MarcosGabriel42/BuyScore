'use client';

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function LojistaForm() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    razaoSocial: "",
    nicho: "",
    email: "",
    celular: "",
    cnpj: "",
    cep: "",
    numero: "",
    logradouro: "",
    cidade: "",
    estado: "",
    senha: "",
    confirmarSenha: "",
    logo: null as File | null,
    franqueado: false,
    cnpjMatriz: "",
    codigoVerificacao: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, type, checked, files, value } = e.target as HTMLInputElement;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : files ? files[0] : value,
    }));
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleBack = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Cadastro lojista:", form);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 sm:p-8 w-full max-w-lg flex flex-col items-center">
      <Image src="/logo.png" alt="Logo" width={100} height={100} className="mb-4" />
      <h1 className="text-3xl font-bold mb-2 text-black">BuyScore</h1>
      <p className="text-gray-600 mb-6 text-center">Cadastro de Lojista</p>

      <form onSubmit={step === 1 ? handleNext : handleSubmit} className="space-y-4 w-full">
        {step === 1 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                name="razaoSocial"
                placeholder="Razão Social"
                onChange={handleChange}
                className="border border-gray-300 p-3 rounded w-full text-black bg-gray-100 focus:bg-white"
                required
              />

              <select
                name="nicho"
                onChange={handleChange}
                className="border border-gray-300 p-3 rounded w-full text-black bg-gray-100 focus:bg-white"
                required
              >
                <option value="">Selecione o Nicho</option>
                <option value="Restaurantes">Restaurantes</option>
                <option value="Farmacias">Farmácias</option>
                <option value="Mercados">Mercados</option>
                <option value="Outros serviços">Outros serviços</option>
              </select>
            </div>

            <input
              type="email"
              name="email"
              placeholder="E-mail"
              onChange={handleChange}
              className="border border-gray-300 p-3 rounded w-full text-black bg-gray-100 focus:bg-white"
              required
            />

            <input
              type="tel"
              name="celular"
              placeholder="Celular"
              onChange={handleChange}
              className="border border-gray-300 p-3 rounded w-full text-black bg-gray-100 focus:bg-white"
              required
            />

            <button
              type="submit"
              className="w-full py-3 bg-[#016DA7] text-white font-semibold rounded-md hover:bg-blue-700 transition"
            >
              Próximo
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <input
              type="text"
              name="cnpj"
              placeholder="CNPJ"
              onChange={handleChange}
              className="border border-gray-300 p-3 rounded w-full text-black bg-gray-100 focus:bg-white"
              required
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                name="cep"
                placeholder="CEP"
                onChange={handleChange}
                className="border border-gray-300 p-3 rounded w-full text-black bg-gray-100 focus:bg-white"
                required
              />
              <input
                type="text"
                name="numero"
                placeholder="Número"
                onChange={handleChange}
                className="border border-gray-300 p-3 rounded w-full text-black bg-gray-100 focus:bg-white"
                required
              />
            </div>

            <input
              type="text"
              name="logradouro"
              placeholder="Logradouro"
              onChange={handleChange}
              className="border border-gray-300 p-3 rounded w-full text-black bg-gray-100 focus:bg-white"
              required
            />
            <input
              type="text"
              name="cidade"
              placeholder="Cidade"
              onChange={handleChange}
              className="border border-gray-300 p-3 rounded w-full text-black bg-gray-100 focus:bg-white"
              required
            />
            <input
              type="text"
              name="estado"
              placeholder="Estado"
              onChange={handleChange}
              className="border border-gray-300 p-3 rounded w-full text-black bg-gray-100 focus:bg-white"
              required
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="password"
                name="senha"
                placeholder="Senha"
                onChange={handleChange}
                className="border border-gray-300 p-3 rounded w-full text-black bg-gray-100 focus:bg-white"
                required
              />
              <input
                type="password"
                name="confirmarSenha"
                placeholder="Confirmar Senha"
                onChange={handleChange}
                className="border border-gray-300 p-3 rounded w-full text-black bg-gray-100 focus:bg-white"
                required
              />
            </div>

            <label className="block text-gray-700 font-medium">
              Inserir logo:
              <input
                type="file"
                name="logo"
                accept="image/*"
                onChange={handleChange}
                className="mt-2 block w-full text-sm text-black"
              />
            </label>

            <label className="flex items-center gap-2 mt-4">
              <input type="checkbox" name="franqueado" checked={form.franqueado} onChange={handleChange} />
              <span className="text-gray-700">Sou franqueado</span>
            </label>

            {form.franqueado && (
              <div className="mt-4 space-y-3">
                <input
                  type="text"
                  name="cnpjMatriz"
                  placeholder="CNPJ da Matriz"
                  onChange={handleChange}
                  className="border border-gray-300 p-3 rounded w-full text-black bg-gray-100 focus:bg-white"
                />
                <div className="flex gap-2">
                  <input
                    type="text"
                    name="codigoVerificacao"
                    placeholder="Código de Verificação"
                    onChange={handleChange}
                    className="border border-gray-300 p-3 rounded flex-1 text-black bg-gray-100 focus:bg-white"
                  />
                  <button
                    type="button"
                    className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition"
                  >
                    Enviar Código
                  </button>
                </div>
              </div>
            )}

            <div className="flex gap-3 mt-4">
              <button
                type="button"
                onClick={handleBack}
                className="w-1/2 py-3 bg-gray-300 text-black font-semibold rounded-md hover:bg-gray-400 transition"
              >
                Voltar
              </button>

              <button
                type="submit"
                className="w-1/2 py-3 bg-[#016DA7] text-white font-semibold rounded-md hover:bg-blue-700 transition"
              >
                Confirmar Cadastro
              </button>
            </div>
          </>
        )}
      </form>

      <p className="text-sm text-gray-500 text-center mt-4">
        Já possui uma conta?{" "}
        <Link href="/login?tipo=lojista" className="text-[#016DA7] hover:underline">
          Realize seu login aqui!
        </Link>
      </p>
    </div>
  );
}
