import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {StatusBar, StyleSheet, useColorScheme} from 'react-native';
import TabBar from './src/routes/TabBar';
import Home from './src/screens/Home';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
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
          name="Services"
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
        <Stack.Screen name="Tabs" component={Tabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default App;
