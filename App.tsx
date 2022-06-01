import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {StatusBar} from 'react-native';
import TabBar from './src/components/TabBar';
import Home from './src/screens/Home';
import {LogBox} from 'react-native';
import Colors, {isDarkMode} from './src/utils/Colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ProductDetails from './src/screens/ProductDetails';
import SplashScreen from './src/screens/SplashScreen';
import Login from './src/screens/Login';
import Cart from './src/screens/Cart';
import Checkout from './src/screens/Checkout';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

const App = () => {
  const Stack = createNativeStackNavigator<StackParamList>();
  const Drawer = createDrawerNavigator<DrawerParamList>();
  const Tab = createBottomTabNavigator<TabsParamList>();

  const Drawers = () => {
    return (
      <Drawer.Navigator
        screenOptions={{
          drawerActiveBackgroundColor: Colors.SECONDARY,
          drawerActiveTintColor: Colors.PRIMARY,
          headerShown: false,
          drawerStyle: {backgroundColor: Colors.THEME_PRIMARY},
        }}>
        <Drawer.Screen
          name="Tabs"
          component={Tabs}
          options={{
            title: 'Home',
            drawerIcon: () => (
              <Icon name="home" color={Colors.PRIMARY} size={25} />
            ),
          }}
        />
      </Drawer.Navigator>
    );
  };

  const Tabs = () => {
    return (
      <Tab.Navigator
        screenOptions={() => ({
          headerShown: false,
        })}
        tabBar={props => {
          return <TabBar {...props} />;
        }}>
        <Tab.Screen
          name="Home"
          component={Home}
          initialParams={{icon: 'home'}}
        />
        <Tab.Screen
          name="Categories"
          component={Home}
          initialParams={{icon: 'category'}}
        />
        <Tab.Screen
          name="Whishlist"
          component={Home}
          initialParams={{icon: 'bookmark'}}
        />
        <Tab.Screen
          name="Account"
          component={Home}
          initialParams={{icon: 'person'}}
        />
      </Tab.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={Colors.THEME_PRIMARY}
      />
      <Stack.Navigator
        screenOptions={() => ({
          headerShown: false,
        })}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Drawer" component={Drawers} />
        <Stack.Screen name="ProductDetails" component={ProductDetails} />
        <Stack.Screen name="Cart" component={Cart} />
        <Stack.Screen name="Checkout" component={Checkout} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// const styles = StyleSheet.create({});

export default App;
