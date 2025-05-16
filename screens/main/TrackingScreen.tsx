import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { TrackingStackParamList } from '../../navigation/types';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Calendar, DateData, LocaleConfig } from 'react-native-calendars';

// Define the possible states for a check item
type CheckState = null | 'success' | 'redirection';

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
  
  // Updated check states
  const [check1, setCheck1] = useState<CheckState>(null);
  const [check2, setCheck2] = useState<CheckState>(null);
  const [check3, setCheck3] = useState<CheckState>(null);
  
  const [nextCheckIndex, setNextCheckIndex] = useState(0); // 0 for check1, 1 for check2, 2 for check3

  const [selectedDate, setSelectedDate] = useState<string>('');
  const [markedDates, setMarkedDates] = useState<{[date: string]: any}>({});

  // Calculate daily success based on 'success' state
  const dailySuccesses = [check1, check2, check3].filter(status => status === 'success').length;

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setSelectedDate(today);
    setMarkedDates(prev => ({
      ...prev,
      [today]: { 
        ...(prev[today] || {}), 
        selected: true, 
        selectedColor: '#ffffff', 
        disableTouchEvent: true 
      }
    }));
    // TODO: Load actual check states (null, 'success', 'redirection') and nextCheckIndex for `today` or `selectedDate` from Firestore
    // For now, we reset on component mount, assuming it's for 'today'
    setCheck1(null);
    setCheck2(null);
    setCheck3(null);
    setNextCheckIndex(0);
  }, []);

  useEffect(() => {
    if (!selectedDate) return;

    setMarkedDates(prevMarkedDates => {
      const newMarkedDates = { ...prevMarkedDates };
      const dayMarking = { ...(newMarkedDates[selectedDate] || {}) };

      dayMarking.selected = true;
      dayMarking.selectedColor = '#ffffff';
      dayMarking.disableTouchEvent = true;

      // Green dot for 3 SUCCESSES
      if (dailySuccesses === 3) {
        dayMarking.marked = true;
        dayMarking.dotColor = '#4CAF50';
      } else {
        if (dayMarking.dotColor === '#4CAF50') {
          delete dayMarking.dotColor;
          dayMarking.marked = false; 
        }
      }
      
      newMarkedDates[selectedDate] = dayMarking;
      return newMarkedDates;
    });
  }, [dailySuccesses, selectedDate]);

  const updateCheckState = (status: 'success' | 'redirection') => {
    if (nextCheckIndex >= 3) return; // All checks done for the day

    const newCheckStates: CheckState[] = [check1, check2, check3];
    newCheckStates[nextCheckIndex] = status;

    if (nextCheckIndex === 0) setCheck1(status);
    else if (nextCheckIndex === 1) setCheck2(status);
    else if (nextCheckIndex === 2) setCheck3(status);

    if (status === 'success') {
      setFirstMoveCount(prevCount => prevCount + 1);
      // TODO: Update Firestore with the new check states and firstMoveCount
    } else {
      // TODO: Update Firestore with 'redirection' state
    }
    setNextCheckIndex(prevIndex => prevIndex + 1);
  };

  const handleSuccessPress = () => {
    updateCheckState('success');
  };

  const handleRedirectionPress = () => {
    updateCheckState('redirection');
  };

  const handleCheckboxReset = (checkIndexToReset: number) => {
    let currentStatus: CheckState = null;
    if (checkIndexToReset === 0) currentStatus = check1;
    else if (checkIndexToReset === 1) currentStatus = check2;
    else if (checkIndexToReset === 2) currentStatus = check3;

    // Only proceed if the box was actually filled (not null)
    if (currentStatus !== null) {
      if (currentStatus === 'success') {
        setFirstMoveCount(prevCount => Math.max(0, prevCount - 1)); // Ensure count doesn't go below 0
      }

      if (checkIndexToReset === 0) setCheck1(null);
      else if (checkIndexToReset === 1) setCheck2(null);
      else if (checkIndexToReset === 2) setCheck3(null);
      
      // IMPORTANT: Set nextCheckIndex to the reset checkbox index
      // so the Success/Redirection buttons target this box next.
      setNextCheckIndex(checkIndexToReset);

      // TODO: Update Firestore with the reset state, adjusted firstMoveCount, and new nextCheckIndex
    }
    // If currentStatus was already null, tapping it does nothing.
  };

  const onDayPress = (day: DateData) => {
    const newSelectedDate = day.dateString;
    setSelectedDate(newSelectedDate);

    // Reset checks for the new day - Placeholder for loading data from Firestore
    setCheck1(null);
    setCheck2(null);
    setCheck3(null);
    setNextCheckIndex(0);
    // TODO: Load check states (null, 'success', 'redirection') and nextCheckIndex for newSelectedDate from Firestore.

    setMarkedDates(prev => {
      const updatedMarks = { ...prev };
      Object.keys(updatedMarks).forEach(dateKey => {
        if (updatedMarks[dateKey]?.selected && dateKey !== newSelectedDate) {
          const {selected, selectedColor, ...rest} = updatedMarks[dateKey];
          updatedMarks[dateKey] = rest;
        }
      });
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
  
  // Updated CheckboxItem to display status and handle reset onPress
  const CheckboxItem = ({ status, onPress }: { status: CheckState, onPress: () => void }) => {
    let iconName: keyof typeof Ionicons.glyphMap = 'ellipse-outline';
    let iconColor = '#cccccc';

    if (status === 'success') {
      iconName = 'checkmark-circle';
      iconColor = '#4CAF50'; // Green for success
    } else if (status === 'redirection') {
      iconName = 'close-circle-outline'; 
      iconColor = '#FF9500'; 
    }

    return (
      <TouchableOpacity onPress={onPress} style={styles.checkboxItemContainer}>
        <Ionicons name={iconName} size={30} color={iconColor} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.screenContainer}>
      <View style={styles.pageContainer}>
        <Text style={styles.pledgeText} numberOfLines={1} ellipsizeMode="tail">{userPledge}</Text>

        <GrowthTree totalMoves={firstMoveCount} dailyChecksCompleted={dailySuccesses} />

        <View style={styles.trackingSection}>
          <ProgressBar progress={dailySuccesses} />
          <Text style={styles.trackingTitle}>Moves for {selectedDate === new Date().toISOString().split('T')[0] ? 'Today' : selectedDate}</Text>
          <View style={styles.checkboxesRow}>
            <CheckboxItem status={check1} onPress={() => handleCheckboxReset(0)} />
            <CheckboxItem status={check2} onPress={() => handleCheckboxReset(1)} />
            <CheckboxItem status={check3} onPress={() => handleCheckboxReset(2)} />
          </View>
          <View style={styles.actionButtonsRow}>
            <TouchableOpacity 
              style={[styles.actionButton, styles.successButton]} 
              onPress={handleSuccessPress}
              disabled={nextCheckIndex >= 3}
            >
              <Text style={styles.actionButtonText}>Success</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.actionButton, styles.redirectionButton]} 
              onPress={handleRedirectionPress}
              disabled={nextCheckIndex >= 3}
            >
              <Text style={styles.actionButtonText}>Redirection</Text>
            </TouchableOpacity>
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
    marginBottom: 15, // Added margin to separate checkboxes from new buttons
  },
  checkboxItemContainer: { 
    alignItems: 'center',
    paddingHorizontal: 4,
    minWidth: 40, // Added to give icons some breathing room
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
  actionButtonsRow: { // New style for the row of action buttons
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginHorizontal: 5, // Give some horizontal margin
  },
  actionButton: { // New style for individual action buttons
    flex: 1, // Make buttons take equal width
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5, // Space between buttons
  },
  successButton: { // Specific style for success button
    backgroundColor: '#4CAF50', // Green
  },
  redirectionButton: { // Specific style for redirection button
    backgroundColor: '#FF9500', // Orange
  },
  actionButtonText: { // Style for text inside action buttons
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TrackingScreen; 