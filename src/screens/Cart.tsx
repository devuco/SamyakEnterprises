import {FlatList, SafeAreaView, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import Api from '../service/Api';
import {Colors, Images} from '../utils';
import Toolbar from '../components/Toolbar';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Loader from '../components/Loader';
import SNextButton from '../components/SNextButton';
import TextRow from '../components/TextRow';
import ProductCard from '../components/ProductCard';
import NoData from '../components/NoData';
import ParentView from '../components/ParentView';

const Cart = () => {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();

  const [products, setProducts] = useState<Array<ICartProduct>>([]);
  const [netTotal, setNetTotal] = useState<number>(0);
  const [isParentLoading, setIsParentLoading] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
      })
      .finally(() => setIsParentLoading(false));
  };

  /**
   * @method updateProduct
   * @description Update product quantity, if quantity is 0 then delete product from cart.
   * Update object of selected product and net total.
   */
  const updateProduct = (id: string, quantity: number) => {
    setIsLoading(true);
    if (quantity === 0) {
      Api.deleteFromCart(id)
        .then(() => getCart())
        .finally(() => setIsLoading(false));
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

  const listEmptyComponent = () => {
    return !isParentLoading ? (
      <NoData
        image={Images.CART_EMPTY}
        heading="Your Cart Is Empty!"
        description="It's time to go shopping "
      />
    ) : null;
  };

  return (
    <SafeAreaView style={styles.parent}>
      <Toolbar color={Colors.THEME_PRIMARY} title="Cart" />
      <ParentView isLoading={isParentLoading}>
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
          ListEmptyComponent={listEmptyComponent}
        />

        {products && products.length !== 0 && (
          <TextRow texts={['Total', `₹${netTotal}`]} />
        )}
        {products && products.length !== 0 && (
          <SNextButton
            leftText="Proceed to Checkout"
            onPress={() => navigation.navigate('Checkout', {total: netTotal})}
          />
        )}
      </ParentView>
      <Loader isLoading={isLoading} />
    </SafeAreaView>
  );
};

export default Cart;

const styles = StyleSheet.create({
  parent: {backgroundColor: Colors.THEME_PRIMARY, flex: 1},
});
