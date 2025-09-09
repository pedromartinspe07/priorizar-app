import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TextInput, Alert, ActivityIndicator, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Header } from '../components/Header';
import { GoalItem } from '../components/GoalItem';
import { Button } from '../components/Button';
import { FrutigerColors } from '../constants/FrutigerColors';
import { FrutigerLayout } from '../constants/FrutigerLayout';

// Mock do hook useGoals
const useGoals = () => {
  const [goals, setGoals] = useState([
    { id: '1', title: 'Meditar por 10 minutos', completed: true },
    { id: '2', title: 'Ler 30 páginas de um livro', completed: false },
    { id: '3', title: 'Praticar exercício físico', completed: false },
    { id: '4', title: 'Organizar o quarto', completed: true },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const addGoal = async (title: string) => {
    setIsLoading(true);
    // Simula a requisição da API
    setTimeout(() => {
      const newGoal = { id: Math.random().toString(), title, completed: false };
      setGoals(prevGoals => [newGoal, ...prevGoals]);
      setIsLoading(false);
      Alert.alert('Sucesso', 'Meta adicionada com sucesso (mockada)!');
    }, 1000);
  };

  const toggleGoalComplete = async (goalId: string) => {
    setIsLoading(true);
    // Simula a requisição da API
    setTimeout(() => {
      setGoals(prevGoals =>
        prevGoals.map(goal =>
          goal.id === goalId ? { ...goal, completed: !goal.completed } : goal
        )
      );
      setIsLoading(false);
      Alert.alert('Sucesso', 'Meta atualizada (mockada)!');
    }, 500);
  };

  return { goals, isLoading, error, addGoal, toggleGoalComplete };
};

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
            <Button
              title={isLoading ? "" : "+"}
              onPress={handleAddGoal}
              disabled={isLoading}
              style={{ paddingVertical: 10, paddingHorizontal: 15 }}
            >
              {isLoading && <ActivityIndicator size="small" color={FrutigerColors.glassBase} />}
            </Button>
          </View>

          {isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={FrutigerColors.glassBase} />
              <Text style={styles.loadingText}>Carregando metas...</Text>
            </View>
          ) : (
            <FlatList
              data={goals}
              renderItem={({ item }) => (
                <GoalItem
                  goal={item}
                  onToggleComplete={() => toggleGoalComplete(item.id)}
                />
              )}
              keyExtractor={item => item.id}
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
});