import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TextInput, Alert, ActivityIndicator, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Header } from '../components/Header';
import { Button } from '../components/Button';
import { Picker } from '@react-native-picker/picker';
import { Colors } from '../constants/Colors';
import { Layout } from '../constants/Layout';
import api from '../services/api';

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
      <Header title="Questionário de Monitoramento" />
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
                placeholderTextColor={Colors.placeholder}
                value={dailyHours}
                onChangeText={setDailyHours}
                keyboardType="numeric"
              />
            </View>
            
            <View style={styles.questionContainer}>
              <Text style={styles.question}>2. Quais problemas psicológicos você obteve ao longo do tempo de uso?</Text>
              <TextInput
                style={styles.textarea}
                multiline
                numberOfLines={4}
                placeholder="Ex: ansiedade, estresse, irritabilidade..."
                placeholderTextColor={Colors.placeholder}
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
                placeholderTextColor={Colors.placeholder}
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
          {loading && <ActivityIndicator size="small" color={Colors.cardBackground} />}
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    padding: Layout.spacing.md,
  },
  introText: {
    fontSize: Layout.fontSize.md,
    color: Colors.textLight,
    textAlign: 'center',
    marginBottom: Layout.spacing.md,
    lineHeight: 24,
  },
  questionContainer: {
    backgroundColor: Colors.cardBackground,
    borderRadius: Layout.borderRadius,
    padding: Layout.spacing.md,
    marginBottom: Layout.spacing.md,
    ...Layout.cardShadow,
  },
  question: {
    fontSize: Layout.fontSize.md,
    fontWeight: 'bold',
    marginBottom: Layout.spacing.sm,
    color: Colors.text,
  },
  input: {
    backgroundColor: Colors.background,
    padding: Layout.spacing.sm,
    borderRadius: Layout.borderRadius,
    borderWidth: 1,
    borderColor: Colors.border,
    fontSize: Layout.fontSize.md,
  },
  textarea: {
    backgroundColor: Colors.background,
    padding: Layout.spacing.sm,
    borderRadius: Layout.borderRadius,
    borderWidth: 1,
    borderColor: Colors.border,
    fontSize: Layout.fontSize.md,
    height: 100,
    textAlignVertical: 'top',
  },
});
