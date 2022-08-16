import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  ListRenderItem,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Box from '../components/Box';
import ParentView from '../components/ParentView';
import Toolbar from '../components/Toolbar';
import Api from '../service/Api';
import {Colors, Singleton} from '../utils';

const Products = () => {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const route = useRoute<RouteProp<StackParamList, 'Products'>>();
  const id = route.params?.id ?? '';
  const {name} = route;

  const [productsData, setProductsData] = useState<Array<IProducts>>([]);
  const [heartIndex, setHeartIndex] = useState<number>(-1);

  useEffect(() => {
    // let param=getParam()
    console.log(name);

    Api.getProducts().then(res => {
      setProductsData(res.data.data);
      Singleton.FETCH_HOME = false;
    });
    //   .finally(() => setIsParentLoading(false));
  }, []);

  //   const getParam=()=>{
  //     if(name==='Companies')
  //   }

  /**
   * Updates the Wishlist and Heart index
   * @param pid id of the product
   * @param index index of the product
   */
  const updateWishList = (pid: string, index: number) => {
    setHeartIndex(index);
    Api.updateWishList(pid).then(() => {
      Singleton.FETCH_WISHLIST = true;
      Singleton.FETCH_PRODUCT = true;
      Singleton.FETCH_HOME = true;
      const obj = {...productsData[index]};
      obj.isSaved = !obj.isSaved;
      setProductsData([
        ...productsData.slice(0, index),
        obj,
        ...productsData.slice(index + 1),
      ]);
      setHeartIndex(-1);
    });
  };

  /**
   * renders the product card
   * @param item renderItem item of products
   */
  const renderProducts: ListRenderItem<IProducts> = ({
    item: product,
    index,
  }) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('ProductDetails', {id: product._id})}
        key={index}
        style={[styles.productContainer, {backgroundColor: product.color}]}>
        <View style={styles.productTopRow}>
          {product.discount !== 0 && (
            <View style={styles.productDiscountContainer}>
              <Text
                style={
                  styles.productDiscount
                }>{`${product.discount}% off`}</Text>
            </View>
          )}
          <Box />
          {heartIndex !== index ? (
            <Icon
              name="favorite"
              style={styles.productHeart}
              size={25}
              color={product.isSaved ? Colors.RED : Colors.DARK_GREY}
              onPress={() => updateWishList(product._id, index)}
            />
          ) : (
            <ActivityIndicator animating color={Colors.RED} size={'small'} />
          )}
        </View>
        <Image
          source={{uri: Singleton.BASE_URL + product.image}}
          style={styles.productImage}
        />
        <View style={styles.productBottomContainer}>
          <Text style={styles.productName}>{product.name}</Text>
          <View style={styles.productPriceRow}>
            {product.discount !== 0 && (
              <Text style={styles.productPrice}>{`₹${product.price}`}</Text>
            )}
            <Text
              style={
                styles.productDiscountedPrice
              }>{`₹${product.discountedPrice}`}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ParentView isLoading={false}>
      <Toolbar color={Colors.THEME_PRIMARY} title={'Products'} />
      <FlatList
        numColumns={2}
        data={productsData}
        renderItem={renderProducts}
        showsHorizontalScrollIndicator={false}
        extraData={productsData}
      />
    </ParentView>
  );
};

export default Products;

const styles = StyleSheet.create({
  productContainer: {
    alignItems: 'center',
    margin: 5,
    borderRadius: 20,
    width: Dimensions.get('window').width / 2 - 10,
    overflow: 'hidden',
    elevation: 5,
  },
  productTopRow: {
    flexDirection: 'row',
    margin: 10,
  },
  productDiscountContainer: {
    backgroundColor: Colors.WHITE,
    borderRadius: 14,
    paddingHorizontal: 10,
    justifyContent: 'center',
    marginRight: 5,
  },
  productHeart: {marginTop: 5, marginRight: 5},
  productImage: {
    height: 'auto',
    width: Dimensions.get('window').width / 2 - 10,
    aspectRatio: 1.5,
    resizeMode: 'contain',
  },
  productBottomContainer: {
    backgroundColor: Colors.THEME_PRIMARY,
    alignSelf: 'stretch',
    marginHorizontal: 5,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginVertical: 5,
    flex: 1,
    justifyContent: 'center',
  },
  productName: {
    color: Colors.THEME_TEXT,
    alignSelf: 'center',
    textAlign: 'center',
    margin: 5,
    fontWeight: '900',
    fontSize: 16,
  },
  productPriceRow: {
    flexDirection: 'row',
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  productDiscountedPrice: {
    color: Colors.THEME_TEXT,
    fontWeight: '700',
    fontSize: 18,
    marginLeft: 5,
  },
  productPrice: {
    textDecorationLine: 'line-through',
    color: Colors.THEME_TEXT,
  },
  productDiscount: {
    color: Colors.DISCOUNT_GREEN,
    alignSelf: 'center',
    marginBottom: 5,
    fontSize: 16,
    fontWeight: '500',
  },
});
