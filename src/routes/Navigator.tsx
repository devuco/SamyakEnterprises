import {StatusBar} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  NavigationContainerRef,
  StackActions,
  CommonActions,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NetworkModal from '../components/NetworkModal';
import Cart from '../screens/Cart';
import Checkout from '../screens/Checkout';
import Login from '../screens/Login';
import OrderPlaced from '../screens/OrderPlaced';
import ProductDetails from '../screens/ProductDetails';
import SplashScreen from '../screens/SplashScreen';
import {isDarkMode, Colors} from '../utils';
import DrawerNavigator from './DrawerNavigator';
import Axios from '../service/Axios';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyOrders from '../screens/MyOrders';
import OrderedProducts from '../screens/OrderedProducts';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import SessionExpiredModal from '../components/SessionExpiredModal';
import OTP from '../screens/OTP';

type Props = {
  navigationRef: NavigationContainerRef<StackParamList>;
};
const Navigator: React.FC<Props> = ({navigationRef}) => {
  const [showNetworkModal, setShowNetworkModal] = useState<boolean>(false);
  const [isScreenAnimation, setIsScreenAnimation] = useState<boolean>(true);
  const [isSessionExpiredModalVisible, setIsSessionExpiredModalVisible] =
    useState<boolean>(false);

  const Stack = createNativeStackNavigator<StackParamList>();

  const checkNetwork = useCallback(
    (isRetryPressed: boolean) => {
      if (isRetryPressed) {
        setIsScreenAnimation(false);
        setShowNetworkModal(false);
        const currentScreen = navigationRef.getCurrentRoute();
        let {name, params} = currentScreen ?? {name: ''};
        name = name === 'Home' ? 'Drawer' : name;
        navigationRef.dispatch(StackActions.replace(name, params));
      }

      Axios.interceptors.response.use(
        response => {
          setIsScreenAnimation(true);
          return response;
        },
        async error => {
          console.log('error Api', error.response.data);
          console.log('error Axios', error);

          if (error.response.status === 401) {
            AsyncStorage.clear();
            const googleSignedIn = await GoogleSignin.isSignedIn();
            if (googleSignedIn) {
              await GoogleSignin.signOut();
            }
            setIsSessionExpiredModalVisible(true);
            return Promise.reject(error);
          }

          NetInfo.fetch().then(
            state => !state.isConnected && setShowNetworkModal(true),
          );
          return Promise.reject(error);
        },
      );
    },
    [navigationRef],
  );

  useEffect(() => checkNetwork(false), [checkNetwork]);

  const onSessionExpiredPress = () => {
    setIsSessionExpiredModalVisible(false);

    navigationRef.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'Login'}],
      }),
    );
  };

  return (
    <>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={Colors.THEME_PRIMARY}
      />
      <Stack.Navigator
        screenOptions={() => ({
          headerShown: false,
          animation: !isScreenAnimation ? 'none' : 'slide_from_right',
        })}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen
          name="Login"
          component={Login}
          options={() => ({animation: 'fade'})}
        />
        <Stack.Screen
          name="OTP"
          component={OTP}
          options={() => ({animation: 'slide_from_bottom'})}
        />

        <Stack.Screen
          name="Drawer"
          component={DrawerNavigator}
          options={() => ({animation: 'fade'})}
        />
        <Stack.Screen name="ProductDetails" component={ProductDetails} />
        <Stack.Screen name="Cart" component={Cart} />
        <Stack.Screen name="Checkout" component={Checkout} />
        <Stack.Screen name="OrderPlaced" component={OrderPlaced} />
        <Stack.Screen name="MyOrders" component={MyOrders} />
        <Stack.Screen name="OrderedProducts" component={OrderedProducts} />
      </Stack.Navigator>
      <NetworkModal
        isVisible={showNetworkModal}
        onCancel={() => setShowNetworkModal(false)}
        onRetry={() => checkNetwork(true)}
      />
      <SessionExpiredModal
        onPress={onSessionExpiredPress}
        isVisible={isSessionExpiredModalVisible}
      />
    </>
  );
};

export default Navigator;
