import React, { useState, useEffect, useContext, createContext, PropsWithChildren } from 'react';
import { Alert } from 'react-native';

export type User = {
  email: string;
  name?: string;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

// Cria o contexto de autenticação
const AuthenticationContext = createContext<AuthContextType | undefined>(undefined);

// Implementação do provedor de autenticação
export function AuthProvider({ children }: PropsWithChildren<{}>) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Lógica de login mockada
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simula requisição
      if (email === 'teste@exemplo.com' && password === '123456') {
        const mockUser: User = { email: 'teste@exemplo.com', name: 'Pedro' };
        setUser(mockUser);
        Alert.alert('Sucesso', 'Login mockado com sucesso!');
      } else {
        Alert.alert('Erro', 'Email ou senha incorretos.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Ocorreu um erro ao tentar fazer login.');
    } finally {
      setIsLoading(false);
    }
  };

  // Lógica de logout mockada
  const logout = () => {
    setUser(null);
    Alert.alert('Sucesso', 'Logout realizado com sucesso!');
  };

  const value = {
    user,
    isLoading,
    login,
    logout,
  };

  return (
    <AuthenticationContext.Provider value={value}>
      {children}
    </AuthenticationContext.Provider>
  );
}

// Criação do hook personalizado para usar o contexto
export const useAuthentication = () => {
  const context = useContext(AuthenticationContext);
  if (context === undefined) {
    throw new Error('useAuthentication deve ser usado dentro de um AuthProvider');
  }
  return context;
};