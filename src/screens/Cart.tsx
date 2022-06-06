import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Api from '../service/Api';
import {Colors, Singleton} from '../utils';
import Toolbar from '../components/Toolbar';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Loader from '../components/Loader';
import SNextButton from '../components/SNextButton';
import TextRow from '../components/TextRow';

const Cart = () => {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const [products, setProducts] = useState<Array<ICartProduct>>([]);
  const [netTotal, setNetTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCart();
  }, []);

  /**
   * @method getCart
   * @description get cart products
   */
  const getCart = () => {
    Api.getCart()
      .then(response => {
        setProducts(response.data.data.products);
        setNetTotal(response.data.data.netTotal);
        return true;
      })
      .finally(() => setIsLoading(false));
    return false;
  };

  /**
   * @method updateProduct
   * @description Update product quantity, if quantity is 0 then delete product from cart.
   * Update object of selected product and net total.
   */
  const updateProduct = (id: string, quantity: number) => {
    setIsLoading(true);
    if (quantity === 0) {
      Api.deleteFromCart(id).then(() => {
        getCart();
      });
    } else {
      let body = {product: id, quantity};
      Api.updateCart(body)
        .then(response => {
          setProducts(prevProducts => {
            let index = prevProducts.findIndex(
              product => product.product._id === response.data.data._id,
            );
            prevProducts[index].quantity = response.data.data.quantity;
            prevProducts[index].total = response.data.data.total;
            return [...prevProducts];
          });
          setNetTotal(response.data.data.netTotal);
        })
        .finally(() => setIsLoading(false));
    }
  };

  return (
    <SafeAreaView style={styles.parent}>
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

              {/* Column 2 contains name price discount and viewText */}
              <View style={styles.itemColumn2}>
                <Text style={styles.itemName}>{item.product.name}</Text>
                <View style={styles.itemPriceContainer}>
                  <Text style={styles.itemDiscountedPrice}>
                    ₹{item.product.discountedPrice}
                  </Text>
                  <Text style={styles.itemPrice}>₹{item.product.price}</Text>
                  <Text style={styles.itemDiscount}>
                    {item.product.discount}%off
                  </Text>
                </View>
                <Text
                  style={styles.itemViewProduct}
                  onPress={() =>
                    navigation.push('ProductDetails', {
                      id: item.product._id,
                    })
                  }>
                  View Product
                </Text>
              </View>

              {/* Column 3 contains Quanity Button and Total Text */}
              <View style={styles.itemColumn3}>
                <Text style={styles.itemTotal}>₹{item.total}</Text>
                <View style={styles.itemQuantityContainer}>
                  <Text
                    onPress={() =>
                      updateProduct(item.product._id, item.quantity - 1)
                    }
                    style={styles.itemQuantityButton}>
                    -
                  </Text>
                  <Text style={styles.itemQuantity}>{item.quantity}</Text>
                  <Text
                    onPress={() =>
                      updateProduct(item.product._id, item.quantity + 1)
                    }
                    style={styles.itemQuantityButton}>
                    +
                  </Text>
                </View>
              </View>
            </View>
          );
        }}
        // ListEmptyComponent={() => (
        //   <Text style={{color: Colors.THEME_TEXT}}>NO DATA</Text>
        // )}
      />
      {netTotal !== undefined && <TextRow texts={['Total', `₹${netTotal}`]} />}
      {products && products.length !== 0 && (
        <SNextButton
          leftText="Proceed to Checkout"
          onPress={() => navigation.navigate('Checkout', {total: netTotal})}
        />
      )}
      <Loader isLoading={isLoading} />
    </SafeAreaView>
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
  itemColumn2: {
    flex: 1,
    marginHorizontal: 8,
    justifyContent: 'space-evenly',
  },
  itemName: {
    color: Colors.THEME_TEXT,
    fontWeight: 'bold',
  },
  itemPriceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemDiscountedPrice: {
    color: Colors.THEME_TEXT,
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 5,
  },
  itemPrice: {
    color: Colors.DARK_GREY,
    textDecorationLine: 'line-through',
    marginRight: 5,
  },
  itemDiscount: {
    color: Colors.DISCOUNT_GREEN,
    marginRight: 5,
    fontWeight: 'bold',
  },
  itemViewProduct: {
    color: Colors.PRIMARY,
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
  itemColumn3: {
    marginVertical: 5,
    justifyContent: 'space-between',
    marginRight: 5,
  },
  itemTotal: {
    color: Colors.THEME_TEXT,
    alignSelf: 'flex-end',
    fontWeight: 'bold',
    fontSize: 18,
  },
  itemQuantityContainer: {flexDirection: 'row'},
  itemQuantityButton: {
    backgroundColor: Colors.PRIMARY,
    borderRadius: 10,
    height: 20,
    width: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    overflow: 'hidden',
  },
  itemQuantity: {color: Colors.THEME_TEXT, marginHorizontal: 10},
});
