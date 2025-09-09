import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, ActivityIndicator } from 'react-native';
import { Header } from '../components/Header';
import { PositiveMessageCard } from '../components/PositiveMessageCard';
import { useAuthentication } from '../hooks/useAuthentication';
import api from '../services/api';
// Importe as novas constantes Frutiger
import { FrutigerColors } from '../constants/FrutigerColors';
import { FrutigerLayout } from '../constants/FrutigerLayout';

export function HomeScreen() {
  const { user } = useAuthentication();
  const [positiveMessage, setPositiveMessage] = useState<string>('');
  const [loadingMessage, setLoadingMessage] = useState(true);
  const [goalStats, setGoalStats] = useState({ completed: 0, total: 0 });

  useEffect(() => {
    // Busca a mensagem positiva da API
    const fetchPositiveMessage = async () => {
      try {
        const response = await api.get('/ia/message');
        setPositiveMessage(response.data.message);
      } catch (error) {
        console.error("Falha ao buscar mensagem de IA:", error);
        setPositiveMessage("A vida é como andar de bicicleta. Para ter equilíbrio, você tem que se manter em movimento.");
      } finally {
        setLoadingMessage(false);
      }
    };

    // Busca o progresso das metas do usuário
    const fetchGoalStats = async () => {
      try {
        const response = await api.get('/goals');
        const completedGoals = response.data.filter((goal: any) => goal.completed).length;
        setGoalStats({ completed: completedGoals, total: response.data.length });
      } catch (error) {
        console.error("Falha ao buscar metas:", error);
      }
    };

    fetchPositiveMessage();
    fetchGoalStats();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Início" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.greeting}>Olá, {user?.name || 'usuário'} 👋</Text>
        {loadingMessage ? (
          <ActivityIndicator size="large" color={FrutigerColors.primary} style={styles.loadingMessage} />
        ) : (
          <PositiveMessageCard message={positiveMessage} />
        )}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Progresso de Metas</Text>
          <Text style={styles.dataText}>{goalStats.completed} de {goalStats.total}</Text>
          <Text style={styles.subtext}>Metas concluídas no dia.</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tempo de Tela Hoje</Text>
          <Text style={styles.dataText}>4h 15min</Text>
          <Text style={styles.subtext}>Seu limite diário é de 3h.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: FrutigerColors.background, // Fundo suave e claro
  },
  scrollContent: {
    padding: FrutigerLayout.spacing.md,
  },
  greeting: {
    fontSize: FrutigerLayout.fontSize.lg,
    fontWeight: 'bold',
    marginVertical: FrutigerLayout.spacing.sm,
    color: FrutigerColors.text,
    textShadowColor: 'rgba(255,255,255,0.8)', // Brilho no texto
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  loadingMessage: {
    marginTop: FrutigerLayout.spacing.md,
  },
  section: {
    padding: FrutigerLayout.spacing.md,
    marginTop: FrutigerLayout.spacing.md,
    ...FrutigerLayout.glassmorphism, // Aplica o estilo de vidro
  },
  sectionTitle: {
    fontSize: FrutigerLayout.fontSize.md,
    fontWeight: 'bold',
    color: FrutigerColors.text,
    marginBottom: FrutigerLayout.spacing.sm,
  },
  dataText: {
    fontSize: FrutigerLayout.fontSize.xl,
    fontWeight: 'bold',
    color: FrutigerColors.primary,
  },
  subtext: {
    fontSize: FrutigerLayout.fontSize.sm,
    color: FrutigerColors.textLight,
  },
});