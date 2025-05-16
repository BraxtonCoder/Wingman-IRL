import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { OnboardingStackParamList } from '../../navigation/types';
import { SafeAreaView } from 'react-native-safe-area-context';

// Type for the combined navigation and route props
type Props = StackScreenProps<OnboardingStackParamList, 'Auth'>;

const AuthScreen = ({ navigation, route }: Props) => {
  // const [isLogin, setIsLogin] = useState(true); // Removed as we now have combined social login
  // const [email, setEmail] = useState(''); // Removed
  // const [password, setPassword] = useState(''); // Removed
  // const [confirmPassword, setConfirmPassword] = useState(''); // For sign-up // Removed

  const onboardingData = route.params?.onboardingData;

  const handleGoogleSignIn = () => {
    console.log('Attempting Google Sign-In');
    // TODO: Implement Firebase Google Sign-In
    // Simulate successful auth for navigation
    navigation.navigate('Paywall', { onboardingData });
  };

  const handleAppleSignIn = () => {
    console.log('Attempting Apple Sign-In');
    // TODO: Implement Firebase Apple Sign-In
    // Simulate successful auth for navigation
    navigation.navigate('Paywall', { onboardingData });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Image
          source={require('../../assets/images/Wingman-IRL-icon.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>Create Account / Sign In</Text>
        {/* Email and Password inputs removed */}

        <TouchableOpacity style={styles.socialButton} onPress={handleGoogleSignIn}>
          <Text style={styles.socialButtonText}>Continue with Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton} onPress={handleAppleSignIn}>
          <Text style={styles.socialButtonText}>Continue with Apple</Text>
        </TouchableOpacity>

        {/* Auth toggle and main auth button removed */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    // backgroundColor: '#1a1a1a', // Handled by safeArea
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 30,
  },
  // input styles removed as inputs are gone
  socialButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#4285F4', // Example Google blue, can be customized
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  socialButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  // switchText and toggleText styles removed as the toggle is gone
});

export default AuthScreen; 