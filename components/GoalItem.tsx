import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';
import { Layout } from '../constants/Layout';

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
      accessibilityRole="checkbox" // Acessibilidade
      accessibilityState={{ checked: goal.completed }} // Acessibilidade
      accessibilityLabel={accessibilityLabel} // Acessibilidade
      accessibilityHint={accessibilityHint} // Acessibilidade
    >
      <Text style={[styles.title, goal.completed && styles.completedTitle]}>
        {goal.title}
      </Text>
      <View style={[styles.status, goal.completed && styles.completedStatus]}>
        {goal.completed && <Ionicons name="checkmark" size={Layout.fontSize.md} color={Colors.cardBackground} />}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Layout.spacing.md,
    backgroundColor: Colors.cardBackground,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  title: {
    fontSize: Layout.fontSize.md,
    flex: 1,
    color: Colors.text,
    fontFamily: 'Futury-Light', // Aplica a fonte
  },
  completedTitle: {
    textDecorationLine: 'line-through',
    color: Colors.textLight,
  },
  status: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: Layout.spacing.sm,
  },
  completedStatus: {
    backgroundColor: Colors.success,
    borderColor: Colors.success,
  },
});