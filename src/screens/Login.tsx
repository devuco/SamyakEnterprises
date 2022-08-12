import {
  Animated,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
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
import Loader from '../components/Loader';
// import {FirebaseAuthTypes}  from '@react-native-firebase/auth';

//TODO user validation UI
const Login = () => {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();

  const [phone, setPhone] = useState<string>('');
  const [slideDown] = useState<Animated.Value>(new Animated.Value(-80));
  const [isPhoneVisible, setIsPhoneVisible] = useState<boolean>(false);
  const [phoneError, setPhoneError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const slide = () => {
    Animated.timing(slideDown, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
    setIsPhoneVisible(true);
  };

  /**
   * Slides the view down and calls the function to call the login API
   */
  const phoneSignin = () => {
    if (isPhoneVisible) {
      const phone_regex = /^\+?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4,6}$/;
      if (phone_regex.test(phone)) {
        navigation.navigate('OTP', {phone});
      } else {
        setPhoneError('Please enter a valid phone number');
      }
    } else {
      slide();
    }
  };

  /**
   * Sign in with google
   */
  const googleSignIn = async () => {
    setIsLoading(true);
    try {
      const userInfo = await GoogleSignin.signIn();
      const {name, id, email: gmail} = userInfo.user;
      let body = {name: name ?? '', email: gmail, password: id};
      Api.register(body).then(res => loginUser(res.data, name ?? '', gmail));
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  /**
   * Login user
   * @param res response.data from API
   * @param name Fetched name from google or empty string
   * @param emailId Fetched email from google or user
   */
  const loginUser = (res: IResponse<IUser>, name: string, emailId: string) => {
    Axios.defaults.headers.common.token = res.data.token;
    AsyncStorage.setItem('token', res.data.token).then(() =>
      AsyncStorage.setItem('name', name).then(() =>
        AsyncStorage.setItem('email', emailId).then(() => {
          Singleton.NAME = name;
          Singleton.EMAIL = emailId;
          Singleton.FETCH_HOME = true;
          navigation.replace('Drawer');
          setIsLoading(false);
        }),
      ),
    );
  };

  return (
    <SafeAreaView style={styles.parent}>
      <Image source={Images.LOGO} style={styles.image} />
      <TextInput
        onChangeText={e => {
          setPhone(e);
          setPhoneError('');
        }}
        value={phone}
        placeholder="Phone number"
        style={styles.input}
        placeholderTextColor={Colors.THEME_TEXT}
        keyboardType="phone-pad"
        maxLength={10}
      />
      {phoneError && <Text style={styles.phoneError}>{phoneError}</Text>}
      <Animated.View
        style={{
          backgroundColor: Colors.THEME_PRIMARY,
          transform: [{translateY: slideDown}],
        }}>
        <SButton
          title="Sign in with phone"
          onPress={phoneSignin}
          style={styles.button}
          iconName="phone"
          iconStyle={styles.buttonIcon}
          iconColor={Colors.PRIMARY}
          iconSize={26}
          textStyle={styles.buttonText}
        />
        <GoogleSigninButton
          onPress={googleSignIn}
          style={styles.googleButton}
          size={GoogleSigninButton.Size.Wide}
          color={isDarkMode ? 1 : 0}
        />
        <Text style={styles.signup}>New User? Sign Up</Text>
      </Animated.View>
      <Loader isLoading={isLoading} />
    </SafeAreaView>
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
  phoneError: {
    color: Colors.RED,
    marginHorizontal: 20,
    alignSelf: 'center',
  },
  button: {
    marginTop: 20,
    justifyContent: 'flex-start',
    elevation: 5,
    borderRadius: 0,
  },
  buttonIcon: {
    backgroundColor: Colors.THEME_PRIMARY,
    marginLeft: 0,
    borderColor: Colors.PRIMARY,
    borderWidth: 1,
    padding: 7,
  },
  buttonText: {
    flex: 1,
    fontSize: 14,
  },
  googleButton: {alignSelf: 'center', width: '91.6%', height: 50},
  signup: {
    color: Colors.PRIMARY,
    alignSelf: 'center',
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 16,
  },
});
