import React from 'react';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Colors} from '../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const CustomDrawer = (props: DrawerContentComponentProps) => {
  const {index} = props.state;

  const drawerIcon = (focused: boolean, icon: string) => {
    return (
      <Icon
        name={icon}
        color={!focused ? Colors.THEME_TEXT : Colors.WHITE}
        size={25}
      />
    );
  };

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem
        label="Home"
        onPress={() => props.navigation.navigate('Tabs')}
        icon={({focused}) => drawerIcon(focused, 'home')}
        style={index === 0 ? {backgroundColor: Colors.PRIMARY} : {}}
        labelStyle={index === 0 ? {color: Colors.WHITE} : {}}
        focused={true}
      />
      <DrawerItem
        label="My Orders"
        onPress={() => {
          props.navigation.navigate('MyOrders');
          props.navigation.closeDrawer();
        }}
        icon={({focused}) => drawerIcon(focused, 'local-shipping')}
      />
      <DrawerItem
        label="Logout"
        onPress={async () => {
          AsyncStorage.clear();
          const googleSignedIn = await GoogleSignin.isSignedIn();
          if (googleSignedIn) {
            await GoogleSignin.signOut();
          }
          // props.navigation.navigate('Login');
          props.navigation.reset({index: 0, routes: [{name: 'Login'}]});
          props.navigation.closeDrawer();
        }}
        icon={({focused}) => drawerIcon(focused, 'logout')}
      />
    </DrawerContentScrollView>
  );
};

export default CustomDrawer;
