import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, ActivityIndicator, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useAuthentication } from './hooks/useAuthentication';
import { AuthNavigator } from './navigation/AuthNavigator';
import { AppNavigator } from './navigation/AppNavigator';
import * as Font from 'expo-font';
import { FrutigerColors } from './constants/FrutigerColors';

export default function App() {
  const { user, isLoading } = useAuthentication();
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

  if (isLoading || !fontLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={FrutigerColors.primary} />
        <Text style={styles.loadingText}>Carregando...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      {user ? <AppNavigator /> : <AuthNavigator />}
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: FrutigerColors.background, // Fundo claro e suave
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: FrutigerColors.text, // Cor de texto principal
    textShadowColor: 'rgba(255,255,255,0.8)', // Brilho sutil
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});