import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { OnboardingStackParamList } from './types';

// Import Onboarding Screens
import LogoScreen from '../screens/onboarding/LogoScreen';
// import OnboardingQuestionsScreen from '../screens/onboarding/OnboardingQuestionsScreen'; // To be removed
import GoalScreen from '../screens/onboarding/GoalScreen'; // New
import ChallengesScreen from '../screens/onboarding/ChallengesScreen'; // New
import CommitmentScreen from '../screens/onboarding/CommitmentScreen'; // New
import AuthScreen from '../screens/onboarding/AuthScreen';
import PaywallScreen from '../screens/onboarding/PaywallScreen';
import CreateProfileScreen from '../screens/onboarding/CreateProfileScreen';

const Stack = createStackNavigator<OnboardingStackParamList>();

const OnboardingNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: 'none' }}>
      <Stack.Screen name="Logo" component={LogoScreen} />
      {/* <Stack.Screen name="OnboardingQuestions" component={OnboardingQuestionsScreen} /> */}
      <Stack.Screen name="GoalScreen" component={GoalScreen} />
      <Stack.Screen name="ChallengesScreen" component={ChallengesScreen} />
      <Stack.Screen name="CommitmentScreen" component={CommitmentScreen} />
      <Stack.Screen name="Auth" component={AuthScreen} />
      <Stack.Screen name="Paywall" component={PaywallScreen} />
      <Stack.Screen name="CreateProfile" component={CreateProfileScreen} />
    </Stack.Navigator>
  );
};

export default OnboardingNavigator; 