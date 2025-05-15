import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { TrackingStackParamList } from '../../navigation/types';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Calendar, DateData, LocaleConfig } from 'react-native-calendars';
import { SafeAreaView } from 'react-native-safe-area-context';

// LocaleConfig setup (assuming it's correctly placed and you want to keep it)
// If not, this block can be removed if default locale is fine.
LocaleConfig.locales['en'] = {
  monthNames: ['January','February','March','April','May','June','July','August','September','October','November','December'],
  monthNamesShort: ['Jan.','Feb.','Mar.','Apr.','May','Jun.','Jul.','Aug.','Sep.','Oct.','Nov.','Dec.'],
  dayNames: ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
  dayNamesShort: ['Sun.','Mon.','Tue.','Wed.','Thu.','Fri.','Sat.'],
  today: 'Today'
};
LocaleConfig.defaultLocale = 'en';

const GrowthTree = ({ dailyProgress }: { dailyProgress: number }) => {
  const growthStage = Math.floor(dailyProgress * (100 / 3)); 
  return (
    <View style={styles.treeContainer}>
      <Text style={styles.treeText}>[Tree: Stage {growthStage > 0 ? growthStage : 'X'}]</Text>
      {dailyProgress > 0 && <Text style={styles.treeFeedback}>Growing!</Text>}
    </View>
  );
};

type TrackingScreenNavigationProp = StackNavigationProp<
  TrackingStackParamList,
  'TrackingHome'
>;

interface Props {
  navigation: TrackingScreenNavigationProp;
}

