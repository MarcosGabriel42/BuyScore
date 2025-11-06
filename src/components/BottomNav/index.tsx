'use client';

import { useState } from 'react';
import { Home, Star, User } from 'lucide-react';
import clsx from 'clsx';
import Link from 'next/link';

export default function BottomNav() {
  const [activeTab, setActiveTab] = useState('home');

  const tabs = [
    { id: 'home', label: 'Página Inicial', icon: <Home size={20} />, href: '/home' },
    { id: 'favoritos', label: 'Favoritos', icon: <Star size={20} />, href: '/favoritos' },
    { id: 'profile', label: 'Perfil', icon: <User size={20} />, href: '/profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-[0_-2px_8px_rgba(0,0,0,0.05)] z-50">
      <ul className="flex justify-around sm:justify-center sm:gap-8 py-3 select-none">
        {tabs.map((tab) => (
          <li key={tab.id}>
            <Link
              href={tab.href}
              onClick={() => setActiveTab(tab.id)}
              className={clsx(
                'flex flex-col items-center text-sm font-medium px-4 py-2 rounded-xl transition-all duration-300',
                activeTab === tab.id
                  ? 'text-[#016DA7] scale-105'
                  : 'text-gray-500 hover:text-[#016DA7] hover:bg-gray-100'
              )}
            >
              <span className="mb-1">{tab.icon}</span>
              {tab.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
