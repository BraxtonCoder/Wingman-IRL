import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// TODO: Define navigation props if this screen needs to navigate or receive params
// For now, it's a simple display screen accessed from the header.

const PledgeScreen = () => {
  // TODO: Fetch and display user's current pledge
  // TODO: Allow editing the pledge
  const currentUserPledge = "I commit to making the first move daily and pushing my comfort zone.";

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Your Pledge</Text>
        <Text style={styles.pledgeText}>{currentUserPledge}</Text>
        {/* TODO: Add TextInput and Button for editing pledge */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 20,
  },
  pledgeText: {
    fontSize: 18,
    color: '#cccccc',
    textAlign: 'center',
    fontStyle: 'italic',
    lineHeight: 24,
  },
});

export default PledgeScreen; 