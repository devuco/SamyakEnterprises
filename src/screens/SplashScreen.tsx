import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {Api} from '../service/Api';
import Axios from '../service/Axios';
import {Colors, Images} from '../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      AsyncStorage.getItem('token').then(token => {
        if (token !== null) {
          Axios.defaults.headers.common['token'] = token;
          navigation.replace('Drawer');
        } else {
          navigation.replace('Login');
        }
      });
    }, 1000);
  }, []);
  return (
    <View style={styles.parent}>
      <Image source={Images.LOGO} style={styles.logo} />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  parent: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: Colors.THEME_PRIMARY,
  },
  logo: {width: 300, height: 300, resizeMode: 'cover'},
});
