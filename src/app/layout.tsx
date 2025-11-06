'use client';

import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { usePathname } from 'next/navigation';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Rotas que não terão Header e Footer
  const hideLayout = pathname === '/escolher-login' || pathname.startsWith('/login');

  return (
    <html lang="pt-br">
      <body className="min-h-screen bg-gray-50 text-black">
        {!hideLayout && <Header />}
        {children}
        {!hideLayout && <Footer />}
      </body>
    </html>
  );
}
