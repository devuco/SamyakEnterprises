import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Colors, Toast} from '../utils';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Toolbar from '../components/Toolbar';
import SNextButton from '../components/SNextButton';
import TextRow from '../components/TextRow';
import {RouteProp, useRoute} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SButton from '../components/SButton';
import Api from '../service/Api';
import Loader from '../components/Loader';
import RazorpayCheckout from 'react-native-razorpay';
import LabelledTextInput from '../components/LabelledTextInput';
import Box from '../components/Box';

const Checkout = () => {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const route = useRoute<RouteProp<StackParamList, 'Checkout'>>();
  const {total} = route.params;
  const [editing, setEditing] = useState<boolean>(false);
  const [address, setAddress] = useState<IUserAddress>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getAddress();
  }, []);

  const getAddress = () => {
    Api.getAddress()
      .then(response => {
        setAddress(response.data.data);
      })
      .finally(() => {
        setIsLoading(false);
        setEditing(false);
      });
  };

  const saveAddress = () => {
    setIsLoading(true);
    Api.updateAddress(address)
      .then(() => {
        Toast.showSuccess('Address updated successfully');
        setEditing(false);
      })
      .catch(err => {
        Toast.showError(err.response.data.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const cancelAddress = () => {
    setIsLoading(true);
    getAddress();
  };

  const proceedToPayment = () => {
    setIsLoading(true);
    Api.createOrder(total)
      .then(response => {
        const orderId = response.data.data.id;
        const options = {
          description: 'Credits towards consultation',
          image: 'https://i.imgur.com/3g7nmJC.png',
          currency: 'INR',
          key: 'rzp_test_GfxJZDSYJvQ0Gf',
          amount: total * 100,
          name: 'Shopping App',
          order_id: orderId,
          prefill: {
            email: 'gaurav.kumar@example.com',
            contact: '9191919191',
            name: 'Gaurav Kumar',
          },
          theme: {color: Colors.PRIMARY},
        };
        RazorpayCheckout.open(options)
          .then((data: any) => {
            Api.placeOrder({
              orderId: data.razorpay_order_id,
              amount: total,
            })
              .then(() => {
                navigation.popToTop();
                navigation.navigate('OrderPlaced', {orderId});
              })
              .finally(() => setIsLoading(false));
          })
          .catch(
            (error: any) =>
              console.log('error', JSON.stringify(error, null, 2)),
            setIsLoading(false),
          );
      })
      .catch(() => setIsLoading(false));
  };

  return (
    <SafeAreaView style={styles.parent}>
      <Toolbar color={Colors.THEME_PRIMARY} title={'Checkout'} />
      <ScrollView
        contentContainerStyle={styles.addressContainer}
        keyboardShouldPersistTaps="always">
        <View style={styles.addressHeadingRow}>
          <Text style={styles.addressHeading}>Deliver To</Text>
          {Object.keys(address).length > 0 && !editing && (
            <Icon
              name="edit"
              size={20}
              color={Colors.DARK_GREY}
              onPress={() => setEditing(prevState => !prevState)}
            />
          )}
        </View>
        <LabelledTextInput
          label={'Name'}
          input={'Samyak Agrawal'}
          onChangeText={() => {}}
        />
        <LabelledTextInput
          label={'Phone'}
          input={'9524658201'}
          onChangeText={() => {}}
        />
        {Object.keys(address).length === 0 && !editing && (
          <SButton
            title="Add New Address"
            onPress={() => setEditing(true)}
            style={styles.addAddressButton}
          />
        )}
        {(Object.keys(address).length > 0 || editing) && (
          <View>
            <Text style={styles.addressHeading}>Address</Text>
            <LabelledTextInput
              label={'House No.'}
              input={address.houseNo}
              onChangeText={text => setAddress({...address, houseNo: text})}
              editable={editing}
              keyboardType="numeric"
            />
            <LabelledTextInput
              label={'Street'}
              input={address.street}
              onChangeText={text => setAddress({...address, street: text})}
              editable={editing}
            />
            <LabelledTextInput
              label={'City'}
              input={address.city}
              onChangeText={text => setAddress({...address, city: text})}
              editable={editing}
            />
            <LabelledTextInput
              label={'State'}
              input={address.state}
              onChangeText={text => setAddress({...address, state: text})}
              editable={editing}
            />
            <LabelledTextInput
              label={'Pincode'}
              input={address.pincode}
              onChangeText={text => setAddress({...address, pincode: text})}
              editable={editing}
              keyboardType="numeric"
            />
            {editing && (
              <View style={styles.saveCancelButtonRow}>
                <SButton
                  title="Cancel"
                  onPress={cancelAddress}
                  style={styles.cancelButton}
                />
                <SButton
                  title="Save"
                  onPress={saveAddress}
                  style={styles.saveButton}
                />
              </View>
            )}
          </View>
        )}
      </ScrollView>
      <Box />
      {!editing && <TextRow texts={['Total', `₹${total}`]} />}
      {Object.keys(address).length > 0 && !editing && (
        <SNextButton onPress={proceedToPayment} leftText="Proceed to Pay" />
      )}
      <Loader isLoading={isLoading} />
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
  addressHeadingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addressHeading: {
    fontSize: 18,
    color: Colors.DARK_GREY,
    padding: 10,
    fontWeight: 'bold',
  },
  addAddressButton: {marginBottom: 15, marginTop: 10, marginHorizontal: 5},
  saveCancelButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  cancelButton: {
    paddingHorizontal: 20,
    backgroundColor: Colors.SECONDARY,
    color: Colors.PRIMARY,
    marginHorizontal: 0,
  },
  saveButton: {
    paddingHorizontal: 20,
    backgroundColor: Colors.PRIMARY,
    color: Colors.THEME_PRIMARY,
    marginHorizontal: 0,
  },
  box: {flex: 1},
});

export default Checkout;
