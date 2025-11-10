'use client';

import { useState } from 'react';
import { Home, Star, User } from 'lucide-react';
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
    <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-[0_-2px_10px_rgba(0,0,0,0.05)] z-40">
      <ul className="flex justify-around items-center py-3 max-w-md mx-auto select-none">
        {tabs.map((tab) => (
          <li key={tab.id}>
            <Link
              href={tab.href}
              onClick={() => setActiveTab(tab.id)}
              className={clsx(
                'flex flex-col items-center gap-1 text-sm transition-all duration-300',
                activeTab === tab.id
                  ? 'text-[#016DA7] scale-105'
                  : 'text-gray-500 hover:text-[#016DA7]'
              )}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
