import React from 'react';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import TabBar from '../components/TabBar';
import Home from '../screens/Home';

const TabNavigator = () => {
  const Tab = createBottomTabNavigator<TabsParamList>();

  const tabBar = (props: BottomTabBarProps) => <TabBar {...props} />;

  return (
    <Tab.Navigator
      screenOptions={() => ({
        headerShown: false,
      })}
      tabBar={tabBar}>
      <Tab.Screen name="Home" component={Home} initialParams={{icon: 'home'}} />
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

export default TabNavigator;
