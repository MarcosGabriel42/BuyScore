'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import BottomNav from "@/components/BottomNav";
import { auth } from "@/utils/auth";
import Base64Image from "@/components/Base64Image";

interface ClienteData {
  nome: string;
  email: string;
  senha: string;
  perfilUsuario: number;
  fotoUsuario?: string;
  cep: string;
  logradouro: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  numero: number;
  uf: string;
}

export default function EditarPerfilPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    nome: "",
    email: "",
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

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchCliente = async () => {
      try {
        setIsLoading(true);
        setError("");

        const token = auth.getToken();
        if (!token) {
          router.push("/login");
          return;
        }

        const res = await fetch("http://localhost:8081/cliente", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error(`Erro ao carregar dados: ${res.status}`);
        }

        const data: ClienteData = await res.json();
        setForm({
          nome: data.nome || "",
          email: data.email || "",
          cep: data.cep || "",
          numero: String(data.numero || ""),
          logradouro: data.logradouro || "",
          complemento: data.complemento || "",
          bairro: data.bairro || "",
          cidade: data.cidade || "",
          uf: data.uf || "",
          senha: "",
          confirmarSenha: "",
          fotoUsuario: data.fotoUsuario || "",
        });
      } catch (err: any) {
        setError(err?.message || "Erro ao carregar perfil");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCliente();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (form.senha && form.senha !== form.confirmarSenha) {
      setError("As senhas não coincidem.");
      return;
    }

    try {
      setIsSaving(true);

      const token = auth.getToken();
      if (!token) {
        router.push("/login");
        return;
      }

      const payload: any = {
        nome: form.nome,
        email: form.email,
        cep: form.cep,
        logradouro: form.logradouro,
        complemento: form.complemento || undefined,
        bairro: form.bairro,
        cidade: form.cidade,
        numero: parseInt(form.numero) || 0,
        uf: form.uf,
        fotoUsuario: form.fotoUsuario || undefined,
      };

      // Apenas inclui senha se foi alterada
      if (form.senha) {
        payload.senha = form.senha;
      }

      const res = await fetch("http://localhost:8081/cliente", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error(`Erro ao salvar: ${res.status}`);
      }

      setSuccess("Perfil atualizado com sucesso!");
      setTimeout(() => router.push("/perfil"), 1500);
    } catch (err: any) {
      setError(err?.message || "Erro ao salvar alterações");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white p-6 max-w-md mx-auto flex items-center justify-center">
        <div className="text-lg text-gray-600">Carregando perfil...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-6 max-w-md mx-auto pb-24">
      <h1 className="text-2xl font-bold text-center mb-6 text-black">Editar Perfil</h1>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      {success && <p className="text-green-600 text-center mb-4">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Foto */}
        <div className="flex flex-col items-center">
          {form.fotoUsuario ? (
            <Base64Image
              src={form.fotoUsuario}
              alt="Foto de perfil"
              className="rounded-full border object-cover"
              width={100}
              height={100}
            />
          ) : (
            <div className="w-[100px] h-[100px] rounded-full border bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500 text-xs">Sem foto</span>
            </div>
          )}
          <input
            type="text"
            id="fotoUsuario"
            value={form.fotoUsuario}
            onChange={handleChange}
            placeholder="Base64 ou URL da foto"
            className="border p-3 rounded w-full text-black mt-3"
          />
        </div>

        <input type="text" id="nome" value={form.nome} onChange={handleChange} className="border p-3 rounded w-full text-black" placeholder="Nome" required />
        <input type="email" id="email" value={form.email} onChange={handleChange} className="border p-3 rounded w-full text-black" placeholder="E-mail" required />

        <input type="text" id="cep" value={form.cep} onChange={handleChange} className="border p-3 rounded w-full text-black" placeholder="CEP" required />
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
          disabled={isSaving}
          className="w-full py-3 bg-[#016DA7] text-white font-semibold rounded-md hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSaving ? "Salvando..." : "Salvar alterações"}
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
