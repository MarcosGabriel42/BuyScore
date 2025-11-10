'use client';

import { useState } from 'react';
import { Home, Star, User, QrCode } from 'lucide-react';
import Link from 'next/link';
import clsx from 'clsx';

export default function BottomNav() {
  const [activeTab, setActiveTab] = useState('home');

  const tabs = [
    { id: 'home', label: 'Início', icon: <Home size={22} />, href: '/home' },
    { id: 'favoritos', label: 'Favoritos', icon: <Star size={22} />, href: '/favoritos' },
    { id: 'perfil', label: 'Perfil', icon: <User size={22} />, href: '/perfil' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-[0_-2px_10px_rgba(0,0,0,0.05)] z-50">
      <ul className="flex justify-around items-center py-3 max-w-md mx-auto select-none">
        
        {/* Home */}
        <li>
          <Link
            href={tabs[0].href}
            onClick={() => setActiveTab(tabs[0].id)}
            className={clsx(
              'flex flex-col items-center gap-1 text-sm transition-all duration-300',
              activeTab === tabs[0].id
                ? 'text-[#016DA7] scale-105'
                : 'text-gray-500 hover:text-[#016DA7]'
            )}
          >
            {tabs[0].icon}
            <span>{tabs[0].label}</span>
          </Link>
        </li>

        {/* QR Code Central */}
        <li>
          <button
            onClick={() => alert('Abrindo câmera para escanear QR Code...')}
            className="flex flex-col items-center justify-center bg-[#016DA7] text-white p-4 rounded-full shadow-md border-4 border-white hover:scale-110 active:scale-95 transition-transform duration-300"
          >
            <QrCode size={26} />
          </button>
        </li>

        {/* Favoritos */}
        <li>
          <Link
            href={tabs[1].href}
            onClick={() => setActiveTab(tabs[1].id)}
            className={clsx(
              'flex flex-col items-center gap-1 text-sm transition-all duration-300',
              activeTab === tabs[1].id
                ? 'text-[#016DA7] scale-105'
                : 'text-gray-500 hover:text-[#016DA7]'
            )}
          >
            {tabs[1].icon}
            <span>{tabs[1].label}</span>
          </Link>
        </li>

        {/* Perfil */}
        <li>
          <Link
            href={tabs[2].href}
            onClick={() => setActiveTab(tabs[2].id)}
            className={clsx(
              'flex flex-col items-center gap-1 text-sm transition-all duration-300',
              activeTab === tabs[2].id
                ? 'text-[#016DA7] scale-105'
                : 'text-gray-500 hover:text-[#016DA7]'
            )}
          >
            {tabs[2].icon}
            <span>{tabs[2].label}</span>
          </Link>
        </li>

      </ul>
    </nav>
  );
}
