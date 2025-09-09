import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
// Importe as novas constantes Frutiger
import { FrutigerColors } from '../constants/FrutigerColors';
import { FrutigerLayout } from '../constants/FrutigerLayout';

interface PositiveMessageCardProps {
  message: string;
}

export function PositiveMessageCard({ message }: PositiveMessageCardProps) {
  return (
    <View style={styles.card} accessible={true} accessibilityRole="none">
      <Text style={styles.title} accessibilityLabel="Mensagem Positiva do Dia">
        Mensagem Positiva do Dia!
      </Text>
      <Text style={styles.message} accessibilityLabel={`Sua mensagem: ${message}`}>
        {message}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: FrutigerLayout.spacing.md,
    marginHorizontal: FrutigerLayout.spacing.md,
    marginTop: FrutigerLayout.spacing.md,
    // Aplica o estilo de vidro em vez das cores e sombras antigas
    ...FrutigerLayout.glassmorphism, 
  },
  title: {
    fontSize: FrutigerLayout.fontSize.md,
    fontWeight: 'bold',
    marginBottom: FrutigerLayout.spacing.sm,
    color: FrutigerColors.secondary, // Cor de destaque do Frutiger
    textAlign: 'center',
    // Adiciona uma sombra para um brilho sutil
    textShadowColor: 'rgba(255, 255, 255, 0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  message: {
    fontSize: FrutigerLayout.fontSize.md,
    lineHeight: 24,
    color: FrutigerColors.textLight, // Cor para textos secundários
    textAlign: 'center',
  },
});