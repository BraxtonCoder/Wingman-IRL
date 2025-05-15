import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TextInput, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { OnboardingStackParamList, OnboardingData } from '../../navigation/types';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = StackScreenProps<OnboardingStackParamList, 'ChallengesScreen'>;

const CHALLENGE_OPTIONS = [
  "Starting conversations",
  "Fear of rejection",
  "Knowing what to say",
  "Reading social cues",
];

const ChallengesScreen = ({ navigation, route }: Props) => {
  const [selectedChallenges, setSelectedChallenges] = useState<string[]>([]);
  const [otherChallenge, setOtherChallenge] = useState('');
  const [showOtherInput, setShowOtherInput] = useState(false);
  
  const initialOnboardingData = route.params.onboardingData;

  useEffect(() => {
    if (initialOnboardingData.challenges) {
      const challengesArray = Array.isArray(initialOnboardingData.challenges) ? initialOnboardingData.challenges : [initialOnboardingData.challenges];
      const predefined = challengesArray.filter(c => CHALLENGE_OPTIONS.includes(c) || c === 'Other');
      const custom = challengesArray.find(c => !CHALLENGE_OPTIONS.includes(c) && c !== 'Other');
      
      setSelectedChallenges(predefined);
      if (custom) {
        setOtherChallenge(custom);
        setShowOtherInput(predefined.includes('Other'));
      } else if (predefined.includes('Other')) {
        setShowOtherInput(true);
      }
    }
  }, [initialOnboardingData.challenges]);

  const handleSelectChallenge = (challenge: string) => {
    setSelectedChallenges(prev => {
      const newSelection = prev.includes(challenge) 
        ? prev.filter(c => c !== challenge) 
        : [...prev, challenge];
      
      if (challenge === 'Other') {
        setShowOtherInput(!prev.includes('Other'));
        if (prev.includes('Other')) { 
          setOtherChallenge('');
        }
      }
      return newSelection;
    });
  };

  const handleNext = () => {
    let combinedChallenges: string[] = [...selectedChallenges];
    if (selectedChallenges.includes('Other') && otherChallenge.trim()) {
      combinedChallenges = combinedChallenges.filter(c => c !== 'Other');
      combinedChallenges.push(otherChallenge.trim());
    } else {
      combinedChallenges = combinedChallenges.filter(c => c !== 'Other');
    }
    
    const updatedOnboardingData: OnboardingData = {
      ...initialOnboardingData,
      challenges: combinedChallenges.length > 0 ? combinedChallenges : undefined,
    };
    navigation.navigate('CommitmentScreen', { onboardingData: updatedOnboardingData });
  };
  
  const isNextDisabled = () => {
    if (selectedChallenges.length === 0) return true;
    if (selectedChallenges.includes('Other') && !otherChallenge.trim()) return true;
    return false;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"} 
        style={styles.keyboardAvoidingViewContainer}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.title}>Your Challenges</Text>
          <Text style={styles.label}>What are your specific challenges when approaching someone? (Select all that apply)</Text>
          
          {CHALLENGE_OPTIONS.map(option => (
            <TouchableOpacity
              key={option}
              style={[
                styles.optionButton,
                selectedChallenges.includes(option) && styles.optionButtonSelected
              ]}
              onPress={() => handleSelectChallenge(option)}
            >
              <Text style={[
                styles.optionButtonText,
                selectedChallenges.includes(option) && styles.optionButtonTextSelected
              ]}>{option}</Text>
            </TouchableOpacity>
          ))}
          
          <TouchableOpacity
              key="Other"
              style={[
                styles.optionButton,
                selectedChallenges.includes("Other") && styles.optionButtonSelected
              ]}
              onPress={() => handleSelectChallenge("Other")}
            >
              <Text style={[
                styles.optionButtonText,
                selectedChallenges.includes("Other") && styles.optionButtonTextSelected
              ]}>Other</Text>
          </TouchableOpacity>

          {showOtherInput && (
            <TextInput
              style={styles.input}
              placeholder="Please specify your other challenge"
              value={otherChallenge}
              onChangeText={setOtherChallenge}
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
  input: {
    backgroundColor: '#2c2c2c',
    color: '#ffffff',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 20,
    minHeight: 80,
    marginTop: 10,
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: '#444',
  },
  buttonContainer: {
    marginTop: 10,
  },
  optionButton: {
    backgroundColor: '#2c2c2c',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#444',
  },
  optionButtonSelected: {
    backgroundColor: '#007bff',
    borderColor: '#0056b3',
  },
  optionButtonText: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
  },
  optionButtonTextSelected: {
    color: '#ffffff', 
    fontWeight: 'bold',
  },
  nextButton: {
    marginTop: 20,
    backgroundColor: '#ffffff',
    paddingVertical: 15,
  },
});

export default ChallengesScreen; 