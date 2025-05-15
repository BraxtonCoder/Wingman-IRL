import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { OnboardingStackParamList, OnboardingData } from '../../navigation/types';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = StackScreenProps<OnboardingStackParamList, 'CommitmentScreen'>;

const commitmentOptions = [
  { label: 'Daily Practice', value: 'daily' },
  { label: 'A Few Times a Week', value: 'few_times_week' },
  { label: 'Once a Week', value: 'once_week' },
  { label: 'Exploring Options', value: 'exploring' },
];

const CommitmentScreen = ({ navigation, route }: Props) => {
  const [selectedCommitment, setSelectedCommitment] = useState<string | null>(null);
  const initialOnboardingData = route.params.onboardingData; // Should always be provided

  useEffect(() => {
    if (initialOnboardingData.commitment) {
      setSelectedCommitment(initialOnboardingData.commitment);
    }
  }, [initialOnboardingData.commitment]);

  const handleNext = () => {
    const updatedOnboardingData: OnboardingData = {
      ...initialOnboardingData,
      commitment: selectedCommitment,
    };
    console.log('Final Onboarding Data:', updatedOnboardingData);
    navigation.navigate('Auth', { onboardingData: updatedOnboardingData });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"} 
        style={styles.keyboardAvoidingViewContainer}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.title}>Your Commitment</Text>
          <Text style={styles.label}>How committed are you to making a change?</Text>
          <View style={styles.commitmentOptionsContainer}>
            {commitmentOptions.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.commitmentOption,
                  selectedCommitment === option.value && styles.commitmentOptionSelected,
                ]}
                onPress={() => setSelectedCommitment(option.value)}
              >
                <Text 
                  style={[
                    styles.commitmentOptionText,
                    selectedCommitment === option.value && styles.commitmentOptionTextSelected,
                  ]}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          
          <View style={styles.buttonContainer}>
            <Button title="Next" onPress={handleNext} disabled={!selectedCommitment} />
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
    marginBottom: 15, // Increased margin before options
    alignSelf: 'flex-start',
  },
  commitmentOptionsContainer: {
    marginBottom: 20,
  },
  commitmentOption: {
    backgroundColor: '#2c2c2c',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#444',
  },
  commitmentOptionSelected: {
    backgroundColor: '#007bff',
    borderColor: '#005bff',
  },
  commitmentOptionText: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
  },
  commitmentOptionTextSelected: {
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginTop: 10,
  }
});

export default CommitmentScreen; 