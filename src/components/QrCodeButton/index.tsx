'use client';

import { QrCode } from 'lucide-react';
import { useState } from 'react';
import QrPopup from '../QrCodePopup';

export default function QrCodeButton() {
  const [open, setOpen] = useState(false);
  const [randomCode, setRandomCode] = useState('');

  const generateCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    return Array.from({ length: 5 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  };

  const handleClick = () => {
    setRandomCode(generateCode());
    setOpen(true);
  };

  return (
    <>
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
        aria-label="Abrir popup QR"
      >
        <QrCode size={28} />
      </button>

      {open && <QrPopup code={randomCode} onClose={() => setOpen(false)} />}
    </>
  );
}
