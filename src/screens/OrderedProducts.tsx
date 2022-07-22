import {FlatList, SafeAreaView, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import Api from '../service/Api';
import {RouteProp, useRoute} from '@react-navigation/native';
import ParentView from '../components/ParentView';
import Toolbar from '../components/Toolbar';
import {Colors} from '../utils';
import ProductCard from '../components/ProductCard';
import TextRow from '../components/TextRow';

const OrderedProducts = () => {
  const route = useRoute<RouteProp<StackParamList, 'OrderPlaced'>>();
  const {orderId} = route.params;

  const [data, setData] = useState<IOrder>({products: []});
  const [isParentLoading, setIsParentLoading] = useState<boolean>(true);

  useEffect(() => {
    Api.getOrder(orderId)
      .then(res => setData(res.data.data))
      .finally(() => setIsParentLoading(false));
  }, [orderId]);
  const {products} = data;

  //TODO View Invoice button
  return (
    <SafeAreaView style={styles.parent}>
      <Toolbar color={Colors.THEME_PRIMARY} title="Ordered Products" />
      <ParentView isLoading={isParentLoading}>
        <FlatList
          data={products}
          renderItem={({item}) => (
            <ProductCard item={item} canUpdateQuantity={false} />
          )}
        />
        <TextRow texts={['Total:', `₹${data.netTotal}`]} />
      </ParentView>
    </SafeAreaView>
  );
};

export default OrderedProducts;

const styles = StyleSheet.create({
  parent: {backgroundColor: Colors.THEME_PRIMARY, flex: 1},
});
