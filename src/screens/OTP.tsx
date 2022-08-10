import {Platform, SafeAreaView, StyleSheet, Text} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import OTPView from '../components/OTPView';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Axios from '../service/Axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Colors, Singleton} from '../utils';
import Api from '../service/Api';
import Toolbar from '../components/Toolbar';
import ParentView from '../components/ParentView';

const OTP = () => {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const {phone} = useRoute<RouteProp<StackParamList, 'OTP'>>().params;

  const [verifying, setVerifying] = useState<boolean>(false);
  const [confirm, setConfirm] = useState<FirebaseAuthTypes.ConfirmationResult>({
    verificationId: '',
    confirm: () => Promise.reject(null),
  });

  const verifyPhone = useCallback(async () => {
    const confirmation = await auth().signInWithPhoneNumber(`+91${phone}`);
    setConfirm(confirmation);
  }, [phone]);

  /**
   * Login user
   * @param res response.data from API
   * @param name Fetched name from google or empty string
   * @param emailId Fetched email from google or user
   */
  const loginUser = useCallback(
    (uid: string) => {
      const body = {name: phone, email: phone, password: uid};
      Api.register(body).then(res => {
        Axios.defaults.headers.common.token = res.data.data.token;
        AsyncStorage.setItem('token', res.data.data.token).then(() =>
          AsyncStorage.setItem('name', '').then(() =>
            AsyncStorage.setItem('email', phone).then(async () => {
              Singleton.NAME = '';
              Singleton.EMAIL = phone;
              Singleton.FETCH_HOME = true;
              await auth().currentUser?.delete();
              navigation.replace('Drawer');
              // setIsLoading(false);
            }),
          ),
        );
      });
    },
    [navigation, phone],
  );

  useEffect(() => {
    if (Platform.OS === 'android') {
      setVerifying(true);
    }
    verifyPhone();
    const unsubscribe = auth().onAuthStateChanged(async user => {
      if (user) {
        loginUser(user.uid);
      }
      setTimeout(() => {
        setVerifying(false);
        unsubscribe();
      }, 10000);
    });
    return () => unsubscribe();
  }, [loginUser, verifyPhone]);

  const onCodeFilled = async (e: string) =>
    confirm
      .confirm(e)
      .then(res => loginUser(res?.user.uid!))
      .catch(err => console.log(err));

  return (
    <SafeAreaView style={styles.parent}>
      <Toolbar color={Colors.THEME_PRIMARY} title={'Verify Phone Number'} />
      <ParentView
        isLoading={verifying}
        text={'Please Wait\nWe are verifying your Phone Number'}>
        <Text style={styles.text}>{`${
          Platform.OS === 'android' &&
          "We couldn't verify your phone number.\n\n"
        }Please Enter OTP`}</Text>
        <OTPView length={6} onCodeFilled={onCodeFilled} />
      </ParentView>
    </SafeAreaView>
  );
};

export default OTP;

const styles = StyleSheet.create({
  parent: {
    backgroundColor: Colors.THEME_PRIMARY,
    flex: 1,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.PRIMARY,
    alignSelf: 'center',
    textAlign: 'center',
    marginVertical: 20,
  },
});
