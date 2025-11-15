'use client';

export default function QrPopup({ code, onClose }: { code: string; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-64 text-center">
        <h2 className="text-xl font-semibold mb-4">Seu Código</h2>
        <p className="text-3xl font-bold tracking-widest mb-4">{code}</p>

        <button
          onClick={onClose}
          className="bg-[#016DA7] text-white w-full py-2 rounded-lg hover:bg-[#015a89]"
        >
          Fechar
        </button>
      </div>
    </div>
  );
}
