import api from './api';
import * as SecureStore from 'expo-secure-store';

const AUTH_TOKEN_KEY = 'auth_token';

// Tipagem para os dados de login e registro
interface AuthData {
  email: string;
  password: string;
}

// Tipagem para a resposta da API de autenticação
interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

/**
 * Realiza a requisição de login para a API.
 */
export const login = async ({ email, password }: AuthData): Promise<AuthResponse> => {
  try {
    const response = await api.post<AuthResponse>('/auth/login', { email, password });
    await SecureStore.setItemAsync(AUTH_TOKEN_KEY, response.data.token);
    return response.data;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};

/**
 * Realiza a requisição de registro de um novo usuário para a API.
 */
export const register = async ({ email, password }: AuthData): Promise<AuthResponse> => {
  try {
    const response = await api.post<AuthResponse>('/auth/register', { email, password });
    await SecureStore.setItemAsync(AUTH_TOKEN_KEY, response.data.token);
    return response.data;
  } catch (error) {
    console.error('Registration failed:', error);
    throw error;
  }
};

/**
 * Remove o token de autenticação, efetuando o logout.
 */
export const logout = async (): Promise<void> => {
  try {
    await SecureStore.deleteItemAsync(AUTH_TOKEN_KEY);
  } catch (error) {
    console.error('Logout failed:', error);
    throw error;
  }
};
