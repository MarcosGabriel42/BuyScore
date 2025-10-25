'use client';

import { useSearchParams } from 'next/navigation';
import LoginForm from './LoginForm';

export default function LoginPage() {
  const searchParams = useSearchParams();
  const tipo = (searchParams.get('tipo') as "cliente" | "lojista") || "cliente";

  return <LoginForm tipo={tipo} />;
}
