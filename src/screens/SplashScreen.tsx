import {StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import Axios from '../service/Axios';
import {Colors, Singleton} from '../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

const SplashScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  useEffect(() => {
    AsyncStorage.getItem('token').then(token => {
      if (token !== null) {
        Axios.defaults.headers.common.token = token;
        AsyncStorage.getItem('name').then(name =>
          AsyncStorage.getItem('email').then(email => {
            Singleton.NAME = name;
            Singleton.EMAIL = email;
            navigation.replace('Drawer');
          }),
        );
      } else {
        navigation.replace('Login');
      }
    });
  }, [navigation]);

  return (
    <View style={styles.parent}>
      {/* <Image source={Images.LOGO} style={styles.logo} /> */}
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
