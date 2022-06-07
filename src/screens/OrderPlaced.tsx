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
import {Colors} from '../utils';
import ProductCard from '../components/ProductCard';
import Toolbar from '../components/Toolbar';
import TextRow from '../components/TextRow';
import Box from '../components/Box';
import moment from 'moment';
import SuccessTick from '../components/SuccessTick';

const OrderPlaced = () => {
  const route = useRoute<RouteProp<StackParamList, 'OrderPlaced'>>();
  const {orderId} = route.params;
  const [data, setData] = useState<IOrder>({});

  const [showSuccess, setShowSuccess] = useState(true);

  useEffect(() => {
    Api.getOrder(orderId).then(res => {
      setData(res.data.data);
    });
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
          <TextRow texts={['Total', `₹${netTotal}`]} />
        </View>
      )}

      <Modal visible={showSuccess} animationType="fade">
        <SuccessTick onPress={() => setShowSuccess(false)} />
      </Modal>
    </SafeAreaView>
  );
};

export default OrderPlaced;

const styles = StyleSheet.create({
  parent: {backgroundColor: Colors.THEME_PRIMARY, flex: 1},
  date: {color: Colors.THEME_TEXT, marginHorizontal: 10},
});
