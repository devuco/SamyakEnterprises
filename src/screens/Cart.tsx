import {FlatList, SafeAreaView, StyleSheet} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import Api from '../service/Api';
import {Colors, Images, Singleton} from '../utils';
import Toolbar from '../components/Toolbar';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Loader from '../components/Loader';
import SNextButton from '../components/SNextButton';
import TextRow from '../components/TextRow';
import ProductCard from '../components/ProductCard';
import NoData from '../components/NoData';
import ParentView from '../components/ParentView';
import {useRecoilState} from 'recoil';
import {cartAtom, netTotalAtom} from '../atom/cart';

const Cart = () => {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();

  const [products, setProducts] = useRecoilState<Array<ICartProduct>>(cartAtom);
  const [netTotal, setNetTotal] = useRecoilState<number>(netTotalAtom);
  const [isParentLoading, setIsParentLoading] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  /**
   * Retrieves cart products and net total from API and set them to the state.
   * Notifies Singleton that cart is fetched.
   */
  const getCart = useCallback(() => {
    Api.getCart()
      .then(response => {
        setProducts(response.data.data.products);
        setNetTotal(response.data.data.netTotal);
        Singleton.FETCH_CART = false;
      })
      .finally(() => setIsParentLoading(false));
  }, [setNetTotal, setProducts]);

  useEffect(() => {
    if (Singleton.FETCH_CART) {
      setIsParentLoading(true);
      getCart();
    }
  }, [getCart]);

  /**
   * Updates product quantity, if quantity is 0 then deletes product from cart.
   * @param id Product id
   * @param action Action to be performed. 0 for decrease, 1 for increase
   */
  const updateProduct = (id: string, action: 0 | 1) => {
    setIsLoading(true);

    let body = {product: id, action};
    Api.updateCart(body)
      .then(response => {
        setProducts(response.data.data.products);
        setNetTotal(response.data.data.netTotal);
      })
      .finally(() => setIsLoading(false));
  };

  /**
   *
   * Returns a component when cart is empty and parent loading is false.
   */
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
                onAddProduct={() => updateProduct(item.product._id, 1)}
                onSubtractProduct={() => updateProduct(item.product._id, 0)}
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
