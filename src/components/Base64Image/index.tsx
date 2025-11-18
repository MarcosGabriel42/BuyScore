'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useBase64Image } from '@/hooks/useBase64Image';

interface Base64ImageProps {
  src: string | null | undefined;
  alt: string;
  fallback?: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  priority?: boolean;
}

/**
 * Componente de imagem que converte URLs para base64 automaticamente
 * Usa placeholders locais como fallback
 */
export default function Base64Image({
  src,
  alt,
  fallback = '/img/default.svg',
  width,
  height,
  fill,
  className = '',
  priority = false,
}: Base64ImageProps) {
  const [hasError, setHasError] = useState(false);
  
  // Converte para base64 se for URL externa; usa direto se for local ou já base64
  const imageSrc = useBase64Image(hasError ? null : src, fallback);

  const handleError = () => {
    setHasError(true);
  };

  if (fill) {
    return (
      <Image
        src={imageSrc}
        alt={alt}
        fill
        className={className}
        onError={handleError}
        priority={priority}
      />
    );
  }

  return (
    <Image
      src={imageSrc}
      alt={alt}
      width={width || 200}
      height={height || 200}
      className={className}
      onError={handleError}
      priority={priority}
    />
  );
}
