'use client';

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import BottomNav from "@/components/BottomNav";

export default function EditarPerfilPage() {
  const router = useRouter();

  // Dados simulados do usuário logado
  const [form, setForm] = useState({
    nome: "Marcos Gabriel",
    cpf: "123.456.789-00",
    email: "marcos@email.com",
    celular: "47 99999-9999",
    dataNascimento: "2000-01-01",
    cep: "89000-000",
    numero: "123",
    logradouro: "Rua Exemplo",
    complemento: "",
    bairro: "Centro",
    cidade: "Blumenau",
    uf: "SC",
    senha: "",
    confirmarSenha: "",
    fotoUsuario: "/profile-placeholder.png"
  });

  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (form.senha && form.senha !== form.confirmarSenha) {
      setError("As senhas não coincidem.");
      return;
    }

    console.log("Dados editados:", form);

    // Aqui você faz a requisição PUT / PATCH para salvar no backend

    router.push("/perfil");
  };

  return (
    <div className="min-h-screen bg-white p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-center mb-6 text-black">Editar Perfil</h1>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Foto */}
        <div className="flex flex-col items-center">
          <Image
            src={form.fotoUsuario}
            alt="Foto de perfil"
            width={100}
            height={100}
            className="rounded-full border"
          />
          <input
            type="url"
            id="fotoUsuario"
            value={form.fotoUsuario}
            onChange={handleChange}
            placeholder="URL da nova foto"
            className="border p-3 rounded w-full text-black mt-3"
          />
        </div>

        <input type="text" id="nome" value={form.nome} onChange={handleChange} className="border p-3 rounded w-full text-black" placeholder="Nome" />
        <input type="text" id="cpf" value={form.cpf} onChange={handleChange} className="border p-3 rounded w-full text-black" placeholder="CPF" />
        <input type="email" id="email" value={form.email} onChange={handleChange} className="border p-3 rounded w-full text-black" placeholder="E-mail" />
        <input type="tel" id="celular" value={form.celular} onChange={handleChange} className="border p-3 rounded w-full text-black" placeholder="Celular" />
        <input type="date" id="dataNascimento" value={form.dataNascimento} onChange={handleChange} className="border p-3 rounded w-full text-black" />

        <input type="text" id="cep" value={form.cep} onChange={handleChange} className="border p-3 rounded w-full text-black" placeholder="CEP" />
        <input type="text" id="logradouro" value={form.logradouro} onChange={handleChange} className="border p-3 rounded w-full text-black" placeholder="Logradouro" />
        <input type="text" id="numero" value={form.numero} onChange={handleChange} className="border p-3 rounded w-full text-black" placeholder="Número" />
        <input type="text" id="complemento" value={form.complemento} onChange={handleChange} className="border p-3 rounded w-full text-black" placeholder="Complemento (opcional)" />
        <input type="text" id="bairro" value={form.bairro} onChange={handleChange} className="border p-3 rounded w-full text-black" placeholder="Bairro" />
        <input type="text" id="cidade" value={form.cidade} onChange={handleChange} className="border p-3 rounded w-full text-black" placeholder="Cidade" />
        <input type="text" id="uf" value={form.uf} maxLength={2} onChange={handleChange} className="border p-3 rounded w-full text-black" placeholder="UF" />

        <input type="password" id="senha" value={form.senha} onChange={handleChange} className="border p-3 rounded w-full text-black" placeholder="Nova senha (opcional)" />
        <input type="password" id="confirmarSenha" value={form.confirmarSenha} onChange={handleChange} className="border p-3 rounded w-full text-black" placeholder="Confirmar senha" />

        <button 
          type="submit"
          className="w-full py-3 bg-[#016DA7] text-white font-semibold rounded-md hover:bg-blue-700 transition"
        >
          Salvar alterações
        </button>

        <button 
          type="button"
          onClick={() => router.push("/perfil")}
          className="w-full py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
        >
          Cancelar
        </button>

      </form>

        <BottomNav />
    </div>
  );
}
