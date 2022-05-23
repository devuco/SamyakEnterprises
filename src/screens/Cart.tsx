import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Api} from '../service/Api';
import {Colors, Singleton, Toast} from '../utils';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Toolbar from '../components/Toolbar';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

const Cart = () => {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const [products, setProducts] = useState<ICart['products']>([]);
  useEffect(() => {
    getCart();
  }, []);

  const getCart = () => {
    Api.getCart()
      .then(response => {
        setProducts(response.data.data.products);
      })
      .catch(err => {
        console.log(err);

        Toast.showError();
      });
  };

  const removeProduct = (id: string) => {
    Api.deleteFromCart(id)
      .then(() => {
        Toast.showSuccess('Removed from cart');
        getCart();
      })
      .catch(err => {
        Toast.showError();
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
                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <Text style={{color: Colors.DARK_GREY}}>
                    Rs.{item.product.discountedPrice}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  justifyContent: 'space-evenly',
                }}>
                <Icon
                  name="edit"
                  color={Colors.THEME_TEXT}
                  size={25}
                  style={{padding: 5}}
                />
                <Icon
                  name="delete"
                  color={Colors.THEME_TEXT}
                  size={25}
                  style={{padding: 5}}
                  onPress={() => removeProduct(item._id)}
                />
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
