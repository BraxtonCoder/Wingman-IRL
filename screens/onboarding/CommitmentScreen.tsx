import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity, TextInput } from 'react-native';
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
  const [selectedCommitmentValue, setSelectedCommitmentValue] = useState<string | null>(null);
  const [otherCommitmentText, setOtherCommitmentText] = useState('');
  const [isOtherSelected, setIsOtherSelected] = useState(false);
  const initialOnboardingData = route.params.onboardingData;

  useEffect(() => {
    if (initialOnboardingData.commitment) {
      const isPredefined = commitmentOptions.some(opt => opt.value === initialOnboardingData.commitment);
      if (isPredefined) {
        setSelectedCommitmentValue(initialOnboardingData.commitment);
        setIsOtherSelected(false);
      } else if (initialOnboardingData.commitment) { // Custom value was stored
        setSelectedCommitmentValue('other'); // Conceptually select "Other"
        setOtherCommitmentText(initialOnboardingData.commitment);
        setIsOtherSelected(true);
      }
    }
  }, [initialOnboardingData.commitment]);

  const handleSelectCommitment = (value: string) => {
    if (value === 'other') {
      setSelectedCommitmentValue('other'); 
      setIsOtherSelected(true);
    } else {
      setSelectedCommitmentValue(value);
      setIsOtherSelected(false);
      setOtherCommitmentText(''); // Clear other text if a predefined option is selected
    }
  };

  const handleNext = () => {
    let finalCommitment: string | null = null;
    if (isOtherSelected && otherCommitmentText.trim()) {
      finalCommitment = otherCommitmentText.trim();
    } else if (selectedCommitmentValue && selectedCommitmentValue !== 'other') {
      finalCommitment = selectedCommitmentValue;
    }
    // If 'other' is selected but text is empty, finalCommitment remains null or previous non-other value

    const updatedOnboardingData: OnboardingData = {
      ...initialOnboardingData,
      commitment: finalCommitment,
    };
    console.log('Final Onboarding Data from Commitment:', updatedOnboardingData);
    navigation.navigate('Auth', { onboardingData: updatedOnboardingData });
  };
  
  const isNextDisabled = () => {
    if (isOtherSelected) {
      return !otherCommitmentText.trim();
    }
    return !selectedCommitmentValue;
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
                  selectedCommitmentValue === option.value && !isOtherSelected && styles.commitmentOptionSelected,
                ]}
                onPress={() => handleSelectCommitment(option.value)}
              >
                <Text 
                  style={[
                    styles.commitmentOptionText,
                    selectedCommitmentValue === option.value && !isOtherSelected && styles.commitmentOptionTextSelected,
                  ]}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
            {/* "Other" Button */}
            <TouchableOpacity
              key="other"
              style={[
                styles.commitmentOption,
                isOtherSelected && styles.commitmentOptionSelected,
              ]}
              onPress={() => handleSelectCommitment('other')}
            >
              <Text 
                style={[
                  styles.commitmentOptionText,
                  isOtherSelected && styles.commitmentOptionTextSelected,
                ]}
              >
                Other (Please specify)
              </Text>
            </TouchableOpacity>
          </View>
          
          {isOtherSelected && (
            <TextInput
              style={styles.input}
              placeholder="Describe your commitment level"
              value={otherCommitmentText}
              onChangeText={setOtherCommitmentText}
              placeholderTextColor="#888"
              multiline
              returnKeyType="done"
            />
          )}
          
          <View style={styles.buttonContainer}>
            <Button title="Next" onPress={handleNext} disabled={isNextDisabled()} />
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
    marginBottom: 15,
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
  },
  input: {
    backgroundColor: '#2c2c2c',
    color: '#ffffff',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 20,
    minHeight: 80,
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: '#444',
    marginTop: 10,
  },
});

export default CommitmentScreen; 