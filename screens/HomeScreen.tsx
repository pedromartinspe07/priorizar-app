import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, ActivityIndicator } from 'react-native';
import { Header } from '../components/Header';
import { PositiveMessageCard } from '../components/PositiveMessageCard';
import { useAuthentication } from '../hooks/useAuthentication';
// import api from '../services/api'; // Mockado
import { FrutigerColors } from '../constants/FrutigerColors';
import { FrutigerLayout } from '../constants/FrutigerLayout';

export function HomeScreen() {
  const { user } = useAuthentication();
  const [positiveMessage, setPositiveMessage] = useState<string>('');
  const [loadingMessage, setLoadingMessage] = useState(true);
  const [goalStats, setGoalStats] = useState({ completed: 0, total: 0 });

  useEffect(() => {
    // Mock da busca da mensagem positiva da API
    const fetchPositiveMessage = async () => {
      try {
        setPositiveMessage("A vida é como andar de bicicleta. Para ter equilíbrio, você tem que se manter em movimento.");
      } catch (error) {
        console.error("Falha ao buscar mensagem de IA:", error);
        setPositiveMessage("A vida é como andar de bicicleta. Para ter equilíbrio, você tem que se manter em movimento.");
      } finally {
        setLoadingMessage(false);
      }
    };

    // Mock da busca do progresso das metas do usuário
    const fetchGoalStats = async () => {
      try {
        setGoalStats({ completed: 2, total: 4 });
      } catch (error) {
        console.error("Falha ao buscar estatísticas de metas:", error);
      }
    };

    // Simula o delay da requisição
    setTimeout(() => {
      fetchPositiveMessage();
      fetchGoalStats();
    }, 1500); // 1.5 segundos de delay para simular a requisição

  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Priorizar" />
      <ScrollView style={styles.scrollContent}>
        {loadingMessage ? (
          <View style={styles.loadingMessage}>
            <ActivityIndicator size="small" color={FrutigerColors.glassBase} />
            <Text style={{ textAlign: 'center', color: FrutigerColors.textLight, marginTop: 5 }}>Gerando mensagem...</Text>
          </View>
        ) : (
          <PositiveMessageCard message={positiveMessage} />
        )}

        <Text style={styles.greeting}>
          Olá, {(user && typeof user === 'object' && user !== null && 'email' in user && typeof user.email === 'string') ? user.email : 'Usuário'}!
        </Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Progresso de Metas</Text>
          <Text style={styles.dataText}>{goalStats.completed}/{goalStats.total}</Text>
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
  },
  dataText: {
    fontSize: FrutigerLayout.fontSize.xl,
    fontWeight: 'bold',
    color: FrutigerColors.text,
    marginVertical: FrutigerLayout.spacing.sm,
  },
  subtext: {
    fontSize: FrutigerLayout.fontSize.sm,
    color: FrutigerColors.textLight,
  },
});