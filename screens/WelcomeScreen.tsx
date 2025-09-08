import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image } from 'react-native';
import { Button } from '../components/Button';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '../navigation/AuthNavigator';
import { Colors } from '../constants/Colors';
import { Layout } from '../constants/Layout';

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
    backgroundColor: Colors.background,
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: Layout.spacing.md,
  },
  content: {
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: Layout.spacing.md,
  },
  title: {
    fontSize: Layout.fontSize.xl,
    fontWeight: 'bold',
    color: Colors.text,
  },
  subtitle: {
    fontSize: Layout.fontSize.md,
    color: Colors.textLight,
    textAlign: 'center',
    marginTop: Layout.spacing.sm,
    paddingHorizontal: Layout.spacing.lg,
  },
  buttonContainer: {
    width: '100%',
  },
  spacer: {
    height: Layout.spacing.sm,
  },
});
