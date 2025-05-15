export type OnboardingData = {
  goals?: string; // Mark as optional as they are collected sequentially
  challenges?: string;
  commitment?: string | null;
};

export type OnboardingStackParamList = {
  Logo: undefined;
  // OnboardingQuestions: undefined; // Will be removed
  GoalScreen: { onboardingData?: OnboardingData }; // Starts with potentially empty/no data
  ChallengesScreen: { onboardingData: OnboardingData }; // Expects data from GoalScreen
  CommitmentScreen: { onboardingData: OnboardingData }; // Expects data from ChallengesScreen
  Auth: { onboardingData: OnboardingData }; // Expects data from CommitmentScreen
  Paywall: { onboardingData: OnboardingData };
  CreateProfile: { onboardingData: OnboardingData };
};

export type TrackingStackParamList = {
  TrackingHome: undefined; // Main TrackingScreen
  Community: undefined;
  Leaderboard: undefined;
  Pledge: undefined; // New
  Achievements: undefined; // New
};

export type MainTabParamList = {
  Tracking: TrackingStackParamList; // Nested stack
  AICoach: undefined;
  Learning: undefined;
  Profile: undefined;
};

// If AICoach, Learning, or Profile have their own sub-screens, they would also become StackParamList types.
// For now, assuming they are single screens within the tabs.

export type RootStackParamList = {
  SplashScreen: undefined; // New splash screen route
  Onboarding: undefined; // Refers to the OnboardingStack
  AppMain: undefined;    // Refers to the MainTabNavigator
}; 