import React from 'react';
import { TouchableOpacity, Text, StyleSheet, TouchableOpacityProps, View, ActivityIndicator } from 'react-native';
import { FrutigerColors } from '../constants/FrutigerColors';
import { FrutigerLayout } from '../constants/FrutigerLayout';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  loading?: boolean;
}

export function Button({ title, loading = false, ...rest }: ButtonProps) {
  return (
    <TouchableOpacity 
      style={[
        styles.button, 
        rest.disabled && styles.disabledButton,
      ]} 
      accessibilityLabel={title} 
      accessibilityHint={`Ativa a ação de ${title}`} 
      disabled={loading || rest.disabled} 
      {...rest}
    >
      {loading ? (
        <ActivityIndicator size="small" color={FrutigerColors.glassBase} />
      ) : (
        <Text style={styles.buttonText}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: FrutigerColors.primary,
    paddingVertical: FrutigerLayout.spacing.md,
    paddingHorizontal: FrutigerLayout.spacing.lg,
    borderRadius: FrutigerLayout.borderRadius,
    alignItems: 'center',
    justifyContent: 'center',
    // Usa a sombra do glassmorphism para um efeito de "flutuação"
    ...FrutigerLayout.glassmorphism, 
  },
  disabledButton: {
    backgroundColor: 'rgba(0, 122, 204, 0.5)', // Versão mais transparente do primary
  },
  buttonText: {
    color: FrutigerColors.glassBase, // Cor de texto que se destaca no fundo
    fontSize: FrutigerLayout.fontSize.md,
    fontWeight: 'bold',
    // Adiciona uma sombra para dar um efeito de brilho sutil
    textShadowColor: 'rgba(255, 255, 255, 0.8)', 
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});