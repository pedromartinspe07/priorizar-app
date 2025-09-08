import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Alert, SafeAreaView, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import { Button } from '../components/Button';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useAuthentication } from '../hooks/useAuthentication';
import { AuthStackParamList } from '../navigation/AuthNavigator';
import { Colors } from '../constants/Colors';
import { Layout } from '../constants/Layout';
import { is_valid_email } from '../utils/validations'; // Importa a função de validação

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
    // TODO: Adicionar validação de senha mais robusta se necessário

    setLoading(true);
    try {
      // Aqui você faria a chamada para a API de registro.
      // Por enquanto, vamos simular e depois fazer o login.
      // Substitua por sua lógica real de registro
      // await register(email, password); 
      // Após o sucesso do registro, faça o login automático
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
            placeholderTextColor={Colors.placeholder}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            placeholderTextColor={Colors.placeholder}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <Button 
            title={loading ? "" : "Cadastrar"}
            onPress={handleRegister} 
            disabled={loading}
          >
            {loading && <ActivityIndicator size="small" color={Colors.cardBackground} />}
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
    backgroundColor: Colors.background,
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
    padding: Layout.spacing.md,
  },
  title: {
    fontSize: Layout.fontSize.xl,
    fontWeight: 'bold',
    marginBottom: Layout.spacing.lg,
    color: Colors.text,
  },
  input: {
    width: '100%',
    backgroundColor: Colors.cardBackground,
    padding: Layout.spacing.sm,
    borderRadius: Layout.borderRadius,
    marginBottom: Layout.spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    fontSize: Layout.fontSize.md,
  },
  linkText: {
    marginTop: Layout.spacing.md,
    color: Colors.primary,
    fontSize: Layout.fontSize.sm,
    textDecorationLine: 'underline',
  },
});
