import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {AirbnbRating} from 'react-native-ratings';
import SButton from '../components/SButton';
import {Colors, Singleton, Toast} from '../utils';
import Api from '../service/Api';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import ParentView from '../components/ParentView';
import {useRecoilState} from 'recoil';
import {productDetail} from '../atom';
import ReactNativeModal from 'react-native-modal';

const ProductDetails = () => {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const route = useRoute<RouteProp<StackParamList, 'ProductDetails'>>();
  const {id} = route.params;

  const [product, setProduct] = useRecoilState<IProducts>(productDetail);
  const [isParentLoading, setIsParentLoading] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [heartLoading, setHeartLoading] = useState<boolean>(false);
  const [showCartModal, setShowCartModal] = useState<boolean>(false);

  useEffect(() => {
    if (product._id === id && !Singleton.FETCH_PRODUCT) {
      setIsParentLoading(false);
      return;
    }
    Api.getProduct(id)
      .then(response => {
        setProduct(response.data.data);
        Singleton.FETCH_PRODUCT = false;
      })
      .finally(() => setIsParentLoading(false));
  }, [id, product._id, setProduct]);

  /**
   * Returns text according to stock of the product
   * @param stock stock of the product from api
   * @returns text
   */
  const getStock = (stock: number) => {
    if (stock === 0) {
      return 'Out of Stock';
    } else if (stock <= 5) {
      return `Hurry! Only ${stock} left`;
    }
    return 'In Stock';
  };

  /**
   * Calls api to add product to cart, then shows a modal that product is added to cart
   */
  const addToCart = () => {
    setIsLoading(true);
    let body = {product: id};
    Api.addToCart(body)
      .then(() => {
        setShowCartModal(true); //TODO implement modal
        Singleton.FETCH_CART = true;
      })
      .catch(err => Toast.showError(err.response.data.message)) //TODO change button text to go to cart
      .finally(() => setIsLoading(false));
  };

  /**
   * Shows an alert stating 'The feature is not implemented yet'
   */
  const notifyMe = () => {
    Alert.alert('Oops!', 'This feature is not available yet.');
  };

  /**
   * Calls api to update the wishlist and heart status of the product
   */
  const updateWishList = () => {
    setHeartLoading(true);
    Api.updateWishList(id).then(() => {
      Singleton.FETCH_WISHLIST = true;
      Singleton.FETCH_HOME = true;
      let updatedProduct = {...product};
      updatedProduct.isSaved = !updatedProduct.isSaved;
      setProduct(updatedProduct);
      setHeartLoading(false);
    });
  };

  return (
    <ParentView isLoading={isParentLoading}>
      <StatusBar backgroundColor={product?.color} />
      <View style={[styles.header, {backgroundColor: product?.color}]}>
        <Icon
          name="arrow-back"
          color={Colors.BLACK}
          size={25}
          onPress={() => navigation.goBack()}
        />
        {!heartLoading ? (
          <Icon
            name="favorite"
            size={25}
            color={product.isSaved ? Colors.RED : Colors.DARK_GREY}
            onPress={updateWishList}
          />
        ) : (
          <ActivityIndicator animating color={Colors.RED} size={'small'} />
        )}
      </View>
      <ScrollView>
        <View
          style={[styles.imageBackground, {backgroundColor: product?.color}]}>
          <Image
            source={{uri: Singleton.BASE_URL + product?.image}}
            style={styles.image}
          />
        </View>
        <View style={styles.container}>
          <Text style={styles.name}>{product?.name}</Text>
          <View style={styles.ratingContainer}>
            <AirbnbRating
              count={5}
              size={20}
              isDisabled
              defaultRating={product?.avgRating || 0}
              ratingContainerStyle={styles.starsContainer}
              reviewSize={0}
              selectedColor={Colors.STAR_YELLOW}
            />
            <Text
              style={
                styles.ratingText
              }>{`(${product?.totalRatings} Reviews)`}</Text>
          </View>
          <View style={styles.priceContainer}>
            <Text
              style={
                styles.discountedPrice
              }>{`₹${product?.discountedPrice}`}</Text>
            <Text style={styles.price}>
              {product?.discount !== 0 && `₹${product?.price}`}
            </Text>
            <Text style={styles.stock}>{getStock(product?.stock ?? 0)}</Text>
          </View>
          <Text style={styles.aboutText}>About</Text>
          <Text style={styles.description}>{product?.description}</Text>
        </View>
      </ScrollView>
      <SButton
        title={product?.stock !== 0 ? 'Add to cart' : 'Notify Me'}
        onPress={product?.stock !== 0 ? addToCart : notifyMe}
        isLoading={isLoading}
        loadingText="Please Wait..."
      />
      <ReactNativeModal
        isVisible={showCartModal}
        backdropOpacity={0.2}
        style={styles.modal}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>Product added to cart</Text>
          <SButton
            title="Proceed to Checkout"
            onPress={() => {
              navigation.navigate('Cart');
              setShowCartModal(false);
            }}
            iconName="check"
          />
          <SButton
            title="Continue Shopping"
            onPress={() => setShowCartModal(false)}
            style={{backgroundColor: Colors.DARK_GREY}}
            iconName="shopping-bag"
          />
        </View>
      </ReactNativeModal>
    </ParentView>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  imageBackground: {
    borderBottomRightRadius: 500,
    borderBottomLeftRadius: 500,
    paddingBottom: 50,
    width: Dimensions.get('window').width + 100,
    alignSelf: 'center',
  },
  image: {
    height: Dimensions.get('window').height / 3,
    width: '100%',
    aspectRatio: 1,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  container: {
    marginHorizontal: 20,
    marginTop: 20,
    flex: 1,
  },
  name: {
    color: Colors.THEME_TEXT,
    fontWeight: 'bold',
    fontSize: 18,
  },
  ratingContainer: {flexDirection: 'row', alignItems: 'flex-end'},
  starsContainer: {alignSelf: 'baseline', marginTop: -15},
  ratingText: {
    color: Colors.THEME_TEXT,
    marginBottom: 3,
    marginLeft: 20,
  },
  priceContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
  },
  discountedPrice: {
    color: Colors.THEME_TEXT,
    fontSize: 24,
    fontWeight: 'bold',
  },
  price: {
    color: Colors.THEME_TEXT,
    textDecorationLine: 'line-through',
    marginLeft: 15,
  },
  stock: {
    color: Colors.THEME_TEXT,
    fontWeight: 'bold',
    fontSize: 18,
    flexShrink: 1,
    flex: 1,
    textAlign: 'right',
  },
  aboutText: {
    color: Colors.THEME_TEXT,
    marginTop: 30,
    fontWeight: '600',
    fontSize: 18,
  },
  description: {color: Colors.THEME_TEXT, marginTop: 14},
  modal: {
    justifyContent: 'flex-end',
    marginBottom: 0,
    marginHorizontal: 0,
  },
  modalContainer: {
    backgroundColor: Colors.THEME_PRIMARY,
    borderRadius: 12,
    paddingVertical: 15,
  },
  modalText: {
    color: Colors.THEME_TEXT,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 18,
    alignSelf: 'center',
    textAlign: 'center',
  },
});
