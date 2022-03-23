import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {Api} from '../service/Api';
import Singleton from '../utils/Singleton';
import Axios from '../service/Axios';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    Api.getToken()
      .then(response => {
        Axios.defaults.headers.common['token'] = response.data.token;
        // Singleton.token = response.data.token;
        navigation.navigate('Drawer');
      })
      .catch(err => {
        console.log('ss error', err.response.data);
      });
  }, []);
  return (
    <View>
      <Text>SplashScreen</Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({});
