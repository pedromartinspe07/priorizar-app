import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Alert, SafeAreaView, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import { Button } from '../components/Button';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useAuthentication } from '../hooks/useAuthentication';
import { AuthStackParamList } from '../navigation/AuthNavigator';
// Importe as novas constantes
import { FrutigerColors } from '../constants/FrutigerColors';
import { FrutigerLayout } from '../constants/FrutigerLayout';

type LoginScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Login'>;

export function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuthentication();
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
    } catch (error) {
      Alert.alert('Erro', 'Email ou senha incorretos.');
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
          <Text style={styles.title}>Bem-vindo de Volta</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor={FrutigerColors.textLight}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            placeholderTextColor={FrutigerColors.textLight}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <Button 
            title={loading ? "" : "Entrar"}
            onPress={handleLogin} 
            disabled={loading}
          >
            {loading && <ActivityIndicator size="small" color={FrutigerColors.glassBase} />}
          </Button>
          <Text style={styles.linkText} onPress={() => navigation.navigate('Register')}>
            Não tem uma conta? Crie uma aqui.
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
    ...FrutigerLayout.glassmorphism, // Aplica o estilo de vidro
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
    backgroundColor: 'rgba(255, 255, 255, 0.4)', // Transparente para o fundo
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