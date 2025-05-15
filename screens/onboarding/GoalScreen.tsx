import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TextInput, ScrollView, Platform, TouchableOpacity } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { OnboardingStackParamList, OnboardingData } from '../../navigation/types';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = StackScreenProps<OnboardingStackParamList, 'GoalScreen'>;

const GOAL_OPTIONS = [
  "Meet more people",
  "Overcome approach anxiety",
  "Build confidence",
  "Find a relationship",
];

const GoalScreen = ({ navigation, route }: Props) => {
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [otherGoal, setOtherGoal] = useState('');
  const [showOtherInput, setShowOtherInput] = useState(false);
  
  const initialOnboardingData = route.params?.onboardingData || {}; 

  /* Commenting out useEffect for diagnostics
  useEffect(() => {
    if (initialOnboardingData.goals) {
      const goalsArray = Array.isArray(initialOnboardingData.goals) ? initialOnboardingData.goals : [initialOnboardingData.goals];
      const predefined = goalsArray.filter(g => GOAL_OPTIONS.includes(g) || g === 'Other');
      const custom = goalsArray.find(g => !GOAL_OPTIONS.includes(g) && g !== 'Other');
      
      setSelectedGoals(predefined);
      if (custom) {
        setOtherGoal(custom);
        setShowOtherInput(predefined.includes('Other'));
      } else if (predefined.includes('Other')) {
        setShowOtherInput(true);
      }
    }
  }, [initialOnboardingData.goals]);
  */

  const handleSelectGoal = (goal: string) => {
    setSelectedGoals(prev => {
      const newSelection = prev.includes(goal) 
        ? prev.filter(g => g !== goal) 
        : [...prev, goal];
      
      // Temporarily disable toggling showOtherInput for diagnostics
      // if (goal === 'Other') {
      //   setShowOtherInput(!prev.includes('Other'));
      //   if (prev.includes('Other')) { 
      //     setOtherGoal(''); 
      //   }
      // }
      return newSelection;
    });
  };

  const handleNext = () => {
    let combinedGoals: string[] = [...selectedGoals];
    // Adjust logic if "Other" selection is also disabled for diagnostics
    // if (selectedGoals.includes('Other') && otherGoal.trim()) {
    //   combinedGoals = combinedGoals.filter(g => g !== 'Other');
    //   combinedGoals.push(otherGoal.trim());
    // } else {
    //   combinedGoals = combinedGoals.filter(g => g !== 'Other');
    // }
    
    const updatedOnboardingData: OnboardingData = {
      ...initialOnboardingData,
      // Ensure this aligns with how 'Other' is handled, or simplify for diagnostics
      goals: combinedGoals.length > 0 ? combinedGoals.filter(g => g !== 'Other') : undefined, 
    };
    navigation.navigate('ChallengesScreen', { onboardingData: updatedOnboardingData });
  };
  
  const isNextDisabled = () => {
    if (selectedGoals.length === 0) return true;
    // Adjust if "Other" input is not shown
    // if (selectedGoals.includes('Other') && !otherGoal.trim()) return true;
    if (selectedGoals.includes('Other') && !showOtherInput) return false; // Simpler rule if input is hidden
    if (selectedGoals.includes('Other') && showOtherInput && !otherGoal.trim()) return true;

    return false;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
        <ScrollView 
          contentContainerStyle={styles.scrollContainer} 
          keyboardShouldPersistTaps="handled"
          automaticallyAdjustsScrollIndicatorInsets={false}
          automaticallyAdjustContentInsets={false}
          contentInsetAdjustmentBehavior="never"
        >
          <Text style={styles.title}>Your Goals</Text>
          <Text style={styles.label}>What are your main goals with Wingman IRL? (Select all that apply)</Text>
          
          {GOAL_OPTIONS.map(option => (
            <TouchableOpacity
              key={option}
              style={[
                styles.optionButton,
                selectedGoals.includes(option) && styles.optionButtonSelected
              ]}
              onPress={() => handleSelectGoal(option)}
            >
              <Text style={[
                styles.optionButtonText,
                selectedGoals.includes(option) && styles.optionButtonTextSelected
              ]}>{option}</Text>
            </TouchableOpacity>
          ))}
          
          <TouchableOpacity
              key="Other"
              style={[
                styles.optionButton,
                selectedGoals.includes("Other") && styles.optionButtonSelected
              ]}
              onPress={() => handleSelectGoal("Other")}
            >
              <Text style={[
                styles.optionButtonText,
                selectedGoals.includes("Other") && styles.optionButtonTextSelected
              ]}>Other</Text>
          </TouchableOpacity>

          {/* Commenting out TextInput for diagnostics
          {showOtherInput && (
            <TextInput
              style={styles.input}
              placeholder="Please specify your other goal"
              value={otherGoal}
              onChangeText={setOtherGoal}
              placeholderTextColor="#888"
              multiline
              returnKeyType="done"
            />
          )}
          */}

          <View style={styles.buttonContainer}>
            <Button title="Next" onPress={handleNext} disabled={isNextDisabled()} />
          </View>
        </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  // keyboardAvoidingViewContainer style can be removed or commented if KeyboardAvoidingView is removed
  // keyboardAvoidingViewContainer: {
  //   flex: 1,
  // },
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
  }
});

export default GoalScreen; 