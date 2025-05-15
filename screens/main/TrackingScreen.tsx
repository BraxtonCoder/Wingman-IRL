import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { TrackingStackParamList } from '../../navigation/types';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Calendar, DateData, LocaleConfig } from 'react-native-calendars';

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

const imageSources = [
  require('@/assets/images/growth_tree/tree_stage_0.png'),
  require('@/assets/images/growth_tree/tree_stage_1.png'),
  require('@/assets/images/growth_tree/tree_stage_2.png'),
  require('@/assets/images/growth_tree/tree_stage_3.png'),
  require('@/assets/images/growth_tree/tree_stage_4.png'),
  require('@/assets/images/growth_tree/tree_stage_5.png'),
  require('@/assets/images/growth_tree/tree_stage_6.png'),
  require('@/assets/images/growth_tree/tree_stage_7.png'),
  require('@/assets/images/growth_tree/tree_stage_8.png'),
  require('@/assets/images/growth_tree/tree_stage_9.png'),
  require('@/assets/images/growth_tree/tree_stage_10.png'),
  require('@/assets/images/growth_tree/tree_stage_11.png'),
  require('@/assets/images/growth_tree/tree_stage_12.png'),
  require('@/assets/images/growth_tree/tree_stage_13.png'),
];

const stageNames = [
  "Seed (Stage 0/13)",
  "Sprout (Stage 1/13)",
  "Seedling (Stage 2/13)",
  "Small Plant (Stage 3/13)",
  "Growing Plant (Stage 4/13)",
  "Young Tree (Stage 5/13)",
  "Medium Tree (Stage 6/13)",
  "Mature Tree (Stage 7/13)",
  "Large Tree (Stage 8/13)",
  "Flowering Tree (Stage 9/13)",
  "Early Fruit Tree (Stage 10/13)", // Adjusted names for more stages
  "Fruitful Tree (Stage 11/13)",
  "Abundant Tree (Stage 12/13)",
  "Legendary Tree (Stage 13/13)!",
];

const GrowthTree = ({ totalMoves, dailyChecksCompleted }: { totalMoves: number, dailyChecksCompleted: number }) => {
  // Determine tree stage based on total moves, capping at 13
  // Assuming 1 move = 1 stage progression for simplicity up to stage 13
  const currentStage = Math.min(Math.max(0, totalMoves), 13);

  const stageName = stageNames[currentStage] || "Unknown Stage";
  const currentImageSource = imageSources[currentStage];

  return (
    <View style={styles.treeContainer}>
      {currentImageSource && <Image source={currentImageSource} style={styles.treeImage} resizeMode="contain" />}
      <Text style={styles.treeText}>{stageName}</Text>
      {dailyChecksCompleted > 0 && <Text style={styles.treeFeedback}>Growing today!</Text>}
      {totalMoves > 0 && currentStage < 13 && <Text style={styles.treeProgressText}>Total Moves: {totalMoves}</Text>}
    </View>
  );
};

