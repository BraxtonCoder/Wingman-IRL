import React, { useEffect } from 'react';
import { View, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { StackActions, useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Assuming RootStackParamList will be updated to include SplashScreen
// and Logo is the first screen of the Onboarding/Main flow based on RootNavigator logic

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      // Replace 'Onboarding' with the actual initial route determined by RootNavigator logic
      // if Onboarding is itself a stack. Or navigate to LogoScreen directly if appropriate.
      // For now, we assume RootNavigator handles whether to go to Onboarding or AppMain after this.
      // The key is to replace the SplashScreen so the user can't go back to it.
      navigation.dispatch(StackActions.replace('Onboarding')); // Or whatever your initial stack/screen is post-splash
    }, 2000); // 2-second delay, adjust as needed

    return () => clearTimeout(timer); // Cleanup the timer
  }, [navigation]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Reverted to original logo.png */}
        <Image 
          source={require('../assets/images/logo.png')} 
          style={styles.logo} 
          resizeMode="contain" 
        />
        <ActivityIndicator size="large" color="#ffffff" style={styles.activityIndicator} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1a1a1a', // Match your app's background
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a1a', // Or your desired splash background
  },
  logo: {
    width: 200, // Adjust as needed
    height: 200, // Adjust as needed
    marginBottom: 20,
  },
  activityIndicator: {
    marginTop: 20,
  }
});

export default SplashScreen; 