'use client';

import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer"; 
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  // Ocultar Header e Footer em login e cadastro
  const hideLayout = ["/login", "/cadastro"].includes(pathname);

  return (
    <html lang="pt-BR">
      <body className="antialiased bg-gray-50 text-gray-900">
        {/* Renderiza Header e Footer apenas se NÃO estiver nas páginas de login ou cadastro */}
        {!hideLayout && <Header />}

        <main>{children}</main>

        {!hideLayout && <Footer />}
      </body>
    </html>
  );
}
