'use client';

import { useState } from "react";
import { auth } from '@/utils/auth';

export default function QrPopup({ onClose }: { onClose: () => void }) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    if (code.length !== 6) {
      setError("O código deve ter exatamente 6 caracteres.");
      return;
    }

    try {
      setIsLoading(true);
      setError("");

      const token = auth.getToken();
      if (!token) {
        setError("Token de autenticação não encontrado");
        return;
      }

      const url = `http://localhost:8081/ponto/codigo/${encodeURIComponent(code)}`;
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        throw new Error(`Erro ao validar código: ${res.status}`);
      }

      const data = await res.json();
      alert("Código validado com sucesso!");
      console.log("Resposta da API:", data);
      onClose();
    } catch (err: any) {
      setError(err?.message || "Erro ao validar código");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // força letras maiúsculas
    const value = e.target.value.toUpperCase();

    // aceita apenas A-Z e 0-9
    const sanitized = value.replace(/[^A-Z0-9]/g, "");

    // limita a 6 caracteres
    if (sanitized.length <= 6) {
      setCode(sanitized);
      setError("");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-72 text-center">
        <h2 className="text-xl font-semibold mb-4">Digite seu código</h2>

        <input
          type="text"
          value={code}
          onChange={handleInputChange}
          maxLength={6}
          placeholder="ABC123"
          className="w-full px-3 py-2 border rounded-lg text-center text-lg tracking-widest mb-3 uppercase text-black"
        />

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <button
          onClick={handleConfirm}
          disabled={isLoading}
          className="bg-[#016DA7] text-white w-full py-2 rounded-lg hover:bg-[#015a89] mb-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Validando..." : "Confirmar"}
        </button>

        <button
          onClick={onClose}
          className="text-gray-600 w-full py-2 hover:text-black"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}
