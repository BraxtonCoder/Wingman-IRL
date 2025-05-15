import React from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { OnboardingStackParamList } from '../../navigation/types';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = StackScreenProps<OnboardingStackParamList, 'Paywall'>;

const PaywallScreen = ({ navigation, route }: Props) => {
  const onboardingData = route.params?.onboardingData;

  const handleSubscription = (plan: string) => {
    console.log(`Subscribing to ${plan} plan`);
    // TODO: Implement Revenue Cat / Superwall integration
    // Simulate successful subscription
    navigation.navigate('CreateProfile', { onboardingData });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Unlock Wingman IRL</Text>
        <Text style={styles.subHeader}>Choose your plan to master the first move.</Text>

        <View style={styles.planContainer}>
          <Text style={styles.planTitle}>Monthly</Text>
          <Text style={styles.planPrice}>$4.99/month</Text>
          <Text style={styles.planDescription}>Full access to all features. Cancel anytime.</Text>
          <Button title="Choose Monthly" onPress={() => handleSubscription('monthly')} />
        </View>

        <View style={styles.planContainer}>
          <Text style={styles.planTitle}>Yearly</Text>
          <Text style={styles.planPrice}>$40/year</Text>
          <Text style={styles.planDescription}>Save 33% with annual billing! Full access to all features.</Text>
          <Button title="Choose Yearly" onPress={() => handleSubscription('yearly')} />
        </View>

        <Text style={styles.footerText}>Payment will be charged to your app store account. Subscriptions automatically renew unless auto-renew is turned off at least 24-hours before the end of the current period.</Text>
        {/* <Button title="Skip for now (Dev only)" onPress={() => navigation.navigate('CreateProfile', { onboardingData })} /> */}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  container: {
    flexGrow: 1, // For ScrollView content
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    // backgroundColor: '#1a1a1a', // Handled by safeArea
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 18,
    color: '#cccccc',
    textAlign: 'center',
    marginBottom: 30,
  },
  planContainer: {
    backgroundColor: '#2c2c2c',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    width: '90%',
    alignItems: 'center',
  },
  planTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  planPrice: {
    fontSize: 20,
    color: '#4CAF50', // A highlight color for price
    marginBottom: 8,
  },
  planDescription: {
    fontSize: 14,
    color: '#bbbbbb',
    textAlign: 'center',
    marginBottom: 15,
  },
  footerText: {
    fontSize: 12,
    color: '#aaaaaa',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default PaywallScreen; 