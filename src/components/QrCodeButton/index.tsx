'use client';

import { QrCode } from 'lucide-react';

export default function QrCodeButton() {
  const handleClick = () => {
    alert('Abrindo câmera para escanear QR Code...');
  };

  return (
    <button
      onClick={handleClick}
      className="
        fixed
        bottom-24
        right-6
        bg-[#016DA7]
        text-white
        p-4
        rounded-full
        shadow-lg
        hover:scale-110
        active:scale-95
        transition-transform
        duration-300
        z-50
        animate-pulse-soft
      "
      aria-label="Abrir QR Code Scanner"
    >
      <QrCode size={28} />
    </button>
  );
}
