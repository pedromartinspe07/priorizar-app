import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Alert, SafeAreaView, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import { Button } from '../components/Button';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useAuthentication } from '../hooks/useAuthentication';
import { AuthStackParamList } from '../navigation/AuthNavigator';
import { is_valid_email } from '../utils/validations'; // TODO: Verifique se o caminho está correto e se o arquivo existe
// Importe as novas constantes Frutiger
import { FrutigerColors } from '../constants/FrutigerColors';
import { FrutigerLayout } from '../constants/FrutigerLayout';

type RegisterScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Register'>;

export function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuthentication();
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

    setLoading(true);
    try {
      // Substitua por sua lógica de registro real
      await login(email, password);
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao tentar criar a conta. Tente novamente.');
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
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            placeholderTextColor="#A9A9A9"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <Button 
            title={loading ? "" : "Cadastrar"}
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
    marginTop: FrutigerLayout.spacing.md,
    color: FrutigerColors.primary,
    fontSize: FrutigerLayout.fontSize.sm,
    textDecorationLine: 'underline',
  },
});