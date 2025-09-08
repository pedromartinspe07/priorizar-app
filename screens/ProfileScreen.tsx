import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image } from 'react-native';
import { Header } from '../components/Header';
import { Button } from '../components/Button';
import { useAuthentication } from '../hooks/useAuthentication';
import { Colors } from '../constants/Colors';
import { Layout } from '../constants/Layout';

export function ProfileScreen() {
  const { user, logout } = useAuthentication();

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Perfil" />
      <View style={styles.profileContainer}>
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
    backgroundColor: Colors.background,
  },
  profileContainer: {
    alignItems: 'center',
    padding: Layout.spacing.lg,
    backgroundColor: Colors.cardBackground,
    margin: Layout.spacing.md,
    borderRadius: Layout.borderRadius,
    ...Layout.cardShadow,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: Layout.spacing.md,
  },
  name: {
    fontSize: Layout.fontSize.lg,
    fontWeight: 'bold',
    color: Colors.text,
  },
  email: {
    fontSize: Layout.fontSize.md,
    color: Colors.textLight,
    marginTop: Layout.spacing.xs,
  },
  buttonContainer: {
    margin: Layout.spacing.md,
  },
});
