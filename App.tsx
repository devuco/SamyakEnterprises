import {
  createNavigationContainerRef,
  NavigationContainer,
} from '@react-navigation/native';
import React from 'react';
import {LogBox} from 'react-native';
import Navigator from './src/routes/Navigator';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {RecoilRoot} from 'recoil';

LogBox.ignoreAllLogs();
export const navigationRef = createNavigationContainerRef<StackParamList>();

navigationRef.current?.dispatch;
GoogleSignin.configure({
  webClientId:
    '26783120564-et48irc4ptbeubls6i24q9vbsclcfjti.apps.googleusercontent.com',
  iosClientId:
    '26783120564-91fb2af6b6fc3uqg4opd7s60aa65dnua.apps.googleusercontent.com',
});

const App = () => {
  return (
    <RecoilRoot>
      <NavigationContainer ref={navigationRef}>
        <Navigator navigationRef={navigationRef} />
      </NavigationContainer>
    </RecoilRoot>
  );
};

export default App;
