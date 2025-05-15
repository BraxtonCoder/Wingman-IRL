import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TextInput, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { OnboardingStackParamList, OnboardingData } from '../../navigation/types';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = StackScreenProps<OnboardingStackParamList, 'ChallengesScreen'>;

const ChallengesScreen = ({ navigation, route }: Props) => {
  const [challenges, setChallenges] = useState('');
  const initialOnboardingData = route.params.onboardingData; // Should always be provided from GoalScreen

  useEffect(() => {
    if (initialOnboardingData.challenges) {
      setChallenges(initialOnboardingData.challenges);
    }
  }, [initialOnboardingData.challenges]);

  const handleNext = () => {
    const updatedOnboardingData: OnboardingData = {
      ...initialOnboardingData,
      challenges: challenges.trim(),
    };
    navigation.navigate('CommitmentScreen', { onboardingData: updatedOnboardingData });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"} 
        style={styles.keyboardAvoidingViewContainer}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.title}>Your Challenges</Text>
          <Text style={styles.label}>What are your specific challenges when approaching someone?</Text>
          <TextInput
            style={styles.input}
            placeholder="E.g., Starting conversations, fear of rejection"
            value={challenges}
            onChangeText={setChallenges}
            placeholderTextColor="#888"
            multiline
            returnKeyType="done"
          />
          <View style={styles.buttonContainer}>
            <Button title="Next" onPress={handleNext} disabled={!challenges.trim()} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  keyboardAvoidingViewContainer: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 30,
    textAlign: 'center',
  },
  label: {
    fontSize: 18,
    color: '#cccccc',
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
  input: {
    backgroundColor: '#2c2c2c',
    color: '#ffffff',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 20,
    minHeight: 100, // Give more space for challenges
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: '#444',
  },
  buttonContainer: {
    marginTop: 10,
  }
});

export default ChallengesScreen; 