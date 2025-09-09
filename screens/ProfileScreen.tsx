import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image } from 'react-native';
import { Header } from '../components/Header';
import { Button } from '../components/Button';
import { useAuthentication } from '../hooks/useAuthentication'; // Importa o hook real
import { FrutigerColors } from '../constants/FrutigerColors';
import { FrutigerLayout } from '../constants/FrutigerLayout';

export function ProfileScreen() {
  const { user, logout } = useAuthentication();

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Perfil" />
      <View style={styles.profileCard}>
        <Image
          source={require('../assets/images/profile-placeholder.png')}
          style={styles.avatar}
        />
        <Text style={styles.name}>{user?.name || 'Usuário Priorizar'}</Text>
        <Text style={styles.email}>{user?.email || 'email-do-usuario@exemplo.com'}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Sair da Conta" onPress={logout} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: FrutigerColors.background,
  },
  profileCard: {
    alignItems: 'center',
    padding: FrutigerLayout.spacing.xl,
    margin: FrutigerLayout.spacing.md,
    ...FrutigerLayout.glassmorphism,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 65,
    marginBottom: FrutigerLayout.spacing.lg,
    borderWidth: 3,
    borderColor: FrutigerColors.glassBorder,
    backgroundColor: 'rgba(255,255,255,0.4)',
  },
  name: {
    fontSize: FrutigerLayout.fontSize.xl,
    fontWeight: 'bold',
    color: FrutigerColors.text,
    textShadowColor: 'rgba(255,255,255,0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  email: {
    fontSize: FrutigerLayout.fontSize.md,
    color: FrutigerColors.textLight,
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: FrutigerLayout.spacing.md,
    marginTop: FrutigerLayout.spacing.xl,
  },
});