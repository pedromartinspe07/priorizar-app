import { useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { login as apiLogin, logout as apiLogout } from '../services/authService';

// Define a chave que será usada para armazenar o token
const AUTH_TOKEN_KEY = 'auth_token';

// Tipagem básica para o objeto de usuário
interface User {
  token: string;
  name: string;
}

export function useAuthentication() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Função para efetuar o login
  const login = async (email: string, password: string) => {
    try {
      // Chama a função de login do serviço
      const response = await apiLogin({ email, password });
      
      // Salva o token de forma segura
      await SecureStore.setItemAsync(AUTH_TOKEN_KEY, response.token);
      
      // Define o usuário no estado
      setUser({ token: response.token, name: response.user.name });
    } catch (error) {
      console.error('Login failed:', error);
      throw error; // Propaga o erro para o componente que chamou
    }
  };

  // Função para efetuar o logout
  const logout = async () => {
    try {
      await apiLogout();
      await SecureStore.deleteItemAsync(AUTH_TOKEN_KEY);
      setUser(null);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // Efeito que roda uma vez para verificar o token salvo ao iniciar o app
  useEffect(() => {
    const fetchTokenAndUser = async () => {
      try {
        const token = await SecureStore.getItemAsync(AUTH_TOKEN_KEY);
        if (token) {
          // Em um cenário real, você faria uma chamada para validar o token
          // e buscar os dados do usuário. Por enquanto, usaremos um placeholder.
          setUser({ token, name: 'Usuário Priorizar' });
        }
      } catch (error) {
        console.error('Erro ao buscar o token:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTokenAndUser();
  }, []);

  return {
    user,
    isLoading,
    login,
    logout,
  };
}
