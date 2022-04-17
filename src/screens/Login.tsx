import {Image, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useRef, useState} from 'react';
import {Colors, Images} from '../utils';
import SButton from '../components/SButton';
import {Api} from '../service/Api';
import Axios from '../service/Axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const passwordRef = useRef(null);

  const callAPI = () => {
    const body = {email, password};
    Api.login(body)
      .then(response => {
        if (response.data.success) {
          Axios.defaults.headers.common['userId'] = response.data.data._id;
          AsyncStorage.setItem('userId', response.data.data._id).then(res => {
            Api.getToken()
              .then(response => {
                Axios.defaults.headers.common['token'] = response.data.token;
                AsyncStorage.setItem('token', response.data.token).then(
                  response => {
                    navigation.replace('Drawer');
                  },
                );
              })
              .catch(err => {
                console.log('token', err.response.data);
              });
          });
        } else {
          alert(response.data.message);
        }
      })
      .catch(err => {
        console.log('login error', err.response.data);
      });
  };

  return (
    <View style={styles.parent}>
      <Image source={Images.LOGO} style={styles.image} />
      <TextInput
        onChangeText={text => setEmail(text)}
        value={email}
        placeholder="Email"
        style={styles.input}
        placeholderTextColor={Colors.THEME_TEXT}
        keyboardType="email-address"
        onSubmitEditing={() => passwordRef.current.focus()}
        blurOnSubmit={false}
        autoCapitalize="none"
      />
      <TextInput
        ref={passwordRef}
        onChangeText={text => setPassword(text)}
        value={password}
        placeholder="Password"
        style={styles.input}
        placeholderTextColor={Colors.THEME_TEXT}
        secureTextEntry
      />
      <SButton title="Login" style={styles.button} onPress={callAPI} />

      <Text style={styles.signup}>New User? Sign Up</Text>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: Colors.THEME_PRIMARY,
  },
  image: {
    height: 200,
    width: 200,
    alignSelf: 'center',
    resizeMode: 'cover',
  },
  input: {
    marginHorizontal: 20,
    marginVertical: 10,
    backgroundColor: Colors.THEME_SECONDARY,
    borderRadius: 8,
    padding: 10,
    color: Colors.THEME_TEXT,
  },
  button: {marginTop: 20},
  signup: {
    color: Colors.PRIMARY,
    alignSelf: 'center',
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 16,
  },
});
