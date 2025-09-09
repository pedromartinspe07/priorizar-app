// constants/FrutigerLayout.ts
import { StyleSheet } from 'react-native';

export const FrutigerLayout = {
  borderRadius: 15, // Bordas mais arredondadas
  spacing: {
    xs: 5,
    sm: 10,
    md: 15,
    lg: 20,
    xl: 25,
  },
  fontSize: {
    sm: 14,
    md: 16,
    lg: 22,
    xl: 28,
  },
  glassmorphism: { // Estilo básico para elementos de "vidro"
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // 70% opaco
    borderRadius: 15,
    borderWidth: StyleSheet.hairlineWidth, // Borda fina para efeito de vidro
    borderColor: 'rgba(255, 255, 255, 0.9)',
    shadowColor: 'rgba(0, 0, 0, 0.1)', // Sombra para profundidade
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
};