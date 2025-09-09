import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
// Importe as novas constantes Frutiger
import { FrutigerColors } from '../constants/FrutigerColors';
import { FrutigerLayout } from '../constants/FrutigerLayout';

interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header} accessibilityRole="header">
        <Text style={styles.title} accessibilityLabel={`Título da página: ${title}`}>
          {title}
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: FrutigerColors.background,
  },
  header: {
    width: '100%',
    padding: FrutigerLayout.spacing.md,
    alignItems: 'center',
    // Aplica o estilo de vidro em vez da borda
    ...FrutigerLayout.glassmorphism,
    // Adicione um padding para que o header se destaque da tela
    paddingVertical: FrutigerLayout.spacing.lg,
  },
  title: {
    fontSize: FrutigerLayout.fontSize.lg,
    fontWeight: 'bold',
    color: FrutigerColors.text,
    // Adiciona uma sombra para dar um efeito de brilho sutil
    textShadowColor: 'rgba(255, 255, 255, 0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});