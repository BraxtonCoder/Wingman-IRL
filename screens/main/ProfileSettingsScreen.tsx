import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Button } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';

// TODO: Fetch user data (username, email, subscription status, goals) from Firestore

const ProfileSettingsScreen = ({ navigation }: any) => {
  const user = {
    username: 'User123', // Placeholder
    email: 'user@example.com', // Placeholder
    registrationDate: '2024-01-01', // Placeholder
    subscriptionStatus: 'Premium Yearly', // Placeholder
    goals: 'Meet new people, build confidence', // Placeholder
  };

  const handleManageSubscription = () => {
    console.log('Navigate to subscription management (RevenueCat/Superwall)');
    // Potentially navigate to PaywallScreen or a dedicated management view
  };

  const handleLogout = () => {
    console.log('User logging out');
    // TODO: Implement Firebase logout
    // navigation.navigate('Auth'); // Navigate to Auth flow
  };

  return (
    // <SafeAreaView style={styles.safeArea}> // Changed to View
    <View style={styles.screenContainer}>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Profile & Settings</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Information</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Username:</Text>
            <Text style={styles.infoValue}>{user.username}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Email:</Text>
            <Text style={styles.infoValue}>{user.email}</Text>
          </View>
          {/* Add more account fields if needed */}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Subscription</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Status:</Text>
            <Text style={styles.infoValue}>{user.subscriptionStatus}</Text>
          </View>
          <TouchableOpacity style={styles.button} onPress={handleManageSubscription}>
            <Text style={styles.buttonText}>Manage Subscription</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Goals</Text>
          <Text style={styles.infoValue}>{user.goals}</Text>
          {/* TODO: Add goal setting and adjustment functionality */}
          <TouchableOpacity style={styles.button} onPress={() => console.log('Navigate to goal setting')}>
            <Text style={styles.buttonText}>Adjust Goals</Text>
          </TouchableOpacity>
        </View>
        
        {/* TODO: Personal stats and progress visualization */}
        {/* TODO: Notification preferences */}
        {/* TODO: Privacy settings */}
        {/* TODO: App theme settings (if alternatives to dark mode) */}

        <View style={[styles.section, styles.logoutSection]}>
          <Button title="Logout" onPress={handleLogout} color="#ff3b30" />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  // safeArea: { // Renamed to screenContainer
  screenContainer: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  container: {
    padding: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    backgroundColor: '#2c2c2c',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  infoLabel: {
    fontSize: 16,
    color: '#cccccc',
  },
  infoValue: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '500',
  },
  button: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoutSection: {
    backgroundColor: 'transparent',
  }
});

export default ProfileSettingsScreen; 