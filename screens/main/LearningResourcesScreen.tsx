import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';

const learningContent = [
  { id: '1', title: 'Top 5 Conversation Starters', type: 'article' },
  { id: '2', title: 'Best Places to Meet People', type: 'location_guide' },
  { id: '3', title: 'Approaching with Confidence (Video)', type: 'video' }, // Placeholder for video
  { id: '4', title: 'Active Listening Techniques', type: 'article' },
  // TODO: Add more curated content, potentially fetched from Firestore
  // TODO: Implement progress-based content unlocks if required
];

const LearningResourcesScreen = ({ navigation }: any) => {
  const openResource = (item: any) => {
    console.log('Opening resource:', item.title);
    // TODO: Navigate to a detailed view for the resource or play video
  };

  return (
    <View style={styles.screenContainer}>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Learning & Resources</Text>
        {learningContent.map(item => (
          <TouchableOpacity key={item.id} style={styles.resourceItem} onPress={() => openResource(item)}>
            <Text style={styles.resourceTitle}>{item.title}</Text>
            <Text style={styles.resourceType}>{item.type.replace('_', ' ')}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
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
  resourceItem: {
    backgroundColor: '#2c2c2c',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  resourceTitle: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: '500',
  },
  resourceType: {
    fontSize: 14,
    color: '#aaaaaa',
    marginTop: 5,
    textTransform: 'capitalize',
  },
});

export default LearningResourcesScreen; 