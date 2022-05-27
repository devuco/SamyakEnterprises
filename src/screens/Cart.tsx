import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Api from '../service/Api';
import {Colors, Singleton, Toast} from '../utils';
import Toolbar from '../components/Toolbar';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

const Cart = () => {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const [products, setProducts] = useState<Array<ICartProduct>>([]);
  useEffect(() => {
    getCart();
  }, []);

  const getCart = () => {
    Api.getCart().then(response => {
      setProducts(response.data.data.products);
    });
  };

  const addToCart = () => {
    let body = {product: id, quantity: 1};
    Api.addToCart(body)
      .then(() => {
        Toast.showSuccess('Added Successfully');
      })
  };

  const removeProduct = (id: string) => {
    Api.deleteFromCart(id).then(() => {
      Toast.showSuccess('Removed from cart');
      getCart();
    });
  };

  return (
    <View style={styles.parent}>
      <Toolbar color={Colors.THEME_PRIMARY} title="Cart" />
      <FlatList
        data={products}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              style={styles.itemContainer}
              onPress={() =>
                navigation.navigate('ProductDetails', {id: item.product._id})
              }>
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
                    onPress={() => }
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
                    onPress={() => setQuantity(quantity + 1)}
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
            </TouchableOpacity>
          );
        }}
        ListEmptyComponent={() => {
          return <Text style={{color: 'black'}}>NO DATA</Text>;
        }}
      />
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
