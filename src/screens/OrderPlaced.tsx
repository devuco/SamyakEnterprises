import {
  FlatList,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import Api from '../service/Api';
import {Colors, Singleton} from '../utils';
import ProductCard from '../components/ProductCard';
import Toolbar from '../components/Toolbar';
import TextRow from '../components/TextRow';
import Box from '../components/Box';
import moment from 'moment';
import SuccessTick from '../components/SuccessTick';
import {WebView} from 'react-native-webview';
import Axios from '../service/Axios';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Loader from '../components/Loader';
import SButton from '../components/SButton';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import ParentView from '../components/ParentView';

//TODO add continue button, remove back button
const OrderPlaced = () => {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const route = useRoute<RouteProp<StackParamList, 'OrderPlaced'>>();
  const {orderId} = route.params;

  const [data, setData] = useState<IOrder>({});
  const [showSuccess, setShowSuccess] = useState<boolean>(true);
  const [showInvoice, setShowInvoice] = useState<boolean>(false);
  const [isParentLoading, setIsParentLoading] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    Api.getOrder(orderId)
      .then(res => setData(res.data.data))
      .finally(() => setIsParentLoading(false));
  }, [orderId]);

  const {products, orderDate, netTotal} = data;
  return (
    <SafeAreaView style={styles.parent}>
      <ParentView isLoading={isParentLoading}>
        <View style={styles.parent}>
          <Toolbar
            color={Colors.THEME_PRIMARY}
            title={`Order #${orderId.split('_')[1]}`}
            canGoBack={false}
          />
          <Text style={styles.date}>
            {moment(orderDate).format('Do MMMM YYYY, hh:mm A')}
          </Text>
          <FlatList
            data={products}
            renderItem={({item}) => (
              <ProductCard item={item} canUpdateQuantity={false} />
            )}
          />
          <Box />
          <Text
            style={styles.checkInvoiceText}
            onPress={() => {
              setShowInvoice(true);
              setIsLoading(true);
            }}>
            Check Invoice
          </Text>
          <TextRow texts={['Total', `₹${netTotal}`]} />
          <SButton
            title="Continue Shopping"
            onPress={() => navigation.goBack()}
          />
        </View>
      </ParentView>
      <Modal visible={showSuccess} animationType="fade">
        <SuccessTick onPress={() => setShowSuccess(false)} />
      </Modal>
      <Modal visible={showInvoice} animationType="fade">
        <SafeAreaView style={styles.parent}>
          <WebView
            onLoadEnd={() => setIsLoading(false)}
            source={{
              uri: `${Singleton.BASE_URL}checkout/order/${orderId}/invoice`,
              headers: {
                token: Axios.defaults.headers.common.token,
                userid: Axios.defaults.headers.common.userId,
              },
            }}
          />
          <Icon
            name="cancel"
            size={30}
            color={Colors.BLACK}
            onPress={() => setShowInvoice(false)}
            style={styles.cancelIcon}
          />
        </SafeAreaView>
      </Modal>
      <Loader isLoading={isLoading} />
    </SafeAreaView>
  );
};

export default OrderPlaced;

const styles = StyleSheet.create({
  parent: {backgroundColor: Colors.THEME_PRIMARY, flex: 1},
  date: {color: Colors.THEME_TEXT, marginHorizontal: 10},
  checkInvoiceText: {
    color: Colors.PRIMARY,
    fontSize: 16,
    alignSelf: 'flex-end',
    marginRight: 10,
    marginBottom: 10,
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
  cancelIcon: {zIndex: 10, position: 'absolute', right: 0, top: 25},
});