const TrackingScreen = ({ navigation }: Props) => {
  const [firstMoveCount, setFirstMoveCount] = useState(0);
  const [userPledge, setUserPledge] = useState("I commit to making the first move daily.");
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [check3, setCheck3] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [markedDates, setMarkedDates] = useState<{[date: string]: any}>({});

  const dailyChecksCompleted = [check1, check2, check3].filter(Boolean).length;

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setMarkedDates({
      [today]: { selected: true, selectedColor: '#007bff', disableTouchEvent: true }, 
      // Example: '2024-07-20': { marked: true, dotColor: '#4CAF50' }
    });
    // TODO: Load actual check states for `today` or `selectedDate` from Firestore
  }, []);

  const handleCheckToggle = (checkNumber: number) => {
    let currentCheckState = false;
    if (checkNumber === 1) currentCheckState = check1;
    else if (checkNumber === 2) currentCheckState = check2;
    else if (checkNumber === 3) currentCheckState = check3;

    if (checkNumber === 1) setCheck1(!check1);
    else if (checkNumber === 2) setCheck2(!check2);
    else if (checkNumber === 3) setCheck3(!check3);
    
    // TODO: Update Firestore with the new check states for the selectedDate
    // TODO: Update firstMoveCount logic based on persisted data and new moves
  };

  const onDayPress = (day: DateData) => {
    setSelectedDate(day.dateString);
    setMarkedDates(prev => ({
      // Clear previous selections by iterating and setting selected to false
      ...Object.fromEntries(Object.entries(prev).map(([key, val]) => [key, {...val, selected: false}])) as any,
      // Mark the new day as selected
      [day.dateString]: { 
        ...(prev[day.dateString] || {}), // Preserve other markings like dots
        selected: true, 
        selectedColor: '#007bff', 
        disableTouchEvent: true 
      },
    }));
    // TODO: Load check states for the newly selected day.dateString from Firestore
    // For now, checkboxes reflect a global state, not per-date state.
  };
  
  const CheckboxItem = ({ label, checked, onPress }: { label: string, checked: boolean, onPress: () => void }) => (
    <TouchableOpacity onPress={onPress} style={styles.checkboxItemContainer}>
      <Ionicons name={checked ? 'checkbox' : 'square-outline'} size={24} color={checked ? '#4CAF50' : '#cccccc'} />
      <Text style={[styles.checkboxLabel, checked && styles.checkboxLabelChecked]}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.pageContainer}>
        <Text style={styles.pledgeText} numberOfLines={1} ellipsizeMode="tail">{userPledge}</Text>

        <GrowthTree dailyProgress={dailyChecksCompleted} />

        <View style={styles.trackingSection}>
          <Text style={styles.trackingTitle}>Moves for {selectedDate === new Date().toISOString().split('T')[0] ? 'Today' : selectedDate}</Text>
          <View style={styles.checkboxesRow}>
            <CheckboxItem label="1st" checked={check1} onPress={() => handleCheckToggle(1)} />
            <CheckboxItem label="2nd" checked={check2} onPress={() => handleCheckToggle(2)} />
            <CheckboxItem label="3rd" checked={check3} onPress={() => handleCheckToggle(3)} />
          </View>
        </View>

        <Text style={styles.totalCountText}>Total Moves: {firstMoveCount}</Text>

        <View style={styles.calendarContainer}>
          <Calendar
            current={selectedDate}
            onDayPress={onDayPress}
            markedDates={markedDates}
            monthFormat={'MMMM yyyy'}
            theme={calendarTheme}
            firstDay={1}
            hideExtraDays={true}
            enableSwipeMonths={true}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const calendarTheme = {
  backgroundColor: '#1a1a1a',
  calendarBackground: '#2c2c2c',
  textSectionTitleColor: '#b6c1cd',
  selectedDayBackgroundColor: '#007bff',
  selectedDayTextColor: '#ffffff',
  todayTextColor: '#00adf5', // Make today stand out
  dayTextColor: '#e0e0e0', // Brighter day text
  textDisabledColor: '#777', // Slightly lighter disabled text
  dotColor: '#4CAF50',
  selectedDotColor: '#ffffff',
  arrowColor: '#007bff',
  monthTextColor: '#ffffff',
  textDayFontWeight: '400' as '400',
  textMonthFontWeight: 'bold' as 'bold',
  textDayHeaderFontWeight: '400' as '400',
  textDayFontSize: 13,    // Slightly smaller day numbers
  textMonthFontSize: 15,  // Slightly smaller month title
  textDayHeaderFontSize: 11,// Slightly smaller day headers (Mon, Tue)
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  pageContainer: { 
    flex: 1,
    paddingHorizontal: 8, 
    paddingTop: 0,
    paddingBottom: 5,
  },
  pledgeText: {
    fontSize: 13, 
    color: '#e0e0e0',
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: 4, 
    paddingHorizontal: 10, 
    flexShrink: 1,
    marginTop: 4,
  },
  treeContainer: {
    height: 65, 
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333', 
    borderRadius: 8,
    marginBottom: 4, 
    padding: 4, 
    flexShrink: 1,
  },
  treeText: {
    color: '#ffffff',
    fontSize: 13, 
    textAlign: 'center',
  },
  treeFeedback: {
    color: '#5cb85c', // Brighter green
    fontSize: 11, 
    marginTop: 3,
  },
  trackingSection: {
    backgroundColor: '#333',
    borderRadius: 8,
    paddingVertical: 6, 
    paddingHorizontal: 8,
    marginBottom: 4, 
    flexShrink: 1,
  },
  trackingTitle: {
    fontSize: 15, 
    fontWeight: '600', // Slightly less bold
    color: '#ffffff',
    marginBottom: 6, 
    textAlign: 'center',
  },
  checkboxesRow: { 
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  checkboxItemContainer: { 
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  checkboxLabel: {
    fontSize: 11, // Slightly smaller
    color: '#cccccc',
    marginTop: 2, 
  },
  checkboxLabelChecked: {
    color: '#5cb85c',
  },
  totalCountText: {
    fontSize: 13, 
    fontWeight: '600',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 4, 
    flexShrink: 1,
  },
  calendarContainer: {
    flex: 1, 
    minHeight: 265, // Slightly reduced minHeight
    backgroundColor: '#2c2c2c', 
    borderRadius: 8,
  },
});

export default TrackingScreen; 