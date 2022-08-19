import {SafeAreaView, StyleSheet, Text} from 'react-native';
import React, {useCallback} from 'react';
import OTPView from '../components/OTPView';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
// import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Axios from '../service/Axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Colors, Singleton} from '../utils';
import Api from '../service/Api';
import Toolbar from '../components/Toolbar';
import ParentView from '../components/ParentView';
// import SmsRetriever from 'react-native-sms-retriever';

//! This screen is just a placeholder until OTP logic is implemeted from backend
const OTP = () => {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const {phone} = useRoute<RouteProp<StackParamList, 'OTP'>>().params;

  // const [verifying, setVerifying] = useState<boolean>(false);
  // const [code, setCode] = useState<string>('');
  // const [confirm, setConfirm] =
  //   useState<FirebaseAuthTypes.ConfirmationResult>();

  /**
   * Login user
   * @param password default password for testing
   */
  const loginUser = useCallback(
    (password: string) => {
      const body = {name: phone, email: phone, password};
      Api.register(body).then(res => {
        Axios.defaults.headers.common.token = res.data.data.token;
        AsyncStorage.setItem('token', res.data.data.token).then(() =>
          AsyncStorage.setItem('name', '').then(() =>
            AsyncStorage.setItem('email', phone).then(async () => {
              Singleton.NAME = '';
              Singleton.EMAIL = phone;
              Singleton.FETCH_HOME = true;
              // await auth().currentUser?.delete();
              navigation.replace('Drawer');
              // setIsLoading(false);
            }),
          ),
        );
      });
    },
    [navigation, phone],
  );

  /**
   * Triggers when the code is filled in otp view
   * @param _e code received from otp view
   */
  const onCodeFilled =
    // useCallback(
    async (_e: string) => {
      // setVerifying(true);
      // try {
      //   const res = auth.PhoneAuthProvider.credential(
      //     confirm?.verificationId!,
      //     e,
      //   );
      //   console.log('success');
      loginUser('123456');
      //   } catch (error) {
      //     console.log('Invalid code.', error);
      //   }
    };
  // [confirm, loginUser],
  // );

  /**
   * Triggers a listener which reads text message if correct has is provided in text message.
   * After listening for it extracts otp from msg then removes itself.
   */
  // const _onSmsListenerPressed = useCallback(async () => {
  //   try {
  //     const registered = await SmsRetriever.startSmsRetriever();
  //     if (registered) {
  //       SmsRetriever.addSmsListener(event => {
  //         const message = event.message;
  //         const otp = message && /(\d{6})/g.exec(message)![1];

  //         if (otp) {
  //           setCode(otp);
  //           onCodeFilled(otp);
  //           SmsRetriever.removeSmsListener();
  //         }
  //       });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, [onCodeFilled]);

  // useEffect(() => {
  //   if (confirm) {
  //     setCode('000000');
  //     onCodeFilled('000000');
  //   }
  // }, [confirm, onCodeFilled]);

  // useEffect(() => {
  //   const verifyPhone = async () => {
  //     try {
  //       const confirmation = await auth().signInWithPhoneNumber(`+91${phone}`);
  //       setConfirm(confirmation);
  //       _onSmsListenerPressed();
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   verifyPhone();
  // }, [_onSmsListenerPressed, phone]);

  return (
    <SafeAreaView style={styles.parent}>
      <Toolbar
        color={Colors.THEME_PRIMARY}
        title={'Verify Phone Number'}
        onBackPress={() => navigation.replace('Login')}
      />
      <ParentView
        isLoading={false}
        text={'Please Wait\nWe are verifying your Phone Number'}>
        <Text style={styles.text}>{'Please Enter OTP'}</Text>
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
