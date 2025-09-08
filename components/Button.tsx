import React from 'react';
import { TouchableOpacity, Text, StyleSheet, TouchableOpacityProps, View, ActivityIndicator } from 'react-native';
import { Colors } from '../constants/Colors';
import { Layout } from '../constants/Layout';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  loading?: boolean; // Adiciona prop de loading
}

export function Button({ title, loading = false, ...rest }: ButtonProps) {
  return (
    <TouchableOpacity 
      style={styles.button} 
      accessibilityLabel={title} 
      accessibilityHint={`Ativa a ação de ${title}`} 
      disabled={loading || rest.disabled} 
      {...rest}
    >
      {loading ? (
        <ActivityIndicator size="small" color={Colors.cardBackground} />
      ) : (
        <Text style={styles.buttonText}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: Layout.spacing.md,
    paddingHorizontal: Layout.spacing.lg,
    borderRadius: Layout.borderRadius,
    alignItems: 'center',
    justifyContent: 'center',
    ...Layout.cardShadow,
  },
  buttonText: {
    color: Colors.cardBackground,
    fontSize: Layout.fontSize.md,
    fontWeight: 'bold', // Pode remover se a fonte Futury-Light já tiver um estilo light/bold próprio
    fontFamily: 'Futury-Light', // Aplica a fonte
  },
});