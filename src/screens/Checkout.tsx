import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Colors} from '../utils';
// import {useNavigation} from '@react-navigation/native';
// import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Toolbar from '../components/Toolbar';

const Checkout = () => {
  //   const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();

  return (
    <View style={styles.primary}>
      <Toolbar color={Colors.THEME_PRIMARY} title={'Checkout'} />
    </View>
  );
};

const styles = StyleSheet.create({
  primary: {flex: 1, backgroundColor: Colors.THEME_PRIMARY},
});

export default Checkout;
