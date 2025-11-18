import { useState, useEffect } from 'react';

/**
 * Hook para converter URLs de imagem para base64
 * @param imageUrl URL da imagem a ser convertida
 * @param fallback Imagem de fallback caso a conversão falhe
 * @returns String base64 ou fallback
 */
export function useBase64Image(imageUrl: string | null | undefined, fallback: string = '/img/default.svg'): string {
  const [base64Image, setBase64Image] = useState<string>(fallback);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    // Se não houver URL ou for uma URL local/base64, usa direto
    if (!imageUrl || imageUrl.startsWith('/') || imageUrl.startsWith('data:')) {
      setBase64Image(imageUrl || fallback);
      return;
    }

    const convertToBase64 = async () => {
      try {
        setIsLoading(true);
        
        const response = await fetch(imageUrl, {
          mode: 'cors',
          cache: 'force-cache',
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch image: ${response.status}`);
        }

        const blob = await response.blob();
        
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result as string;
          setBase64Image(base64String);
        };
        reader.onerror = () => {
          setBase64Image(fallback);
        };
        reader.readAsDataURL(blob);
      } catch (error) {
        console.error('Error converting image to base64:', error);
        setBase64Image(fallback);
      } finally {
        setIsLoading(false);
      }
    };

    convertToBase64();
  }, [imageUrl, fallback]);

  return base64Image;
}

/**
 * Função utilitária para converter uma URL de imagem para base64
 * @param imageUrl URL da imagem
 * @returns Promise com a string base64
 */
export async function convertImageToBase64(imageUrl: string): Promise<string> {
  try {
    const response = await fetch(imageUrl, {
      mode: 'cors',
      cache: 'force-cache',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.status}`);
    }

    const blob = await response.blob();
    
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error('Error converting image to base64:', error);
    throw error;
  }
}
