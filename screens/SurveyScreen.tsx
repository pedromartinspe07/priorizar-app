import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TextInput, Alert, ActivityIndicator, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Header } from '../components/Header';
import { Button } from '../components/Button';
import api from '../services/api';
// Importe as novas constantes Frutiger
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
      await api.post('/survey', {
        daily_hours: parseFloat(dailyHours),
        psychological_issues: psychologicalIssues,
        family_issues: familyIssues,
      });

      Alert.alert('Sucesso', 'Seus dados foram enviados para análise!');
      // Resetar o formulário
      setDailyHours('');
      setPsychologicalIssues('');
      setFamilyIssues('');
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao enviar seu questionário. Tente novamente.');
      console.error("Erro ao enviar questionário:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Questionário" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View>
            <Text style={styles.introText}>
              Responda a este breve questionário para nos ajudar a entender melhor seus hábitos de uso.
            </Text>
    
            <View style={styles.questionContainer}>
              <Text style={styles.question}>1. Quantas horas por dia você utiliza o aparelho eletrônico?</Text>
              <TextInput
                style={styles.input}
                placeholder="Ex: 5"
                placeholderTextColor="#A9A9A9"
                value={dailyHours}
                onChangeText={setDailyHours}
                keyboardType="numeric"
                />
              <TextInput
                style={styles.textarea}
                multiline
                numberOfLines={4}
                placeholder="Ex: ansiedade, estresse, irritabilidade..."
                placeholderTextColor="#A9A9A9"
                value={psychologicalIssues}
                onChangeText={setPsychologicalIssues}
              />
            </View>
            
            <View style={styles.questionContainer}>
              <Text style={styles.question}>3. Quais problemas familiares você obteve ao longo do tempo de uso?</Text>
              <TextInput
                style={styles.textarea}
                multiline
                numberOfLines={4}
                placeholder="Ex: discussões, falta de comunicação, afastamento..."
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
  textarea: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    padding: FrutigerLayout.spacing.md,
    borderRadius: FrutigerLayout.borderRadius,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.8)',
    fontSize: FrutigerLayout.fontSize.md,
    height: 100,
    textAlignVertical: 'top',
    color: FrutigerColors.text,
  },
});