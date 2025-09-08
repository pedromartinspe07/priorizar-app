import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';
import { Layout } from '../constants/Layout';

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
    backgroundColor: Colors.cardBackground,
    borderRadius: Layout.borderRadius,
    padding: Layout.spacing.md,
    marginHorizontal: Layout.spacing.md,
    marginTop: Layout.spacing.md,
    ...Layout.cardShadow,
  },
  title: {
    fontSize: Layout.fontSize.md,
    fontWeight: 'bold', // Pode remover
    marginBottom: Layout.spacing.sm,
    color: Colors.success,
    textAlign: 'center',
    fontFamily: 'Futury-Light', // Aplica a fonte
  },
  message: {
    fontSize: Layout.fontSize.md,
    lineHeight: 24,
    color: Colors.textLight,
    textAlign: 'center',
    fontFamily: 'Futury-Light', // Aplica a fonte
  },
});