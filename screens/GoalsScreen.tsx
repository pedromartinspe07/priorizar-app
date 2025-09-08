import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TextInput, Alert, ActivityIndicator, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Header } from '../components/Header';
import { GoalItem } from '../components/GoalItem';
import { Button } from '../components/Button';
import { useGoals } from '../hooks/useGoals';
import { Colors } from '../constants/Colors';
import { Layout } from '../constants/Layout';

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
              placeholderTextColor={Colors.placeholder}
              value={newGoalTitle}
              onChangeText={setNewGoalTitle}
            />
            <Button title="Adicionar" onPress={handleAddGoal} />
          </View>
          {isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={Colors.primary} />
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
                <GoalItem goal={item} onToggleComplete={() => toggleGoalComplete(item.id)} />
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
    backgroundColor: Colors.background,
  },
  keyboardView: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Layout.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    backgroundColor: Colors.cardBackground,
  },
  input: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: Layout.spacing.sm,
    borderRadius: Layout.borderRadius,
    marginRight: Layout.spacing.sm,
    borderWidth: 1,
    borderColor: Colors.border,
    fontSize: Layout.fontSize.md,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingBottom: Layout.spacing.md,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: Layout.spacing.sm,
    color: Colors.text,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Layout.spacing.md,
  },
  errorText: {
    color: Colors.error,
    fontSize: Layout.fontSize.md,
    textAlign: 'center',
  },
  noGoalsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noGoalsText: {
    fontSize: Layout.fontSize.md,
    color: Colors.textLight,
  },
});
