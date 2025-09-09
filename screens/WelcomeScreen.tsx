import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image } from 'react-native';
import { Button } from '../components/Button';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '../navigation/AuthNavigator';
import { FrutigerColors } from '../constants/FrutigerColors';
import { FrutigerLayout } from '../constants/FrutigerLayout';

type WelcomeScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Welcome'>;

export function WelcomeScreen() {
  const navigation = useNavigation<WelcomeScreenNavigationProp>();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image 
          source={require('../assets/images/priorizar-logo.png')} 
          style={styles.logo}
        />
        <Text style={styles.title}>Bem-vindo ao Priorizar</Text>
        <Text style={styles.subtitle}>
          Monitore seu tempo de tela, defina metas e priorize seu bem-estar.
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button 
          title="Entrar" 
          onPress={() => navigation.navigate('Login')}
        />
        <View style={styles.spacer} />
        <Button 
          title="Criar Conta" 
          onPress={() => navigation.navigate('Register')}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: FrutigerColors.background,
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: FrutigerLayout.spacing.xl,
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: FrutigerLayout.spacing.lg,
  },
  logo: {
    width: 180,
    height: 180,
    resizeMode: 'contain',
    marginBottom: FrutigerLayout.spacing.md,
  },
  title: {
    fontSize: FrutigerLayout.fontSize.xl,
    fontWeight: 'bold',
    color: FrutigerColors.text,
    textShadowColor: 'rgba(255,255,255,0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: FrutigerLayout.fontSize.md,
    color: FrutigerColors.textLight,
    textAlign: 'center',
    marginTop: FrutigerLayout.spacing.sm,
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  spacer: {
    height: FrutigerLayout.spacing.md,
  },
});