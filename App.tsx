import {
  createNavigationContainerRef,
  NavigationContainer,
} from '@react-navigation/native';
import React from 'react';
import {LogBox} from 'react-native';
import Navigator from './src/routes/Navigator';

LogBox.ignoreAllLogs();
export const navigationRef = createNavigationContainerRef<StackParamList>();

navigationRef.current?.dispatch;

const App = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Navigator navigationRef={navigationRef} />
    </NavigationContainer>
  );
};

export default App;
