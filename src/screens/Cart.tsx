import {FlatList, SafeAreaView, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import Api from '../service/Api';
import {Colors} from '../utils';
import Toolbar from '../components/Toolbar';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Loader from '../components/Loader';
import SNextButton from '../components/SNextButton';
import TextRow from '../components/TextRow';
import ProductCard from '../components/ProductCard';

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
            <ProductCard
              item={item}
              onAddProduct={() =>
                updateProduct(item.product._id, item.quantity - 1)
              }
              onSubtractProduct={() =>
                updateProduct(item.product._id, item.quantity + 1)
              }
              canUpdateQuantity
            />
          );
        }}
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
});
