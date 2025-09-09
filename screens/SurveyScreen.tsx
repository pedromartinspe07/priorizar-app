import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TextInput, Alert, ActivityIndicator, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Header } from '../components/Header';
import { Button } from '../components/Button';
// import api from '../services/api'; // Mockado
import { FrutigerColors } from '../constants/FrutigerColors';
import { FrutigerLayout } from '../constants/FrutigerLayout';

export function SurveyScreen() {
  const [dailyHours, setDailyHours] = useState('');
  const [psychologicalIssues, setPsychologicalIssues] = useState('');
  const [familyIssues, setFamilyIssues] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!dailyHours || !psychologicalIssues || !familyIssues) {
      Alert.alert('Erro', 'Por favor, preencha todas as perguntas.');
      return;
    }

    setLoading(true);
    Keyboard.dismiss();

    try {
      // Simula a requisição da API
      await new Promise(resolve => setTimeout(resolve, 1500)); // 1.5 segundos de delay

      Alert.alert('Sucesso', 'Seus dados foram enviados para análise (mockado)!');
      // Resetar o formulário
      setDailyHours('');
      setPsychologicalIssues('');
      setFamilyIssues('');
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao enviar seu questionário. Tente novamente.');
      console.error("Erro mockado:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Questionário de Bem-Estar" />
      <ScrollView style={styles.scrollContent}>
        <Text style={styles.introText}>
          Responda a algumas perguntas simples para nos ajudar a entender melhor seus hábitos de sono e bem-estar.
        </Text>

        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View>
            <View style={styles.questionContainer}>
              <Text style={styles.question}>Quantas horas você dorme por noite?</Text>
              <TextInput
                style={styles.input}
                placeholder="Ex: 7"
                placeholderTextColor="#A9A9A9"
                keyboardType="numeric"
                value={dailyHours}
                onChangeText={setDailyHours}
              />
            </View>

            <View style={styles.questionContainer}>
              <Text style={styles.question}>Você tem lidado com problemas psicológicos?</Text>
              <TextInput
                style={styles.input}
                placeholder="Ex: Sim, Não"
                placeholderTextColor="#A9A9A9"
                value={psychologicalIssues}
                onChangeText={setPsychologicalIssues}
              />
            </View>

            <View style={styles.questionContainer}>
              <Text style={styles.question}>Você tem lidado com problemas familiares?</Text>
              <TextInput
                style={styles.input}
                placeholder="Ex: Sim, Não"
                placeholderTextColor="#A9A9A9"
                value={familyIssues}
                onChangeText={setFamilyIssues}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>

        <Button
          title={loading ? "" : "Enviar Respostas"}
          onPress={handleSubmit}
          disabled={loading}
          style={{ marginTop: 20 }}
        >
          {loading && <ActivityIndicator size="small" color={FrutigerColors.glassBase} />}
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: FrutigerColors.background,
  },
  scrollContent: {
    padding: FrutigerLayout.spacing.md,
  },
  introText: {
    fontSize: FrutigerLayout.fontSize.md,
    color: FrutigerColors.textLight,
    textAlign: 'center',
    marginBottom: FrutigerLayout.spacing.lg,
    lineHeight: 24,
  },
  questionContainer: {
    padding: FrutigerLayout.spacing.md,
    marginBottom: FrutigerLayout.spacing.md,
    ...FrutigerLayout.glassmorphism, // Aplica o estilo de vidro
  },
  question: {
    fontSize: FrutigerLayout.fontSize.md,
    fontWeight: 'bold',
    marginBottom: FrutigerLayout.spacing.sm,
    color: FrutigerColors.text,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    padding: FrutigerLayout.spacing.md,
    borderRadius: FrutigerLayout.borderRadius,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.8)',
    fontSize: FrutigerLayout.fontSize.md,
    color: FrutigerColors.text,
  },
});