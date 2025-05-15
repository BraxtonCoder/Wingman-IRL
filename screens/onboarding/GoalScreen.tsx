import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TextInput, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { OnboardingStackParamList, OnboardingData } from '../../navigation/types';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = StackScreenProps<OnboardingStackParamList, 'GoalScreen'>;

const GoalScreen = ({ navigation, route }: Props) => {
  const [goals, setGoals] = useState('');
  // Initialize onboardingData from route params, or as an empty object if not provided
  const initialOnboardingData = route.params?.onboardingData || {}; 

  useEffect(() => {
    // Pre-fill if navigating back and data exists
    if (initialOnboardingData.goals) {
      setGoals(initialOnboardingData.goals);
    }
  }, [initialOnboardingData.goals]);

  const handleNext = () => {
    const updatedOnboardingData: OnboardingData = {
      ...initialOnboardingData,
      goals: goals.trim(),
    };
    navigation.navigate('ChallengesScreen', { onboardingData: updatedOnboardingData });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"} 
        style={styles.keyboardAvoidingViewContainer}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.title}>Your Goals</Text>
          <Text style={styles.label}>What are your main goals with Wingman IRL?</Text>
          <TextInput
            style={styles.input}
            placeholder="E.g., Meet more people, overcome approach anxiety"
            value={goals}
            onChangeText={setGoals}
            placeholderTextColor="#888"
            multiline
            returnKeyType="done" // For multiline, done is usually better than next
          />
          <View style={styles.buttonContainer}>
            <Button title="Next" onPress={handleNext} disabled={!goals.trim()} />
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
    minHeight: 100, // Give more space for goals
    textAlignVertical: 'top', 
    borderWidth: 1,
    borderColor: '#444',
  },
  buttonContainer: {
    marginTop: 10,
  }
});

export default GoalScreen; 