import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FrutigerColors } from '../constants/FrutigerColors';
import { FrutigerLayout } from '../constants/FrutigerLayout';

interface GoalItemProps {
  goal: {
    id: string;
    title: string;
    completed: boolean;
  };
  onToggleComplete: () => void;
}

export function GoalItem({ goal, onToggleComplete }: GoalItemProps) {
  const accessibilityLabel = `Meta: ${goal.title}. Status: ${goal.completed ? 'Concluída' : 'Pendente'}. Toque para alternar.`;
  const accessibilityHint = `Altera o status da meta ${goal.title} para ${goal.completed ? 'pendente' : 'concluída'}`;

  return (
    <TouchableOpacity
      style={styles.item}
      onPress={onToggleComplete}
      accessibilityRole="checkbox"
      accessibilityState={{ checked: goal.completed }}
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
    >
      <Text style={[styles.title, goal.completed && styles.completedTitle]}>
        {goal.title}
      </Text>
      <View style={[styles.status, goal.completed && styles.completedStatus]}>
        {goal.completed && <Ionicons name="checkmark" size={FrutigerLayout.fontSize.md} color={FrutigerColors.glassBase} />}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: FrutigerLayout.spacing.md,
    marginBottom: FrutigerLayout.spacing.sm,
    // Aplica o estilo de vidro em cada item
    ...FrutigerLayout.glassmorphism,
  },
  title: {
    fontSize: FrutigerLayout.fontSize.md,
    flex: 1,
    color: FrutigerColors.text,
    // Adiciona um brilho sutil ao texto
    textShadowColor: 'rgba(255,255,255,0.8)',
    textShadowOffset: { width: 0, height: 0.5 },
    textShadowRadius: 1,
  },
  completedTitle: {
    textDecorationLine: 'line-through',
    color: FrutigerColors.textLight,
  },
  status: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.8)',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: FrutigerLayout.spacing.sm,
  },
  completedStatus: {
    backgroundColor: FrutigerColors.secondary,
    borderColor: FrutigerColors.secondary,
  },
});