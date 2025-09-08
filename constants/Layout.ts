import { Dimensions, Platform, StatusBar } from 'react-native';
import { Colors } from './Colors';

const { width, height } = Dimensions.get('window');

// Defina a altura da barra de status para uso em cálculos de layout, se necessário
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

export const Layout = {
  window: {
    width,
    height,
  },
  isSmallDevice: width < 375,
  statusBarHeight: STATUSBAR_HEIGHT,

  // Espaçamentos Padrão (utilize estes valores para margens e paddings)
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },

  // Tamanhos de Fonte (utilize estes valores para a tipografia)
  fontSize: {
    sm: 12,
    md: 16,
    lg: 20,
    xl: 24,
  },

  // Bordas e Sombras (use para dar profundidade a cards e botões)
  borderRadius: 8,
  cardShadow: {
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
};
