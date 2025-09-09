import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Alert, SafeAreaView, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import { Button } from '../components/Button';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '../navigation/AuthNavigator';
import { FrutigerColors } from '../constants/FrutigerColors';
import { FrutigerLayout } from '../constants/FrutigerLayout';

// Funções de validação de email e senha
const is_valid_email = (email: string) => {
  return email.includes('@') && email.includes('.');
};

const is_valid_password = (password: string) => {
  return password.length >= 6;
};

// Mock do hook useAuthentication
const useAuthentication = () => {
  const register = async (email: string, password: string): Promise<void> => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        Alert.alert('Sucesso', 'Registro mockado com sucesso! Agora você pode fazer login.');
        resolve();
      }, 1500);
    });
  };
  return { register };
};

type RegisterScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Register'>;

export function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuthentication();
  const navigation = useNavigation<RegisterScreenNavigationProp>();

  const handleRegister = async () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }
    if (!is_valid_email(email)) {
      Alert.alert('Erro', 'Por favor, insira um email válido.');
      return;
    }
    if (!is_valid_password(password)) {
      Alert.alert('Erro', 'A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    setLoading(true);
    try {
      await register(email, password);
      navigation.navigate('Login');
    } catch (error) {
      // O erro já é tratado no mock do registro
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.content}>
          <Text style={styles.title}>Criar Conta</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#A9A9A9"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            placeholderTextColor="#A9A9A9"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <Button
            title={loading ? "" : "Criar Conta"}
            onPress={handleRegister}
            disabled={loading}
          >
            {loading && <ActivityIndicator size="small" color={FrutigerColors.glassBase} />}
          </Button>
          <Text style={styles.linkText} onPress={() => navigation.navigate('Login')}>
            Já tem uma conta? Entrar.
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: FrutigerColors.background,
  },
  keyboardView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    padding: FrutigerLayout.spacing.xl,
    ...FrutigerLayout.glassmorphism,
  },
  title: {
    fontSize: FrutigerLayout.fontSize.xl,
    fontWeight: 'bold',
    marginBottom: FrutigerLayout.spacing.lg,
    color: FrutigerColors.text,
    textShadowColor: 'rgba(255,255,255,0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  input: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    padding: FrutigerLayout.spacing.md,
    borderRadius: FrutigerLayout.borderRadius,
    marginBottom: FrutigerLayout.spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.8)',
    fontSize: FrutigerLayout.fontSize.md,
    color: FrutigerColors.text,
  },
  linkText: {
    color: FrutigerColors.primary,
    marginTop: FrutigerLayout.spacing.md,
    fontSize: FrutigerLayout.fontSize.sm,
  },
});