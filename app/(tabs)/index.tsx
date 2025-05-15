import React from 'react';
import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function TrackingScreen() {
  return (
    <ThemedView style={styles.container}>
      <View style={styles.content}>
        <ThemedText>Test Content for app/(tabs)/index.tsx</ThemedText>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1, // Temporarily remove flex to see natural positioning
    // backgroundColor: '#1C1C1E', // ThemedView should handle this
    // paddingTop: 20 // Remove all custom padding for now
  },
  content: { // Added a content style for clarity
    padding: 20,
    alignItems: 'center',
  }
});
