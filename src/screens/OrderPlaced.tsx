import {
  FlatList,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {RouteProp, useRoute} from '@react-navigation/native';
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

const OrderPlaced = () => {
  const route = useRoute<RouteProp<StackParamList, 'OrderPlaced'>>();
  const {orderId} = route.params;
  const [data, setData] = useState<IOrder>({});

  const [showSuccess, setShowSuccess] = useState(true);
  const [showInvoice, setShowInvoice] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Api.getOrder(orderId)
      .then(res => {
        setData(res.data.data);
      })
      .finally(() => setIsLoading(false));
  }, [orderId]);

  const {products, orderDate, netTotal} = data;
  return (
    <SafeAreaView style={styles.parent}>
      {!showSuccess && (
        <View style={styles.parent}>
          <Toolbar
            color={Colors.THEME_PRIMARY}
            title={`Order #${orderId.split('_')[1]}`}
          />
          <Text style={styles.date}>
            {moment(orderDate).format('Do MMMM YYYY, hh:mm A')}
          </Text>
          <FlatList
            data={products}
            renderItem={({item}) => {
              return <ProductCard item={item} canUpdateQuantity={false} />;
            }}
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
        </View>
      )}

      <Modal visible={showSuccess} animationType="fade">
        <SuccessTick onPress={() => setShowSuccess(false)} />
      </Modal>
      <Modal visible={showInvoice} animationType="fade">
        <SafeAreaView style={{flex: 1, backgroundColor: '#999'}}>
          <WebView
            onLoadEnd={() => setIsLoading(false)}
            source={{
              uri: Singleton.BASE_URL + `checkout/order/${orderId}/invoice`,
              headers: {
                token: Axios.defaults.headers.common.token,
                userid: Axios.defaults.headers.common.userId,
              },
            }}
            style={{backgroundColor: '#999'}}
          />
          <Icon
            name="cancel"
            size={36}
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
  cancelIcon: {zIndex: 10, position: 'absolute', right: 5, top: 50},
});
