import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';

// TODO: Define types for Achievement items
const achievementsData = [
  { id: '1', title: 'First Move Master (Bronze)', description: 'Made 10 first moves!', icon: 'medal-outline', unlocked: true },
  { id: '2', title: 'Conversation Starter', description: 'Initiated 50 conversations.', icon: 'chatbubbles-outline', unlocked: true },
  { id: '3', title: 'Weekend Warrior', description: 'Checked in 3 days in a row.', icon: 'calendar-outline', unlocked: false },
  { id: '4', title: 'Fearless Approacher', description: 'Made 100 first moves!', icon: 'shield-checkmark-outline', unlocked: false },
  // TODO: Fetch actual achievement data
];

const AchievementsScreen = () => {
  const renderItem = ({ item }: { item: any }) => (
    <View style={[styles.achievementItem, !item.unlocked && styles.achievementItemLocked]}>
      <Ionicons name={item.icon as any} size={30} color={item.unlocked ? '#FFD700' : '#555'} style={styles.icon} />
      <View style={styles.textContainer}>
        <Text style={[styles.achievementTitle, !item.unlocked && styles.achievementTextLocked]}>{item.title}</Text>
        <Text style={[styles.achievementDescription, !item.unlocked && styles.achievementTextLocked]}>{item.description}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Achievements</Text>
        <FlatList
          data={achievementsData}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          ListEmptyComponent={<Text style={styles.emptyText}>No achievements unlocked yet. Keep going!</Text>}
        />
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
    padding: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 20,
    textAlign: 'center',
  },
  achievementItem: {
    backgroundColor: '#2c2c2c',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  achievementItemLocked: {
    backgroundColor: '#222', // Darker for locked
  },
  icon: {
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  achievementDescription: {
    fontSize: 14,
    color: '#cccccc',
    marginTop: 3,
  },
  achievementTextLocked: {
    color: '#777',
  },
  emptyText: {
    color: '#aaaaaa',
    textAlign: 'center',
    marginTop: 30,
    fontSize: 16,
  },
});

export default AchievementsScreen; 