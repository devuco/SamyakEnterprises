import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect} from 'react';
import {useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import ImageColors from 'react-native-image-colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import HomeToolbar from '../components/HomeToolbar';
import productState from '../recoil/productState';
import {Api} from '../service/Api';
import Axios from '../service/Axios';
import {ICategories, ICompanies, IProducts} from '../types';
import {Colors, isDarkMode, Singleton} from '../utils';

const Home = ({navigation}) => {
  const setProductsRecoil = useSetRecoilState(productState);
  const productsData = useRecoilValue<Array<IProducts>>(productState);
  const [companiesData, setCompaniesData] = useState<ICompanies['data']>([]);
  const [categoriesData, setCategoriesData] = useState<ICategories['data']>([]);
  const [search, setSearch] = useState(false);

  useEffect(() => {
    Api.getProducts()
      .then(async res => {
        let response = res.data.data;
        await Promise.all(
          response.map(async (el: IProducts, index: number) => {
            const image = Singleton.BASE_URL + el.image;
            const bgColor = await getBackgroundColor(image);
            response[index].bgColor = bgColor;
            response[index].image = image;
          }),
        );
        setProductsRecoil(response);
      })
      .catch(error => {
        console.log('home', error.response.data);
        AsyncStorage.clear();
        navigation.replace('Login');
      });

    Api.getCompanies().then(response => {
      setCompaniesData(response.data.data);
    });
    Api.getCategories().then(response => {
      setCategoriesData(response.data.data);
    });
  }, []);

  /**
   * @method getBackgroundColor
   * @description Uses Image Colors Library to retrieve color of the image and return the color according to phone theme
   */
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

  /**
   * @method getDiscountedPrice
   * @description Returns discounted price of the product. Discount % is received from response
   */
  const getDiscountedPrice = (item: IProducts) => {
    const discount = (item.price * item.discount) / 100;
    return item.price - discount;
  };

  interface productProps {
    item: IProducts;
    index: number;
  }
  const renderProducts: React.FC<productProps> = ({item: product, index}) => {
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
          color={Colors.DARK_GREY}
        />
        <Image source={{uri: product.image}} style={styles.productImage} />
        <View style={styles.productBottomContainer}>
          <Text style={styles.productName}>{product.name}</Text>
          <View style={styles.productPriceRow}>
            {product.discount !== 0 && (
              <Text style={styles.productPrice}>{`₹${product.price}`}</Text>
            )}
            <Text style={styles.productDiscountedPrice}>{`₹${getDiscountedPrice(
              product,
            )}`}</Text>
          </View>
          {product.discount !== 0 && (
            <Text
              style={styles.productDiscount}>{`${product.discount}% off`}</Text>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  interface companyProps {
    item: ICompanies['data'][0];
  }
  const renderCompanies: React.FC<companyProps> = ({item: company}) => {
    return (
      <View style={styles.companyContainer}>
        <Image
          source={{uri: Singleton.BASE_URL + company.image}}
          style={styles.companyImage}
        />
      </View>
    );
  };

  interface categoryProps {
    item: ICategories['data'][0];
  }
  const renderCategories: React.FC<categoryProps> = ({item: category}) => {
    return (
      <View style={styles.categoryContainer}>
        <Image
          source={{uri: Singleton.BASE_URL + category.image}}
          style={styles.categoryImage}
        />
      </View>
    );
  };

  return (
    <View style={styles.parent}>
      <HomeToolbar isSearch={(value: boolean) => setSearch(value)} />
      {!search && (
        <ScrollView
          contentContainerStyle={styles.scrollView}
          keyboardShouldPersistTaps="handled">
          <Text style={styles.heading}>Top Brands</Text>
          <FlatList
            horizontal
            style={styles.companyList}
            data={companiesData}
            renderItem={renderCompanies}
          />
          <Text style={styles.heading}>Top Categories</Text>
          <FlatList
            horizontal
            style={styles.companyList}
            data={categoriesData}
            renderItem={renderCategories}
          />
          <Text style={styles.heading}>Top Picks For You</Text>
          <FlatList
            data={productsData}
            renderItem={renderProducts}
            horizontal
            style={styles.productList}
          />
        </ScrollView>
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  parent: {backgroundColor: Colors.THEME_PRIMARY, flexGrow: 1},
  scrollView: {
    backgroundColor: Colors.THEME_PRIMARY,
    paddingHorizontal: 10,
    paddingBottom: 80,
    flexGrow: 1,
  },
  heading: {
    color: Colors.PRIMARY,
    fontSize: 18,
    marginHorizontal: 10,
    fontWeight: '600',
    marginBottom: 10,
  },
  companyList: {flexGrow: 0, paddingHorizontal: 5, marginBottom: 30},
  companyContainer: {
    borderRadius: 5,
    marginHorizontal: 5,
    marginVertical: 5,
    backgroundColor: Colors.WHITE,
    elevation: 5,
  },
  companyImage: {
    height: 40,
    width: 93.8,
    resizeMode: 'contain',
  },
  categoryContainer: {
    borderRadius: 12,
    marginHorizontal: 5,
    marginVertical: 5,
    backgroundColor: Colors.WHITE,
    elevation: 5,
    padding: 5,
  },
  categoryImage: {
    height: 40,
    width: 40,
    resizeMode: 'contain',
  },
  productList: {flexGrow: 0},
  productContainer: {
    alignItems: 'center',
    margin: 5,
    borderRadius: 20,
    width: Dimensions.get('window').width / 2,
    overflow: 'hidden',
    elevation: 5,
  },
  productHeart: {alignSelf: 'flex-end', marginRight: 15, marginTop: 15},
  productImage: {
    height: 'auto',
    width: Dimensions.get('window').width / 2,
    aspectRatio: 1.3,
    resizeMode: 'contain',
  },
  productBottomContainer: {
    backgroundColor: Colors.THEME_PRIMARY,
    width: '95%',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginVertical: 5,
    flex: 1,
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
