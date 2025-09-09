import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, ActivityIndicator, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider, useAuthentication } from './hooks/useAuthentication'; // Importa o AuthProvider e useAuthentication
import { AuthNavigator } from './navigation/AuthNavigator';
import { AppNavigator } from './navigation/AppNavigator';
import * as Font from 'expo-font';
import { FrutigerColors } from './constants/FrutigerColors';

// Componente que lida com a navegação condicional
function RootNavigator() {
  const { user, isLoading } = useAuthentication(); // Usa o hook para acessar o estado global

  // Renderiza o navegador apropriado com base no estado do usuário
  return (
    <NavigationContainer>
      {user ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        await Font.loadAsync({
          'Futury-Light': require('./assets/fonts/Futury-Light.ttf'),
        });
        setFontLoaded(true);
      } catch (e) {
        console.warn(e);
      }
    }
    loadResourcesAndDataAsync();
  }, []);

  if (!fontLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={FrutigerColors.primary} />
        <Text style={styles.loadingText}>Carregando fontes...</Text>
      </View>
    );
  }

  // Envolve todo o aplicativo com o AuthProvider para criar o contexto de autenticação
  return (
    <AuthProvider>
      <RootNavigator />
      <StatusBar style="auto" />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: FrutigerColors.background,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: FrutigerColors.text,
    textShadowColor: 'rgba(255,255,255,0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});