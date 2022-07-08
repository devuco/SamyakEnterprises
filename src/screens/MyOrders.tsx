import {
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import {Colors} from '../utils';
import Toolbar from '../components/Toolbar';
import ParentView from '../components/ParentView';
import Api from '../service/Api';
import moment from 'moment';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

const MyOrders = () => {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();

  const [data, setData] = useState<Array<IOrder>>([]);
  const [isParentLoading, setIsParentLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      Api.getOrders()
        .then(res => setData(res.data.data))
        .finally(() => setIsParentLoading(false));
    }, []),
  );

  return (
    <SafeAreaView style={styles.parent}>
      <Toolbar color={Colors.THEME_PRIMARY} title={'My Orders'} />
      <ParentView isLoading={isParentLoading}>
        <FlatList
          data={data}
          renderItem={({item}) => {
            const {orderDate, orderId, netTotal} = item;
            return (
              <TouchableOpacity
                style={styles.itemContainer}
                onPress={() =>
                  navigation.navigate('OrderedProducts', {
                    orderId: orderId ?? '',
                  })
                }>
                <Text style={styles.itemDate}>
                  {moment(orderDate).format('Do MMMM YYYY')}
                </Text>
                <Text style={styles.itemDate}>{`Order Id: ${
                  orderId?.split('_')[1]
                }`}</Text>
                <Text style={styles.itemDate}>{`Rs.${netTotal}`}</Text>
              </TouchableOpacity>
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
  },
  itemDate: {
    color: Colors.THEME_TEXT,
  },
});
