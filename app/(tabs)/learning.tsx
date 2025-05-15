import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

interface ResourceSectionProps {
  title: string;
  content: string[]; // Array of strings for bullet points or paragraphs
}

const ResourceSection: React.FC<ResourceSectionProps> = ({ title, content }) => {
  return (
    <View style={styles.sectionContainer}>
      <ThemedText type="subtitle" style={styles.sectionTitle}>{title}</ThemedText>
      {content.map((item, index) => (
        <ThemedText key={index} style={styles.sectionContent}>• {item}</ThemedText>
      ))}
    </View>
  );
};

export default function LearningScreen() {
  const conversationStarters = [
    "Ask about their day or something interesting they're doing.",
    "Comment on something unique or positive about them.",
    "Share a brief, interesting observation about your surroundings.",
  ];

  const locationRecommendations = [
    "Coffee shops with communal tables.",
    "Bookstores or libraries.",
    "Meetup groups for hobbies you enjoy.",
    "Volunteer activities.",
    "Dog parks (if you have a dog!).",
  ];

  const bestPractices = [
    "Be genuine and respectful.",
    "Listen actively and show interest.",
    "Maintain good eye contact (but don't stare!).",
    "Be mindful of body language (yours and theirs).",
    "Know when to gracefully end the conversation.",
  ];

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <ThemedText type="title" style={styles.pageTitle}>Learning & Resources</ThemedText>
        
        <ResourceSection title="Conversation Starters" content={conversationStarters} />
        <ResourceSection title="Location Recommendations" content={locationRecommendations} />
        <ResourceSection title="Best Practices & Techniques" content={bestPractices} />
        
        {/* Placeholder for Video Tutorials */}
        <View style={styles.sectionContainer}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>Video Tutorials</ThemedText>
          <ThemedText style={styles.sectionContent}>Coming Soon!</ThemedText>
        </View>

      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: 16,
  },
  pageTitle: {
    marginBottom: 24,
    textAlign: 'center',
  },
  sectionContainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#2C2C2E', // Dark card background
    borderRadius: 8,
  },
  sectionTitle: {
    marginBottom: 10,
    color: '#FFFFFF',
  },
  sectionContent: {
    fontSize: 16,
    marginBottom: 5,
    lineHeight: 22,
    color: '#E0E0E0',
  },
}); 