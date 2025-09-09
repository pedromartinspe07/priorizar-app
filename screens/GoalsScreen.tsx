import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TextInput, Alert, ActivityIndicator, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Header } from '../components/Header';
import { GoalItem } from '../components/GoalItem';
import { Button } from '../components/Button';
import { useGoals } from '../hooks/useGoals';
// Importe as novas constantes
import { FrutigerColors } from '../constants/FrutigerColors';
import { FrutigerLayout } from '../constants/FrutigerLayout';

export function GoalsScreen() {
  const [newGoalTitle, setNewGoalTitle] = useState('');
  const { goals, isLoading, error, addGoal, toggleGoalComplete } = useGoals();

  const handleAddGoal = async () => {
    if (newGoalTitle.trim() === '') {
      Alert.alert('Erro', 'Por favor, digite uma meta.');
      return;
    }
    await addGoal(newGoalTitle);
    setNewGoalTitle('');
    Keyboard.dismiss();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Minhas Metas" />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView 
          style={styles.keyboardView}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Adicionar nova meta..."
              placeholderTextColor="#A9A9A9"
              value={newGoalTitle}
              onChangeText={setNewGoalTitle}
            />
            <Button title="Adicionar" onPress={handleAddGoal} />
          </View>
          {isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={FrutigerColors.primary} />
              <Text style={styles.loadingText}>Carregando metas...</Text>
            </View>
          ) : error ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : goals.length === 0 ? (
            <View style={styles.noGoalsContainer}>
              <Text style={styles.noGoalsText}>Nenhuma meta adicionada ainda!</Text>
            </View>
          ) : (
            <FlatList
              data={goals}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <GoalItem
                  goal={{
                    ...item,
                    id: item.id.toString(),
                  }}
                  onToggleComplete={() => toggleGoalComplete(item.id)}
                />
              )}
              style={styles.list}
              contentContainerStyle={styles.listContent}
            />
          )}
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: FrutigerColors.background,
  },
  keyboardView: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: FrutigerLayout.spacing.md,
    ...FrutigerLayout.glassmorphism, // Estilo de vidro no container de entrada
    margin: FrutigerLayout.spacing.md,
  },
  input: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    padding: FrutigerLayout.spacing.md,
    borderRadius: FrutigerLayout.borderRadius,
    marginRight: FrutigerLayout.spacing.sm,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.8)',
    fontSize: FrutigerLayout.fontSize.md,
    color: FrutigerColors.text,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: FrutigerLayout.spacing.md,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: FrutigerLayout.spacing.sm,
    color: FrutigerColors.text,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: FrutigerLayout.spacing.md,
  },
  errorText: {
    color: 'red',
    fontSize: FrutigerLayout.fontSize.md,
    textAlign: 'center',
  },
  noGoalsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noGoalsText: {
    fontSize: FrutigerLayout.fontSize.md,
    color: FrutigerColors.textLight,
  },
});