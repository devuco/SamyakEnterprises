import {
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  View,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors} from '../utils';
import Toolbar from '../components/Toolbar';
import ParentView from '../components/ParentView';
import Api from '../service/Api';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import ProductCard from '../components/ProductCard';
import TextRow from '../components/TextRow';

const MyOrders = () => {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();

  const [data, setData] = useState<Array<IOrder>>([]);
  const [isParentLoading, setIsParentLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(0);
  const [emptyData, setemptyData] = useState<boolean>(false);
  const [isListLoading, setIsListLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!emptyData) {
      setIsListLoading(true);
      Api.getOrders(page)
        .then(res => {
          setData(prev => prev.concat(res.data.data));
          if (res.data.data.length === 0) {
            setemptyData(true);
          }
        })
        .finally(() => {
          setIsParentLoading(false);
          setIsListLoading(false);
        });
    }
  }, [emptyData, page]);

  const listFooterComponent = () => (
    <ActivityIndicator
      size="large"
      color={Colors.PRIMARY}
      animating={isListLoading}
    />
  );

  return (
    <SafeAreaView style={styles.parent}>
      <Toolbar color={Colors.THEME_PRIMARY} title={'My Orders'} />

      <ParentView isLoading={isParentLoading}>
        <FlatList
          ListFooterComponent={listFooterComponent}
          data={data}
          onEndReached={() => setPage(prev => prev + 1)}
          keyExtractor={(_item, index) => index.toString()}
          renderItem={({item}) => {
            const {orderDate, orderId, netTotal, products} = item;
            return (
              <Pressable
                style={styles.itemContainer}
                onPress={() =>
                  navigation.navigate('OrderedProducts', {
                    orderId: orderId ?? '',
                  })
                }>
                <Text style={styles.orderDate}>
                  {moment(orderDate).format('MMM DD, YYYY')}
                </Text>
                <View style={styles.productCardContainer}>
                  {products.slice(0, 2).map((product, index) => (
                    <ProductCard
                      key={index}
                      item={product}
                      canUpdateQuantity={false}
                      showPrice={false}
                      showDiscount={false}
                      containerStyle={styles.productCard}
                    />
                  ))}
                </View>
                {products.length > 2 && (
                  <Text style={styles.viewMore}>
                    {`${products.length - 2} more`}
                  </Text>
                )}
                <TextRow
                  texts={['Net Total :', `₹${netTotal}`]}
                  style={styles.netTotalRow}
                />
              </Pressable>
            );
          }}
        />
      </ParentView>
    </SafeAreaView>
  );
};

export default MyOrders;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: Colors.THEME_PRIMARY,
  },
  itemContainer: {
    margin: 20,
    elevation: 5,
    backgroundColor: Colors.THEME_PRIMARY,
    borderRadius: 10,
    shadowColor: Colors.BLACK,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  orderDate: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.THEME_TEXT,
    marginHorizontal: 15,
    marginVertical: 15,
  },
  productCardContainer: {
    elevation: 5,
    backgroundColor: Colors.THEME_PRIMARY,
    borderRadius: 10,
    shadowColor: Colors.BLACK,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    marginHorizontal: 10,
  },
  productCard: {marginBottom: 10},
  viewMore: {
    color: Colors.PRIMARY,
    alignSelf: 'flex-end',
    marginHorizontal: 20,
    marginBottom: 10,
    fontWeight: 'bold',
    fontSize: 16,
    textDecorationLine: 'underline',
    marginTop: 5,
  },
  netTotalRow: {marginHorizontal: 10, marginBottom: 10},
});
