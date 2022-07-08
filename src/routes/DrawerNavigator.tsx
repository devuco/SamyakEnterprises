import React from 'react';
import {Colors} from '../utils';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PastOrders from '../screens/PastOrders';
import {createDrawerNavigator} from '@react-navigation/drawer';
import TabNavigator from './TabNavigator';

const DrawerNavigator = () => {
  const Drawer = createDrawerNavigator<DrawerParamList>();

  const drawerIcon = (focused: boolean, icon: string) => (
    <Icon
      name={icon}
      color={!focused ? Colors.THEME_TEXT : Colors.PRIMARY}
      size={25}
    />
  );

  return (
    <Drawer.Navigator
      screenOptions={{
        drawerInactiveTintColor: Colors.THEME_TEXT,
        drawerActiveBackgroundColor: Colors.SECONDARY,
        drawerActiveTintColor: Colors.PRIMARY,
        headerShown: false,
        drawerStyle: {
          backgroundColor: Colors.THEME_PRIMARY,
        },
      }}>
      <Drawer.Screen
        name="Tabs"
        component={TabNavigator}
        options={{
          title: 'Home',
          drawerIcon: ({focused}) => drawerIcon(focused, 'home'),
        }}
      />
      <Drawer.Screen
        name="PastOrders"
        component={PastOrders}
        options={{
          title: 'My Orders',
          drawerIcon: ({focused}) => drawerIcon(focused, 'local-shipping'),
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
