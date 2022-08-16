import React from 'react';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import TabBar from '../components/TabBar';
import Home from '../screens/Home';
import Wishlist from '../screens/Wishlist';
import Companies from '../screens/Companies';

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
        name="Brands"
        component={Companies}
        initialParams={{icon: 'local-offer'}}
      />
      <Tab.Screen
        name="Whishlist"
        component={Wishlist}
        initialParams={{icon: 'bookmark'}}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
