// Utilitários para gerenciamento de autenticação

export const auth = {
  // Salvar token no localStorage
  saveToken: (token: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('authToken', token);
    }
  },

  // Obter token do localStorage
  getToken: (): string | null => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('authToken');
    }
    return null;
  },

  // Remover token (logout)
  removeToken: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('authToken');
    }
  },

  // Verificar se usuário está autenticado
  isAuthenticated: (): boolean => {
    return !!auth.getToken();
  },

  // Fazer requisições autenticadas
  fetchWithAuth: async (url: string, options: RequestInit = {}) => {
    const token = auth.getToken();
    
    const headers = {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
      ...options.headers,
    };

    return fetch(url, {
      ...options,
      headers,
    });
  }
};

// Constantes da API
export const API_BASE_URL = '/api/backend'; // Usando proxy do Next.js

export const API_ENDPOINTS = {
  LOGIN: `${API_BASE_URL}/auth/login`,
  REGISTER: `${API_BASE_URL}/auth/register`,
  // Adicione outros endpoints conforme necessário
};