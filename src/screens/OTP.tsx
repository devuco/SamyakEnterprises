import {StyleSheet, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import OTPView from '../components/OTPView';
import {RouteProp, useRoute} from '@react-navigation/native';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';

const OTP = () => {
  const {phone} = useRoute<RouteProp<StackParamList, 'OTP'>>().params;

  const [code, setCode] = useState<string>('');
  const [confirm, setConfirm] = useState<FirebaseAuthTypes.ConfirmationResult>({
    verificationId: '',
    confirm: () => Promise.reject(null),
  });

  const verifyPhone = useCallback(async () => {
    // const confirmation = await auth()
    //   .verifyPhoneNumber(`+91${phone}`, 90)
    //   .on('state_changed', phoneAuthSnapshot => {
    //     console.log('phonea', JSON.stringify(phoneAuthSnapshot, null, 2));
    //   });
    // setConfirm(confirmation);

    const confirmation = await auth().signInWithPhoneNumber(`+91${phone}`);
    setConfirm(confirmation);
  }, [phone]);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => {
      console.log(user);
    });
    verifyPhone();

    return () => unsubscribe();
  }, [verifyPhone]);

  const onCodeFilled = async (e: string) => {
    setCode(e);
    try {
      const result = await confirm.confirm(e);
      console.log(result);
    } catch (err) {
      console.log(err);
    }
    // try {
    //   const credential = auth.PhoneAuthProvider.credential(
    //     confirm.verificationId,
    //     code,
    //   );
    //   let userData = await auth().currentUser?.linkWithCredential(credential);
    //   console.log(userData);

    //   // setUser(userData.user);
    // } catch (error) {
    //   console.log(error);
    // }
  };

  return (
    <View style={styles.parent}>
      <OTPView length={6} onCodeFilled={onCodeFilled} />
    </View>
  );
};

export default OTP;

const styles = StyleSheet.create({
  parent: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  textInput: {
    height: 45,
    width: 40,
    borderColor: 'gray',
    borderWidth: 1,
    color: 'black',
    textAlign: 'center',
    fontSize: 16,
  },
});
