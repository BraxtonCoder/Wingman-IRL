import React from 'react';
import RootNavigator from '../navigation/RootNavigator';

// This file serves as the entry point for Expo Router.
// By rendering RootNavigator here, we are essentially handing over
// the entire navigation control to our React Navigation setup.

const AppLayout = () => {
  // You can add global providers (like ThemeProvider, Font loading checks) here if needed,
  // wrapping the RootNavigator.
  return <RootNavigator />;
};

export default AppLayout;
