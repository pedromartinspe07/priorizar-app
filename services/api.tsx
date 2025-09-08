import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const API_BASE_URL = 'http://priorizar-backend-production.up.railway.app/api';

// Cria uma única instância do Axios para ser usada em todo o app.
// Isso centraliza a configuração e os interceptors.
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // Define um tempo limite de 10 segundos
});

// Interceptor para adicionar o token de autenticação em todas as requisições
api.interceptors.request.use(
  async (config) => {
    try {
      const token = await SecureStore.getItemAsync('auth_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("Falha ao adicionar o token na requisição:", error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratar erros de resposta
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Exemplo: se o erro for 401 (Não autorizado), o usuário deve ser deslogado.
    if (error.response?.status === 401) {
      console.log("Token expirado ou inválido. Deslogando...");
      // A lógica de logout real deve ser chamada aqui, por exemplo:
      // await SecureStore.deleteItemAsync('auth_token');
    }
    return Promise.reject(error);
  }
);

export default api;
