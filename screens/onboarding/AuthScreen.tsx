import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { OnboardingStackParamList } from '../../navigation/types';
import { SafeAreaView } from 'react-native-safe-area-context';

// Type for the combined navigation and route props
type Props = StackScreenProps<OnboardingStackParamList, 'Auth'>;

const AuthScreen = ({ navigation, route }: Props) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [confirmPassword, setConfirmPassword] = useState(''); // For sign-up

  const onboardingData = route.params?.onboardingData;

  const handleAuth = () => {
    if (isLogin) {
      console.log('Attempting login with:', email, password);
      // TODO: Implement Firebase Login
    } else {
      console.log('Attempting sign-up with:', email, password);
      // TODO: Implement Firebase Sign-up
    }
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
        <Text style={styles.title}>{isLogin ? 'Login' : 'Sign Up'}</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#888"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholderTextColor="#888"
        />
        {!isLogin && (
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            // value={confirmPassword}
            // onChangeText={setConfirmPassword}
            secureTextEntry
            placeholderTextColor="#888"
          />
        )}
        <Button title={isLogin ? 'Login' : 'Create Account'} onPress={handleAuth} />
        <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
          <Text style={styles.switchText}>
            {isLogin ? 'Need an account? Sign Up' : 'Have an account? Login'}
          </Text>
        </TouchableOpacity>
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
  input: {
    width: '100%',
    height: 50,
    borderColor: '#444',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#ffffff',
    backgroundColor: '#2c2c2c',
  },
  switchText: {
    color: '#007bff',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default AuthScreen; 