import React from 'react';
import {SafeAreaView, StyleSheet, Text, TextInput, View} from 'react-native';
import {Colors} from '../utils';
// import {useNavigation} from '@react-navigation/native';
// import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Toolbar from '../components/Toolbar';
import SNextButton from '../components/SNextButton';
import TextRow from '../components/TextRow';
import {RouteProp, useRoute} from '@react-navigation/native';

const Checkout = () => {
  //   const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const route = useRoute<RouteProp<StackParamList, 'Checkout'>>();
  const {total} = route.params;

  interface AddressInputProps {
    label: string;
    input: string;
    onChangeText: (text: string) => void;
  }
  const AddressInput: React.FC<AddressInputProps> = ({
    label,
    input,
    onChangeText,
  }) => {
    return (
      <View style={styles.addressInputContainer}>
        <Text style={styles.addressInputLabel}>{label}</Text>
        <TextInput
          value={input}
          onChangeText={onChangeText}
          style={styles.addressInputTextInput}
          editable={false}
          multiline
        />
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.parent}>
      <Toolbar color={Colors.THEME_PRIMARY} title={'Checkout'} />
      <View style={styles.addressContainer}>
        <View
          style={{flexDirection: 'row', flex: 1, alignItems: 'center'}}></View>
        <Text style={styles.addressHeading}>Deliver To</Text>
        <AddressInput
          label={'Name'}
          input={'Samyak Agrawal'}
          onChangeText={() => {}}
        />
        <AddressInput
          label={'Email'}
          input={'samyakagrawal13@gmail.com'}
          onChangeText={() => {}}
        />
        <Text style={styles.addressHeading}>Address</Text>
        <AddressInput label={'House No.'} input={'5'} onChangeText={() => {}} />
        <AddressInput
          label={'Street'}
          input={'Indrapuri Colony, Davv Takshila Parisar'}
          onChangeText={() => {}}
        />
        <AddressInput label={'City'} input={'Indore'} onChangeText={() => {}} />
        <AddressInput
          label={'State'}
          input={'Madhya Pradesh'}
          onChangeText={() => {}}
        />
        <AddressInput
          label={'Pincode'}
          input={'452020'}
          onChangeText={() => {}}
        />
      </View>
      <View style={{flex: 1}}></View>
      <TextRow texts={['Total', `₹${total}`]} />
      <SNextButton onPress={() => {}} leftText="Proceed to Pay" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  parent: {flex: 1, backgroundColor: Colors.THEME_PRIMARY},
  addressContainer: {
    borderColor: Colors.THEME_SECONDARY,
    borderWidth: 2,
    borderRadius: 12,
    marginHorizontal: 18,
    padding: 10,
  },
  addressHeading: {
    fontSize: 18,
    color: Colors.DARK_GREY,
    padding: 10,
    fontWeight: 'bold',
  },
  addressInputContainer: {
    flexDirection: 'row',
  },
  addressInputLabel: {
    fontSize: 16,
    color: Colors.THEME_TEXT,
    fontWeight: 'bold',
    flex: 1,
    paddingHorizontal: 10,
  },
  addressInputTextInput: {
    color: Colors.THEME_TEXT,
    padding: 0,
    flex: 2,
    paddingHorizontal: 10,
  },
});

export default Checkout;
