import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { FrutigerColors } from '../constants/FrutigerColors';
import { FrutigerLayout } from '../constants/FrutigerLayout';

import { HomeScreen } from '../screens/HomeScreen';
import { GoalsScreen } from '../screens/GoalsScreen';
import { SurveyScreen } from '../screens/SurveyScreen';
import { ProfileScreen } from '../screens/ProfileScreen';

// Define os tipos para as telas do seu navegador de abas
export type AppTabParamList = {
  Home: undefined;
  Goals: undefined;
  Survey: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<AppTabParamList>();

export function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({
        route,
      }: {
        route: { name: keyof AppTabParamList };
      }) => ({
        tabBarIcon: ({
          focused,
          color,
          size,
        }: {
          focused: boolean;
          color: string;
          size: number;
        }) => {
          let iconName;
          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Goals':
              iconName = focused ? 'checkmark-circle' : 'checkmark-circle-outline';
              break;
            case 'Survey':
              iconName = focused ? 'clipboard' : 'clipboard-outline';
              break;
            case 'Profile':
              iconName = focused ? 'person' : 'person-outline';
              break;
            default:
              iconName = 'help-circle';
          }
          return <Ionicons name={iconName as any} size={size} color={color} />;
        },
        tabBarActiveTintColor: FrutigerColors.primary,
        tabBarInactiveTintColor: FrutigerColors.textLight,
        headerShown: false,
        tabBarStyle: {
          ...FrutigerLayout.glassmorphism,
          backgroundColor: FrutigerColors.glassBase, // set after the spread
          borderTopColor: FrutigerColors.glassBorder,
          borderTopWidth: 1,
          height: 60 + FrutigerLayout.spacing.sm,
          paddingBottom: FrutigerLayout.spacing.sm,
        },
        tabBarLabelStyle: {
          fontSize: FrutigerLayout.fontSize.sm,
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Início' }} />
      <Tab.Screen name="Goals" component={GoalsScreen} options={{ title: 'Metas' }} />
      <Tab.Screen name="Survey" component={SurveyScreen} options={{ title: 'Questionário' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Perfil' }} />
    </Tab.Navigator>
  );
}