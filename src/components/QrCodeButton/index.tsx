'use client';

import { QrCode } from 'lucide-react';
import { useState } from 'react';
import QrPopup from '../QrCodePopup';

export default function QrCodeButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
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

      {open && <QrPopup onClose={() => setOpen(false)} />}
    </>
  );
}
