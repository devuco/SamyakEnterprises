import {Alert, Image, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useRef, useState} from 'react';
import {Colors, Images, isDarkMode, Singleton} from '../utils';
import SButton from '../components/SButton';
import Api from '../service/Api';
import Axios from '../service/Axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';

//TODO user validation UI
const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const passwordRef = useRef<TextInput>(null);

  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();

  const callAPI = () => {
    const body = {email, password};
    Api.login(body)
      .then(response => loginUser(response.data))
      .catch(err => Alert.alert(err.response.data.message));
  };

  const googleSignIn = async () => {
    const userInfo = await GoogleSignin.signIn();
    const {name, id, email: gmail} = userInfo.user;
    Singleton.NAME = name;
    Singleton.EMAIL = gmail;
    let body = {name: name ?? '', email: gmail, password: id};
    console.log(body);

    Api.register(body).then(res => {
      loginUser(res.data);
    });
  };

  const loginUser = (res: IResponse<IUser>) => {
    Axios.defaults.headers.common.userId = res.data._id;
    AsyncStorage.setItem('userId', res.data._id).then(() => {
      Api.getToken().then(response => {
        Axios.defaults.headers.common.token = response.data.token;
        AsyncStorage.setItem('token', response.data.token).then(() =>
          navigation.replace('Drawer'),
        );
      });
    });
  };

  return (
    <View style={styles.parent}>
      <Image source={Images.LOGO} style={styles.image} />
      <TextInput
        onChangeText={setEmail}
        value={email}
        placeholder="Email"
        style={styles.input}
        placeholderTextColor={Colors.THEME_TEXT}
        keyboardType="email-address"
        onSubmitEditing={() => passwordRef.current?.focus()}
        blurOnSubmit={false}
        autoCapitalize="none"
      />
      <TextInput
        ref={passwordRef}
        onChangeText={setPassword}
        value={password}
        placeholder="Password"
        style={styles.input}
        placeholderTextColor={Colors.THEME_TEXT}
        secureTextEntry
      />
      <SButton title="Login" style={styles.button} onPress={callAPI} />
      <GoogleSigninButton
        style={{width: '90%', alignSelf: 'center'}}
        size={GoogleSigninButton.Size.Wide}
        color={isDarkMode ? 1 : 0}
        onPress={googleSignIn}
      />

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
