import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {StatusBar, StyleSheet, useColorScheme} from 'react-native';
import TabBar from './src/routes/TabBar';
import Home from './src/screens/Home';
import {LogBox} from 'react-native';
import Colors from './src/utils/Colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ProductDetails from './src/screens/ProductDetails';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  const Drawer = createDrawerNavigator();

  const Drawers = () => {
    return (
      <Drawer.Navigator
        screenOptions={{
          drawerActiveBackgroundColor: Colors.SECONDARY,
          drawerActiveTintColor: Colors.PRIMARY,
        }}>
        <Drawer.Screen
          name="Tabs"
          component={Tabs}
          options={{
            title: 'Home',
            drawerIcon: ({focused}) => (
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
        screenOptions={() => ({headerShown: false})}
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
          initialParams={{icon: 'favorite'}}
        />
        <Tab.Screen
          name="Service"
          component={Home}
          initialParams={{icon: 'handyman'}}
        />
      </Tab.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Stack.Navigator screenOptions={() => ({headerShown: false})}>
        <Stack.Screen name="Drawer" component={Drawers} />
        <Stack.Screen name="ProductDetails" component={ProductDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default App;
