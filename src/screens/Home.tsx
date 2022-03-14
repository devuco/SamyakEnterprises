import React, {useCallback, useEffect, useRef} from 'react';
import {useState} from 'react';
import {
  Appearance,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ImageColors from 'react-native-image-colors';
import Credentials from 'react-native-secure-api';
import Icon from 'react-native-vector-icons/MaterialIcons';
import HomeToolbar from '../components/HomeToolbar';
import {Api} from '../service/Api';
import BaseUrl from '../service/BaseUrl';
import ICompanies from '../types/ICompanies';
import IProducts from '../types/IProducts';
import Colors, {isDarkMode} from '../utils/Colors';
import Singleton from '../utils/Singleton';

const Home = ({navigation}) => {
  const [productsData, setProductsData] = useState<Array<IProducts>>([]);
  const [companiesData, setCompaniesData] = useState<Array<ICompanies>>([]);
  useEffect(() => {
    Api.getProducts()
      .then(async res => {
        await Promise.all(
          res.data.map(async (el: IProducts, index: number) => {
            const image = (await BaseUrl()) + el.image;
            const bgColor = await getBackgroundColor(image);
            res.data[index].bgColor = bgColor;
            res.data[index].image = image;
          }),
        );
        setProductsData(res.data);
      })
      .catch(error => {
        console.log(error);
      });

    Api.getCompanies().then(response => {
      setCompaniesData(response.data);
    });
  }, []);

  const getBackgroundColor = async (uri: string) => {
    const result = await ImageColors.getColors(uri, {
      fallback: '#228B22',
      cache: false,
      key: Math.random().toString(),
    });
    if (result?.platform === 'android') {
      return isDarkMode ? result.darkVibrant : result.lightVibrant;
    }
  };

  const getDiscountedPrice = (item: IProducts) => {
    const discount = (item.price * item.discount) / 100;
    return item.price - discount;
  };

  interface props {
    item: IProducts;
    index: number;
  }
  const renderItems = ({item: product, index}: props) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('ProductDetails', {
            response: productsData[index],
          });
        }}
        key={index}
        style={[styles.productContainer, {backgroundColor: product.bgColor}]}>
        <Icon
          name="favorite"
          style={styles.productHeart}
          size={25}
          color="#808080"
        />
        <Image source={{uri: product.image}} style={styles.productImage} />
        <View style={styles.productBottomContainer}>
          <Text style={styles.productName}>{product.name}</Text>
          <View style={styles.productPriceRow}>
            <Text style={styles.productPrice}>{`₹${product.price}`}</Text>
            <Text style={styles.productDiscountedPrice}>{`₹${getDiscountedPrice(
              product,
            )}`}</Text>
          </View>
          <Text
            style={styles.productDiscount}>{`${product.discount}% off`}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.parent}>
      <HomeToolbar />
      <FlatList
        style={styles.productList}
        data={companiesData}
        renderItem={({item, index}) => {
          return (
            <Image
              source={{uri: Singleton.BASE_URL + item.image}}
              style={{
                height: 80,
                width: 'auto',
                aspectRatio: 1,
              }}
            />
          );
        }}
      />
      <FlatList
        data={productsData}
        renderItem={renderItems}
        horizontal
        style={styles.productList}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  parent: {
    backgroundColor: Colors.THEME_PRIMARY,
    flex: 1,
    paddingHorizontal: 10,
  },
  productList: {flexGrow: 0},
  productContainer: {
    alignItems: 'center',
    margin: 5,
    borderRadius: 20,
    width: Dimensions.get('window').width / 2 - 20,
    overflow: 'hidden',
  },
  productHeart: {alignSelf: 'flex-end', marginRight: 15, marginTop: 15},
  productImage: {
    height: 'auto',
    width: Dimensions.get('window').width / 2 - 20,
    aspectRatio: 1.3,
    resizeMode: 'contain',
  },
  productBottomContainer: {
    backgroundColor: Colors.THEME_PRIMARY,
    width: '95%',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginVertical: 5,
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
    color: 'green',
    alignSelf: 'center',
    marginBottom: 5,
    fontSize: 16,
    fontWeight: '500',
  },
});
