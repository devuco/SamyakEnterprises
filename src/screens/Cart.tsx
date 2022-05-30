import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Api from '../service/Api';
import {Colors, Singleton} from '../utils';
import Toolbar from '../components/Toolbar';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

const Cart = () => {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const [products, setProducts] = useState<Array<ICartProduct>>([]);
  const [netTotal, setNetTotal] = useState(0);
  useEffect(() => {
    getCart();
  }, []);

  const getCart = () => {
    Api.getCart().then(response => {
      setProducts(response.data.data.products);
      setNetTotal(response.data.data.netTotal);
      return true;
    });
    return false;
  };

  const updateProduct = (id: string, quantity: number) => {
    let body = {product: id, quantity};
    Api.updateCart(body).then(response => {
      setProducts(prevProducts => {
        let index = prevProducts.findIndex(
          product => product.product._id === response.data.data._id,
        );
        prevProducts[index].quantity = response.data.data.quantity;
        prevProducts[index].total = response.data.data.total;
        return [...prevProducts];
      });
      setNetTotal(response.data.data.netTotal);
    });
  };

  return (
    <View style={styles.parent}>
      <Toolbar color={Colors.THEME_PRIMARY} title="Cart" />
      <FlatList
        data={products}
        renderItem={({item}) => {
          return (
            <View style={styles.itemContainer}>
              <Image
                source={{uri: Singleton.BASE_URL + item.product.image}}
                style={[
                  styles.itemImage,
                  {backgroundColor: item.product.color},
                ]}
              />
              <View
                style={{
                  flex: 1,
                  marginHorizontal: 8,
                  justifyContent: 'space-evenly',
                }}>
                <Text
                  style={{
                    color: Colors.THEME_TEXT,
                    fontWeight: 'bold',
                  }}>
                  {item.product.name}
                </Text>
                <Text style={{color: Colors.DARK_GREY}}>
                  ₹{item.product.discountedPrice}
                </Text>
                <Text
                  style={{
                    color: Colors.PRIMARY,
                    textDecorationLine: 'underline',
                    fontWeight: 'bold',
                  }}
                  onPress={() =>
                    navigation.navigate('ProductDetails', {
                      id: item.product._id,
                    })
                  }>
                  View Product
                </Text>
              </View>
              <View
                style={{
                  marginVertical: 5,
                  justifyContent: 'space-between',
                  marginRight: 5,
                }}>
                {/* <Icon
                  name="delete"
                  color={Colors.THEME_TEXT}
                  size={25}
                  style={{alignSelf: 'flex-end', flex: 1}}
                  onPress={() => removeProduct(item._id)}
                /> */}
                <Text
                  style={{
                    color: Colors.THEME_TEXT,
                    alignSelf: 'flex-end',
                    fontWeight: 'bold',
                    fontSize: 18,
                  }}>
                  ₹{item.total}
                </Text>
                <View style={{flexDirection: 'row'}}>
                  <Text
                    onPress={() =>
                      updateProduct(item.product._id, item.quantity - 1)
                    }
                    style={{
                      backgroundColor: Colors.PRIMARY,
                      borderRadius: 100,
                      height: 20,
                      width: 20,
                      fontWeight: 'bold',
                      textAlign: 'center',
                    }}>
                    -
                  </Text>
                  <Text
                    style={{color: Colors.THEME_TEXT, marginHorizontal: 10}}>
                    {item.quantity}
                  </Text>
                  <Text
                    onPress={() =>
                      updateProduct(item.product._id, item.quantity + 1)
                    }
                    style={{
                      backgroundColor: Colors.PRIMARY,
                      borderRadius: 100,
                      height: 20,
                      width: 20,
                      fontWeight: 'bold',
                      textAlign: 'center',
                    }}>
                    +
                  </Text>
                </View>
              </View>
            </View>
          );
        }}
        ListEmptyComponent={() => {
          return <Text style={{color: 'black'}}>NO DATA</Text>;
        }}
      />
      <Text
        style={{
          color: Colors.THEME_TEXT,
          fontWeight: 'bold',
          alignSelf: 'center',
        }}>
        {netTotal}
      </Text>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  parent: {backgroundColor: Colors.THEME_PRIMARY, flex: 1},
  itemContainer: {
    flexDirection: 'row',
    borderRadius: 12,
    borderColor: Colors.THEME_SECONDARY,
    overflow: 'hidden',
    margin: 10,
  },
  itemImage: {
    height: 100,
    width: 100,

    borderRadius: 12,
  },
});
