import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MainTabParamList, TrackingStackParamList } from './types';
import Ionicons from '@expo/vector-icons/Ionicons'; // Import Ionicons
import CustomHeader from '../components/ui/CustomHeader'; // Import CustomHeader

// Import Main Screens
import TrackingScreen from '../screens/main/TrackingScreen';
import AICoachScreen from '../screens/main/AICoachScreen';
import LearningResourcesScreen from '../screens/main/LearningResourcesScreen';
import ProfileSettingsScreen from '../screens/main/ProfileSettingsScreen';
import CommunityScreen from '../screens/main/CommunityScreen';
import LeaderboardScreen from '../screens/main/LeaderboardScreen';
import PledgeScreen from '../screens/main/PledgeScreen';
import AchievementsScreen from '../screens/main/AchievementsScreen';

const Tab = createBottomTabNavigator<MainTabParamList>();
const Stack = createStackNavigator<TrackingStackParamList>();

// Tracking Stack Navigator (for Tracking, Community, Leaderboard)
const TrackingStackNavigator = () => {
  return (
    <Stack.Navigator 
      // screenOptions for this stack are important if they have their own headers
      // when pushed on top of a screen that already has the custom tab header.
    >
      <Stack.Screen 
        name="TrackingHome" 
        component={TrackingScreen} 
        options={{ headerShown: false }} // This screen will use the Tab Navigator's custom header
      />
      <Stack.Screen 
        name="Community" 
        component={CommunityScreen} 
        options={{ 
          title: 'Community Hub', // Standard stack header for this deeper screen
          headerStyle: { backgroundColor: '#1a1a1a' },
          headerTintColor: '#ffffff',
        }} 
      />
      <Stack.Screen 
        name="Leaderboard" 
        component={LeaderboardScreen} 
        options={{ 
          title: 'Leaderboard', // Standard stack header
          headerStyle: { backgroundColor: '#1a1a1a' },
          headerTintColor: '#ffffff',
        }} 
      />
      <Stack.Screen
        name="Pledge"
        component={PledgeScreen}
        options={{
          title: 'Your Pledge',
          headerStyle: { backgroundColor: '#1a1a1a' },
          headerTintColor: '#ffffff',
        }}
      />
      <Stack.Screen
        name="Achievements"
        component={AchievementsScreen}
        options={{
          title: 'Achievements',
          headerStyle: { backgroundColor: '#1a1a1a' },
          headerTintColor: '#ffffff',
        }}
      />
    </Stack.Navigator>
  );
}

const MainNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route, navigation }) => ({
        // headerShown: false, // We are now providing a custom header for each tab screen
        tabBarActiveTintColor: '#ffffff',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { backgroundColor: '#1c1c1c', borderTopColor: '#333' },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: React.ComponentProps<typeof Ionicons>['name'] = 'alert-circle'; 
          if (route.name === 'Tracking') iconName = focused ? 'stats-chart' : 'stats-chart-outline';
          else if (route.name === 'AICoach') iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
          else if (route.name === 'Learning') iconName = focused ? 'book' : 'book-outline';
          else if (route.name === 'Profile') iconName = focused ? 'person-circle' : 'person-circle-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        // Apply the custom header to all tab screens
        header: (props) => <CustomHeader {...props} />,
      })}
    >
      <Tab.Screen name="Tracking" component={TrackingStackNavigator} />
      <Tab.Screen name="AICoach" component={AICoachScreen} />
      <Tab.Screen name="Learning" component={LearningResourcesScreen} />
      <Tab.Screen name="Profile" component={ProfileSettingsScreen} />
    </Tab.Navigator>
  );
};

export default MainNavigator; 