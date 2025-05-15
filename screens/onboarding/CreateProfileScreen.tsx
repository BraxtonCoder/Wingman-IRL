import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { OnboardingStackParamList } from '../../navigation/types';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = StackScreenProps<OnboardingStackParamList, 'CreateProfile'>;

const CreateProfileScreen = ({ navigation, route }: Props) => {
  const [username, setUsername] = useState('');
  const onboardingData = route.params?.onboardingData;

  const handleCreateProfile = () => {
    if (username.trim().length < 3) {
      Alert.alert('Invalid Username', 'Username must be at least 3 characters long.');
      return;
    }
    console.log('Creating profile with username:', username);
    if (onboardingData) {
      console.log('Received Onboarding Data:', onboardingData);
      // TODO: Save username AND onboardingData to Firebase Firestore against the authenticated user
    } else {
      console.log('No onboarding data received at profile creation.');
    }
    // TODO: Set some flag indicating onboarding is complete
    
    navigation.reset({
      index: 0,
      routes: [{ name: 'AppMain' as any }],
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Create Your Profile</Text>
        <Text style={styles.label}>Choose a username for the leaderboard:</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
          placeholderTextColor="#888"
        />
        <Text style={styles.warningText}>
          This username will be visible on the community leaderboard.
        </Text>
        <Button title="Complete Profile & Start" onPress={handleCreateProfile} />
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
    padding: 20,
    // backgroundColor: '#1a1a1a', // Handled by safeArea
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    color: '#cccccc',
    marginBottom: 10,
  },
  input: {
    height: 50,
    borderColor: '#444',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#ffffff',
    backgroundColor: '#2c2c2c',
  },
  warningText: {
    fontSize: 12,
    color: '#ffcc00', // Warning color
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default CreateProfileScreen; 