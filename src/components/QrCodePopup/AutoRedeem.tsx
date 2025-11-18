'use client';

type AutoRedeemProps = {
  codigo: string | null;
  error?: string;
  onClose: () => void;
};

export default function AutoRedeemPopup({ codigo, error, onClose }: AutoRedeemProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-80 text-center">
        <h2 className="text-xl font-semibold mb-2">Resgatar Pontos</h2>
        
        {error ? (
          <div className="text-red-600 font-medium mb-4">Sem saldo</div>
        ) : (
          <>
            <p className="text-gray-600 text-sm mb-2">Seu código de resgate:</p>
            <div className="text-2xl font-bold text-[#016DA7] mb-4 tracking-wider">
              {codigo}
            </div>
          </>
        )}

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
