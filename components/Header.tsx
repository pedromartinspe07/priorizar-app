import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { Colors } from '../constants/Colors';
import { Layout } from '../constants/Layout';

interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header} accessibilityRole="header"> {/* Acessibilidade */}
        <Text style={styles.title} accessibilityLabel={`Título da página: ${title}`}>
          {title}
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: Colors.background,
  },
  header: {
    width: '100%',
    padding: Layout.spacing.md,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  title: {
    fontSize: Layout.fontSize.lg,
    fontWeight: 'bold', // Pode remover se a fonte Futury-Light já tiver um estilo light/bold próprio
    color: Colors.text,
    fontFamily: 'Futury-Light', // Aplica a fonte
  },
});