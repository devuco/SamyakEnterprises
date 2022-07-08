import {
  Dimensions,
  Image,
  SafeAreaView,
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

const ProductDetails = () => {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const route = useRoute<RouteProp<StackParamList, 'ProductDetails'>>();
  const {id} = route.params;

  const [product, setProduct] = useState<IProducts>();
  const [isParentLoading, setIsParentLoading] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    Api.getProduct(id)
      .then(response => setProduct(response.data.data))
      .finally(() => setIsParentLoading(false));
  }, [id]);

  const getStock = (stock: number) => {
    if (stock === 0) {
      return 'Out of Stock';
    } else if (stock <= 5) {
      return `Hurry! Only ${stock} left`;
    }
    return 'Available in Stock';
  };

  const addToCart = () => {
    setIsLoading(true);
    let body = {product: id, quantity: 1};
    Api.addToCart(body)
      .then(() => Toast.showSuccess('Added Successfully'))
      .catch(err => Toast.showError(err.response.data.message)) //TODO change button text to go to cart
      .finally(() => setIsLoading(false));
  };

  return (
    <SafeAreaView style={styles.parent}>
      <StatusBar backgroundColor={product?.color} />
      <View style={[styles.header, {backgroundColor: product?.color}]}>
        <Icon
          name="arrow-back"
          color={Colors.BLACK}
          size={25}
          onPress={() => navigation.goBack()}
        />
        <Icon
          name="shopping-cart"
          color={Colors.BLACK}
          size={25}
          onPress={() => navigation.navigate('Cart')}
        />
      </View>
      <ParentView isLoading={isParentLoading}>
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
          title={'Add to cart'}
          onPress={addToCart}
          isLoading={isLoading}
          loadingText="Please Wait..."
        />
      </ParentView>
    </SafeAreaView>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  parent: {flex: 1, backgroundColor: Colors.THEME_PRIMARY},
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
    flex: 1,
  },
  stock: {
    color: Colors.THEME_TEXT,
    fontWeight: 'bold',
    fontSize: 18,
  },
  aboutText: {
    color: Colors.THEME_TEXT,
    marginTop: 30,
    fontWeight: '600',
    fontSize: 18,
  },
  description: {color: Colors.THEME_TEXT, marginTop: 14},
});
