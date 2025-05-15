import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';

interface LeaderboardEntry {
  id: string;
  username: string;
  score: number;
  rank: number;
}

// Placeholder data - replace with Firestore fetching
const MOCK_DATA: LeaderboardEntry[] = [
  { id: '1', username: 'AlphaMale101', score: 150, rank: 1 },
  { id: '2', username: 'SmoothOperator', score: 145, rank: 2 },
  { id: '3', username: 'User123', score: 120, rank: 3 }, // Current user example
  { id: '4', username: 'NightOwl', score: 110, rank: 4 },
  { id: '5', username: 'WingmanPro', score: 95, rank: 5 },
];

const LeaderboardScreen = () => {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);
  const [filter, setFilter] = useState('all-time'); // daily, weekly, monthly, all-time
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // TODO: Fetch leaderboard data from Firestore based on the filter
    setLoading(true);
    console.log(`Fetching leaderboard for: ${filter}`);
    // Simulate API call
    setTimeout(() => {
      // Sort mock data for demo purposes, actual sorting would be on backend query
      const sortedData = [...MOCK_DATA].sort((a, b) => b.score - a.score).map((item, index) => ({ ...item, rank: index + 1 }));
      setLeaderboardData(sortedData);
      setLoading(false);
    }, 1000);
  }, [filter]);

  const renderItem = ({ item }: { item: LeaderboardEntry }) => (
    <View style={[styles.entry, item.username === 'User123' && styles.currentUserEntry]}>
      <Text style={styles.rank}>{item.rank}.</Text>
      <Text style={styles.username}>{item.username}</Text>
      <Text style={styles.score}>{item.score} moves</Text>
    </View>
  );

  const FilterButton = ({ title, value }: { title: string, value: string }) => (
    <TouchableOpacity 
      style={[styles.filterButton, filter === value && styles.filterButtonActive]}
      onPress={() => setFilter(value)}
    >
      <Text style={[styles.filterButtonText, filter === value && styles.filterButtonTextActive]}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Leaderboard</Text>
      <View style={styles.filterContainer}>
        <FilterButton title="Daily" value="daily" />
        <FilterButton title="Weekly" value="weekly" />
        <FilterButton title="Monthly" value="monthly" />
        <FilterButton title="All Time" value="all-time" />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#ffffff" style={{marginTop: 20}} />
      ) : (
        <FlatList
          data={leaderboardData}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          ListEmptyComponent={<Text style={styles.emptyText}>No data available for this period.</Text>}
        />
      )}
      <Text style={styles.honorSystemText}>
        Leaderboard is based on an honor system. Play fair!
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    padding: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 15,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: '#333',
  },
  filterButtonActive: {
    backgroundColor: '#ffffff',
  },
  filterButtonText: {
    color: '#ffffff',
  },
  filterButtonTextActive: {
    color: '#000000', // Black text for contrast on white
  },
  entry: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2c2c2c',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  currentUserEntry: {
    backgroundColor: '#005fcc', // Highlight current user
    borderColor: '#007bff',
    borderWidth: 1,
  },
  rank: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: 'bold',
    marginRight: 10,
  },
  username: {
    fontSize: 16,
    color: '#dddddd',
    flex: 1,
  },
  score: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  emptyText: {
    color: '#aaaaaa',
    textAlign: 'center',
    marginTop: 30,
    fontSize: 16,
  },
  honorSystemText: {
    fontSize: 12,
    color: '#aaaaaa',
    textAlign: 'center',
    marginTop: 15,
    fontStyle: 'italic',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    alignItems: 'center',
  },
});

export default LeaderboardScreen; 