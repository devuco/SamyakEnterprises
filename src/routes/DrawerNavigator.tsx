import React from 'react';
import {Colors} from '../utils';
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import TabNavigator from './TabNavigator';
import CustomDrawer from '../components/CustomDrawer';

const DrawerNavigator = () => {
  const Drawer = createDrawerNavigator<DrawerParamList>();

  const customDrawer = (props: DrawerContentComponentProps) => {
    return <CustomDrawer {...props} />;
  };
  return (
    <Drawer.Navigator
      drawerContent={customDrawer}
      screenOptions={{
        drawerInactiveTintColor: Colors.THEME_TEXT,
        drawerActiveBackgroundColor: Colors.SECONDARY,
        drawerActiveTintColor: Colors.PRIMARY,
        headerShown: false,
        drawerStyle: {backgroundColor: Colors.THEME_PRIMARY},
      }}>
      <Drawer.Screen name="Tabs" component={TabNavigator} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
