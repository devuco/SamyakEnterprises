import {StatusBar} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {NavigationContainerRef, StackActions} from '@react-navigation/native';
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

type Props = {
  navigationRef: NavigationContainerRef<StackParamList>;
};
const Navigator: React.FC<Props> = ({navigationRef}) => {
  const [showNetworkModal, setShowNetworkModal] = useState<boolean>(false);
  const [isScreenAnimation, setIsScreenAnimation] = useState(true);

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
        error => {
          console.log('error Api', error.response.data);
          console.log('error Axios', error);

          if (error.response.status === 401) {
            AsyncStorage.clear();
            navigationRef.dispatch(StackActions.replace('Login'));
          }

          NetInfo.fetch().then(
            state => !state.isWifiEnabled && setShowNetworkModal(true),
          );
          return Promise.reject(error);
        },
      );
    },
    [navigationRef],
  );

  useEffect(() => {
    checkNetwork(false);
  }, [checkNetwork]);

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
          options={() => ({
            animation: 'fade',
          })}
        />
        <Stack.Screen
          name="Drawer"
          component={DrawerNavigator}
          options={() => ({
            animation: 'fade',
          })}
        />
        <Stack.Screen name="ProductDetails" component={ProductDetails} />
        <Stack.Screen name="Cart" component={Cart} />
        <Stack.Screen name="Checkout" component={Checkout} />
        <Stack.Screen name="OrderPlaced" component={OrderPlaced} />
      </Stack.Navigator>
      <NetworkModal
        isVisible={showNetworkModal}
        onCancel={() => setShowNetworkModal(false)}
        onRetry={() => checkNetwork(true)}
      />
    </>
  );
};

export default Navigator;
