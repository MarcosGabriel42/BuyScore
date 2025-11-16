'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/utils/auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredUserType?: 'cliente' | 'lojista';
}

export default function ProtectedRoute({ children, requiredUserType }: ProtectedRouteProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const isAuthenticated = auth.isAuthenticated();
      
      if (!isAuthenticated) {
        router.push('/login');
        return;
      }

      // Aqui você pode adicionar lógica adicional para verificar o tipo de usuário
      // se necessário, baseado nas informações retornadas pelo seu backend
      
      setIsAuthorized(true);
      setIsLoading(false);
    };

    checkAuth();
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Carregando...</div>
      </div>
    );
  }

  if (!isAuthorized) {
    return null; // Retorna null enquanto redireciona
  }

  return <>{children}</>;
}