const ProgressBar = ({ progress }: { progress: number }) => {
  const progressPercent = Math.min((progress / 3) * 100, 100); // Cap at 100%
  return (
    <View style={styles.progressBarContainer}>
      <View style={[styles.progressBarInner, { width: `${progressPercent}%` }]} />
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
  const [selectedDate, setSelectedDate] = useState<string>(''); // Initialize as empty, will be set in useEffect
  const [markedDates, setMarkedDates] = useState<{[date: string]: any}>({});

  const dailyChecksCompleted = [check1, check2, check3].filter(Boolean).length;

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setSelectedDate(today);
    // Initial marking for today - will be further processed by the next useEffect
    setMarkedDates(prev => ({
      ...prev,
      [today]: { 
        ...(prev[today] || {}), 
        selected: true, 
        selectedColor: '#ffffff', 
        disableTouchEvent: true 
      }
    }));
    // TODO: Load actual check states for `today` or `selectedDate` from Firestore
  }, []);

  useEffect(() => {
    if (!selectedDate) return;

    setMarkedDates(prevMarkedDates => {
      const newMarkedDates = { ...prevMarkedDates };
      // Make a mutable copy of the specific day's marking or initialize if not present
      const dayMarking = { ...(newMarkedDates[selectedDate] || {}) };

      // Always ensure the currently selected date has selection styling
      dayMarking.selected = true;
      dayMarking.selectedColor = '#ffffff'; // Standard selection color
      dayMarking.disableTouchEvent = true;

      // Handle completion-specific marking (green dot)
      if (dailyChecksCompleted === 3) {
        dayMarking.marked = true; // This flag tells the calendar to look for dot/custom marking
        dayMarking.dotColor = '#4CAF50'; // Our specific green dot
      } else {
        // Not completed (0, 1, or 2 checks)
        // If it was previously marked as complete (had our green dot)
        if (dayMarking.dotColor === '#4CAF50') {
          delete dayMarking.dotColor; // Remove our specific dot color
          // If 'marked' was true because of our dot, set it to false.
          // This prevents a default dot if 'marked' remains true without a dotColor.
          dayMarking.marked = false; 
        }
      }
      
      newMarkedDates[selectedDate] = dayMarking; // Update the map with the modified day marking
      return newMarkedDates;
    });
  }, [dailyChecksCompleted, selectedDate]);

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
    const newSelectedDate = day.dateString;
    setSelectedDate(newSelectedDate); // Update selectedDate first

    // TODO: Load check states for the newly selected newSelectedDate from Firestore.
    // For now, the global check states and dailyChecksCompleted will apply.
    // Example: if (checksAreDateSpecific) { setCheck1(loadedChecks[0]); ... }

    setMarkedDates(prev => {
      const updatedMarks = { ...prev };
      
      // Deselect previously selected day by removing 'selected' and 'selectedColor'
      // Keep other properties like 'dotColor' or 'marked'
      Object.keys(updatedMarks).forEach(dateKey => {
        if (updatedMarks[dateKey]?.selected && dateKey !== newSelectedDate) {
          // updatedMarks[dateKey].selected = false;
          // delete updatedMarks[dateKey].selectedColor; 
          // A simpler way: create a new object without selection properties
          const {selected, selectedColor, ...rest} = updatedMarks[dateKey];
          updatedMarks[dateKey] = rest;

        }
      });
      
      // Mark the new day as selected, preserving other properties like completion dot
      const currentMarkingForNewDay = updatedMarks[newSelectedDate] || {};
      updatedMarks[newSelectedDate] = {
        ...currentMarkingForNewDay,
        selected: true,
        selectedColor: '#ffffff',
        disableTouchEvent: true,
      };
      return updatedMarks;
    });
  };
  
  const CheckboxItem = ({ label, checked, onPress }: { label: string, checked: boolean, onPress: () => void }) => (
    <TouchableOpacity onPress={onPress} style={styles.checkboxItemContainer}>
      <Ionicons name={checked ? 'checkbox' : 'square-outline'} size={24} color={checked ? '#4CAF50' : '#cccccc'} />
      <Text style={[styles.checkboxLabel, checked && styles.checkboxLabelChecked]}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.screenContainer}>
      <View style={styles.pageContainer}>
        <Text style={styles.pledgeText} numberOfLines={1} ellipsizeMode="tail">{userPledge}</Text>

        <GrowthTree totalMoves={firstMoveCount} dailyChecksCompleted={dailyChecksCompleted} />

        <View style={styles.trackingSection}>
          <ProgressBar progress={dailyChecksCompleted} />
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
    </View>
  );
};

const calendarTheme = {
  backgroundColor: '#1a1a1a',
  calendarBackground: '#2c2c2c',
  textSectionTitleColor: '#b6c1cd',
  selectedDayBackgroundColor: '#ffffff',
  selectedDayTextColor: '#000000', // Changed to black for better contrast on white
  todayTextColor: '#00adf5', 
  dayTextColor: '#e0e0e0', 
  textDisabledColor: '#777', 
  dotColor: '#4CAF50',
  selectedDotColor: '#000000', // Changed to black for better contrast on white
  arrowColor: '#ffffff',
  monthTextColor: '#ffffff',
  textDayFontWeight: '400' as '400',
  textMonthFontWeight: 'bold' as 'bold',
  textDayHeaderFontWeight: '400' as '400',
  textDayFontSize: 13,    // Slightly smaller day numbers
  textMonthFontSize: 15,  // Slightly smaller month title
  textDayHeaderFontSize: 11,// Slightly smaller day headers (Mon, Tue)
};

const styles = StyleSheet.create({
  screenContainer: {
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
    height: 150, // Increased height to accommodate image + text
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333', 
    borderRadius: 8,
    marginBottom: 4, 
    padding: 4, 
    flexShrink: 1,
  },
  treeImage: { // New style for the tree image
    width: 80, // Adjust as needed
    height: 80, // Adjust as needed
    marginBottom: 5, // Space between image and text
  },
  treeText: {
    color: '#ffffff',
    fontSize: 13, 
    textAlign: 'center',
    marginBottom: 3, // Add some space if there's other text below
  },
  treeFeedback: {
    color: '#5cb85c', // Brighter green
    fontSize: 11, 
    marginTop: 3,
    textAlign: 'center',
  },
  treeProgressText: { // New style for total moves text in the tree
    color: '#b0b0b0',
    fontSize: 10,
    marginTop: 2,
    textAlign: 'center',
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
  progressBarContainer: {
    height: 10,
    backgroundColor: '#555',
    borderRadius: 5,
    marginHorizontal: 10,
    marginBottom: 10, // Increased space before the title
  },
  progressBarInner: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 5,
  },
});

export default TrackingScreen; 