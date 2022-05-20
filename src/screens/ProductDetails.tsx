import {
  Alert,
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
import {Api} from '../service/Api';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

const ProductDetails = () => {
  type StackParamList = {
    ProductDetails: {id: string; bgColor: string};
  };
  const route = useRoute<RouteProp<StackParamList>>();
  const id: string = route.params.id;
  const [product, setProduct] = useState<IProducts>({
    price: 0,
    discount: 0,
    stock: 0,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const getDiscountedPrice = () =>
    product.price - (product.price * product.discount) / 100;

  useEffect(() => {
    Api.getProduct(id)
      .then(response => {
        if (response.status === 200) {
          setProduct(response.data.data);
        }
      })
      .catch(err => {
        console.log('product error ', err.response.data);
      });
  }, []);

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
      .then(response => {
        if (response.data.success) {
          Toast.showSuccess('Added Successfully');
        } else {
          Toast.showError();
        }
      })
      .catch(err => {
        console.log(err.response.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <SafeAreaView style={styles.parent}>
      <StatusBar backgroundColor={product.color} />
      <ScrollView>
        <Icon
          name="arrow-back"
          color={Colors.THEME_TEXT}
          style={[styles.backArrow, {backgroundColor: product.color}]}
          size={25}
          onPress={() => navigation.goBack()}
        />
        {console.log(product)}
        <View
          style={[styles.imageBackground, {backgroundColor: product.color}]}>
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
              style={styles.discountedPrice}>{`₹${getDiscountedPrice()}`}</Text>
            <Text style={styles.price}>
              {product?.discount !== 0 && `₹${product?.price}`}
            </Text>
            <Text style={styles.stock}>{getStock(product?.stock)}</Text>
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
    </SafeAreaView>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  parent: {flex: 1, backgroundColor: Colors.THEME_PRIMARY},
  backArrow: {
    zIndex: 1,
    paddingLeft: 10,
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
