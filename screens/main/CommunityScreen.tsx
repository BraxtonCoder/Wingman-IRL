import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Button } from 'react-native';

// Placeholder data for forums/topics
const forums = [
  { id: '1', name: 'General Discussion', description: 'Talk about anything related to making the first move.' },
  { id: '2', name: 'Success Stories', description: 'Share your wins and motivate others.' },
  { id: '3', name: 'Challenges & Advice', description: 'Seek advice and discuss challenges.' },
  // TODO: Fetch forums from Firestore
];

const CommunityScreen = ({ navigation }: any) => {
  const navigateToForum = (forum: any) => {
    console.log('Navigating to forum:', forum.name);
    // TODO: Navigate to a detailed forum view with posts
    // navigation.navigate('ForumDetailScreen', { forumId: forum.id });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Community Hub</Text>
        {/* TODO: Add button to create new post/topic if applicable */}
        {/* <Button title="New Post" onPress={() => console.log('Navigate to new post screen')} /> */}
      </View>

      {forums.map(forum => (
        <TouchableOpacity key={forum.id} style={styles.forumItem} onPress={() => navigateToForum(forum)}>
          <Text style={styles.forumName}>{forum.name}</Text>
          <Text style={styles.forumDescription}>{forum.description}</Text>
        </TouchableOpacity>
      ))}

      {/* TODO: Add user groups, moderation tools, direct messaging if in scope */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    padding: 15,
  },
  header: {
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  forumItem: {
    backgroundColor: '#2c2c2c',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  forumName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 5,
  },
  forumDescription: {
    fontSize: 14,
    color: '#cccccc',
  },
});

export default CommunityScreen; 