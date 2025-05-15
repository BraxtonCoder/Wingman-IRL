import React, { useState, useMemo } from 'react';
import { Platform, StyleSheet, ScrollView, View, Text, TouchableOpacity, FlatList, Modal, Button } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Calendar, DateData } from 'react-native-calendars';

// Helper to get day name
const getDayName = (date: Date): string => {
  return date.toLocaleDateString('en-US', { weekday: 'short' }); // e.g., Mon, Tue
};

// Helper to format date
const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }); // e.g., May 19
}

// Generate some sample dates for now (e.g., today and next 6 days)
const today = new Date();
const sampleDates = Array.from({ length: 30 }, (_, i) => {
  const date = new Date(today);
  date.setDate(today.getDate() - 15 + i);
  return {
    id: date.toISOString().split('T')[0], // 'YYYY-MM-DD'
    dateObj: date,
    dayName: getDayName(date),
    formattedDate: formatDate(date),
    moves: [i % 4 === 0, i % 3 === 0, i % 5 === 0], // Randomize some initial checks for demo
  };
});

type DayData = typeof sampleDates[0];
type MoveStatus = DayData['moves'];

const DayCard = ({ day, onToggleCheckbox }: { day: DayData, onToggleCheckbox: (dayId: string, moveIndex: number) => void }) => {
  return (
    <View style={styles.dayCard}>
      <ThemedText style={styles.dayNameText}>{day.dayName}</ThemedText>
      <ThemedText style={styles.dateText}>{day.formattedDate}</ThemedText>
      <View style={styles.checkboxContainer}>
        {day.moves.map((isChecked, index) => (
          <TouchableOpacity
            key={index}
            style={styles.checkbox}
            onPress={() => onToggleCheckbox(day.id, index)}
          >
            <Ionicons
              name={isChecked ? 'checkbox-outline' : 'square-outline'}
              size={30}
              color={isChecked ? '#4CAF50' : '#888'}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default function TrackingScreen() {
  const [daysData, setDaysData] = useState<DayData[]>(sampleDates);
  const [showMonthlyCalendar, setShowMonthlyCalendar] = useState(false);
  const [selectedCalendarDate, setSelectedCalendarDate] = useState<string>(today.toISOString().split('T')[0]);

  const handleToggleCheckbox = (dayId: string, moveIndex: number) => {
    setDaysData(prevDaysData =>
      prevDaysData.map(day => {
        if (day.id === dayId) {
          const newMoves = [...day.moves] as MoveStatus;
          newMoves[moveIndex] = !newMoves[moveIndex];
          return { ...day, moves: newMoves };
        }
        return day;
      })
    );
  };

  const markedDatesForCalendar = useMemo(() => {
    const marks: { [key: string]: any } = {};
    daysData.forEach(day => {
      const allMovesDone = day.moves.every(move => move === true);
      if (allMovesDone) {
        marks[day.id] = { marked: true, dotColor: '#4CAF50', selected: day.id === selectedCalendarDate, selectedColor: day.id === selectedCalendarDate ? '#007AFF' : '#4CAF50' };
      } else if (day.moves.some(move => move === true)) {
        marks[day.id] = { marked: true, dotColor: '#FFC107', selected: day.id === selectedCalendarDate, selectedColor: '#007AFF' }; // Yellow if some moves done
      } else {
        if (day.id === selectedCalendarDate) {
            marks[day.id] = {selected: true, selectedColor: '#007AFF'};
        }
      }
    });
    return marks;
  }, [daysData, selectedCalendarDate]);

  const onDayPress = (day: DateData) => {
    setSelectedCalendarDate(day.dateString);
    // Optional: Close modal on day press or navigate daily scroller
    // setShowMonthlyCalendar(false);
  };

  return (
    <ThemedView style={styles.container}>
      {/* Placeholder for the "I commit to..." and "Tree: Stage X" if they are above the scroller */}
      <View style={styles.headerContentPlaceholder}>
        <ThemedText>Your Pledge / Tree Stage Area</ThemedText>
      </View>
      
      <View style={styles.dailyScrollViewContainer}>
        <FlatList
          horizontal
          data={daysData}
          renderItem={({ item }) => <DayCard day={item} onToggleCheckbox={handleToggleCheckbox} />}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.flatListContentContainer}
        />
      </View>

      {/* Placeholder for Total Moves */}
      <View style={styles.totalMovesPlaceholder}>
        <ThemedText>Total Moves: X</ThemedText>
      </View>
      
      {/* Placeholder for future monthly calendar toggle/view */}
      <View style={styles.monthlyCalendarTogglePlaceholder}>
        <TouchableOpacity onPress={() => setShowMonthlyCalendar(true)}>
            <ThemedText style={{color: '#007AFF', fontSize: 16}}>View Monthly Calendar</ThemedText>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={false}
        visible={showMonthlyCalendar}
        onRequestClose={() => {
          setShowMonthlyCalendar(false);
        }}
      >
        <ThemedView style={styles.modalView}>
          <Calendar
            current={selectedCalendarDate}
            onDayPress={onDayPress}
            markedDates={markedDatesForCalendar}
            theme={{
              backgroundColor: '#1C1C1E',
              calendarBackground: '#1C1C1E',
              textSectionTitleColor: '#FFFFFF',
              selectedDayBackgroundColor: '#007AFF',
              selectedDayTextColor: '#ffffff',
              todayTextColor: '#00adf5',
              dayTextColor: '#FFFFFF',
              textDisabledColor: '#555555',
              dotColor: '#00adf5',
              selectedDotColor: '#ffffff',
              arrowColor: '#007AFF',
              monthTextColor: '#FFFFFF',
              indicatorColor: 'blue',
              textDayFontWeight: '300',
              textMonthFontWeight: 'bold',
              textDayHeaderFontWeight: '300',
              textDayFontSize: 16,
              textMonthFontSize: 18,
              textDayHeaderFontSize: 14
            }}
          />
          <Button title="Close Calendar" onPress={() => setShowMonthlyCalendar(false)} color={Platform.OS === 'ios' ? '#007AFF' : undefined} />
        </ThemedView>
      </Modal>

    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 25 : 20, // Basic status bar handling
  },
  headerContentPlaceholder: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    marginTop: Platform.OS === 'android' ? 25 : 40, // Adjust for status bar if not using SafeAreaView for the whole screen
  },
  dailyScrollViewContainer: {
    height: 150, // Adjust as needed for DayCard size
    marginTop: 10,
  },
  flatListContentContainer: {
    paddingHorizontal: 8, // Padding for the start and end of the list
  },
  dayCard: {
    width: 110, // Fixed width for each day card
    height: '100%',
    padding: 10,
    marginHorizontal: 5,
    backgroundColor: '#2C2C2E', // Dark card background
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  dayNameText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  dateText: {
    fontSize: 12,
    color: '#AAAAAA',
  },
  checkboxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 10,
  },
  checkbox: {
    padding: 5,
  },
  totalMovesPlaceholder: {
    alignItems: 'center',
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#333',
    marginTop: 10,
  },
  monthlyCalendarTogglePlaceholder: {
    alignItems: 'center',
    paddingVertical: 15,
  },
  modalView: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 25 : 50, // Adjust for status bar inside modal
    backgroundColor: '#1C1C1E', // Match app theme
  },
});
