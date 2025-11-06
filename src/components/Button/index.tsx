'use client';

import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline';
}

export function Button({ className, variant = 'default', ...props }: ButtonProps) {
  const base =
    'font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2';
  const variants = {
    default: 'bg-blue-500 text-white hover:bg-blue-600',
    outline: 'border border-red-500 text-red-500 hover:bg-red-50',
  };

  return (
    <button className={cn(base, variants[variant], className)} {...props} />
  );
}
