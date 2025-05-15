import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, Image } from 'react-native';
import { useNavigation, CommonActions } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context'; // For top padding

// Define a more specific navigation prop type if needed, or use a general type
// For simplicity, using `any` here, but you might want to type it more strictly
// based on where this header is used (e.g., TabNavigationProp, StackNavigationProp)
interface CustomHeaderProps {
  // The navigation prop is automatically passed by React Navigation when using the header option
  // For a tab header, it would be BottomTabHeaderProps, for stack it's StackHeaderProps
  // We can use a general navigation object from useNavigation() if specific props aren't needed.
}

const CustomHeader: React.FC<CustomHeaderProps> = (props) => {
  const navigation = useNavigation(); // General navigation object

  const navigateToPledge = () => {
    navigation.dispatch(
      CommonActions.navigate('Tracking', { screen: 'Pledge' })
    );
  };

  const navigateToAchievements = () => {
    navigation.dispatch(
      CommonActions.navigate('Tracking', { screen: 'Achievements' })
    );
  };

  const navigateToLeaderboard = () => {
    navigation.dispatch(
      CommonActions.navigate('Tracking', { screen: 'Leaderboard' })
    );
  };

  const navigateToCommunity = () => {
    navigation.dispatch(
      CommonActions.navigate('Tracking', { screen: 'Community' })
    );
  };

  return (
    <SafeAreaView edges={['top']} style={styles.safeAreaContainer}>
      <View style={styles.headerContainer}>
        <Image 
          source={require('../../assets/images/logo.png')}
          style={styles.logoImage} 
          resizeMode="contain" 
        />
        <View style={styles.iconsContainer}>
          <TouchableOpacity onPress={navigateToPledge} style={styles.iconButton}>
            <Ionicons name="hand-left-outline" size={24} color="#ffffff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={navigateToAchievements} style={styles.iconButton}>
            <Ionicons name="ribbon-outline" size={24} color="#ffffff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={navigateToLeaderboard} style={styles.iconButton}>
            <Ionicons name="trophy-outline" size={24} color="#ffffff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={navigateToCommunity} style={styles.iconButtonLast}>
            <Ionicons name="people-outline" size={24} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: {
    backgroundColor: '#1a1a1a', // Dark background for the header area
    // paddingTop is handled by SafeAreaView edges={['top']}
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    // Reverted to more standard/compact heights for the content area
    height: Platform.OS === 'ios' ? 44 : 56, 
  },
  logoImage: { // New style for the logo image
    width: 120, // Adjust width as needed
    height: 35,  // Adjust height as needed
    //tintColor: '#ffffff', // If your logo is single color and needs to be tinted white
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center', // Align icons vertically
  },
  iconButton: {
    paddingHorizontal: 8, // Adjusted padding for more icons
  },
  iconButtonLast: { // No left padding for the first, or right for last if preferred
    paddingHorizontal: 8,
    // paddingLeft: 8, // If you want consistent spacing *between* icons only
  }
});

export default CustomHeader; 