import React from 'react';
// import { NavigationContainer } from '@react-navigation/native'; // No longer needed here
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from './types';

import SplashScreen from '../screens/SplashScreen';
import OnboardingNavigator from './OnboardingNavigator';
import MainNavigator from './MainNavigator';

const Stack = createStackNavigator<RootStackParamList>();

// These placeholders will eventually be replaced by actual auth state and onboarding completion flag
const hasCompletedOnboarding = false; 
const isAuthenticated = false;

const RootNavigator = () => {
  // The actual initial route for the app, *after* the splash screen.
  // SplashScreen will navigate to one of these based on its internal logic or a simplified target.
  // For now, SplashScreen navigates to 'Onboarding'. 
  // This logic determines if 'Onboarding' itself should be skipped for 'AppMain'.
  
  // Determine the route to navigate to *after* the splash screen
  // This logic is more about what happens if the splash screen were to directly navigate
  // to either 'Onboarding' or 'AppMain'. 
  // The SplashScreen itself currently hardcodes navigation to 'Onboarding', 
  // which then flows through its own screens or could be later made to respect these flags.

  // The initialRouteName for THIS navigator must be SplashScreen.
  let postSplashInitialRouteName: keyof RootStackParamList = 'Onboarding';
  if (isAuthenticated && hasCompletedOnboarding) {
    postSplashInitialRouteName = 'AppMain';
  }

  // NavigationContainer is removed from here. Expo Router's _layout.tsx implicitly handles it.
  return (
    <Stack.Navigator initialRouteName="SplashScreen" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="Onboarding" component={OnboardingNavigator} />
      <Stack.Screen name="AppMain" component={MainNavigator} />
    </Stack.Navigator>
  );
};

export default RootNavigator; 