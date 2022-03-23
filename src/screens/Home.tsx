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
import ICategories from '../types/ICategories';
import ICompanies from '../types/ICompanies';
import {IProducts, IResponse} from '../types/IProducts';
import Colors, {isDarkMode} from '../utils/Colors';
import Singleton from '../utils/Singleton';

const Home = ({navigation}) => {
  const setProductsRecoil = useSetRecoilState(productState);
  const productsData = useRecoilValue<IProducts>(productState);
  const [companiesData, setCompaniesData] = useState<Array<ICompanies>>([]);
  const [categoriesData, setCategoriesData] = useState<Array<ICategories>>([]);
  useEffect(() => {
    console.log('h token', Singleton.token);

    Api.getProducts()
      .then(async res => {
        let response = res.data.data;
        await Promise.all(
          response.map(async (el: IProducts, index: number) => {
            console.log(el);
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
      });

    Api.getCompanies().then(response => {
      setCompaniesData(response.data.data);
    });
    Api.getCategories().then(response => {
      setCategoriesData(response.data.data);
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
    const discount = (item.data.price * item.data.discount) / 100;
    return item.data.price - discount;
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
        style={[
          styles.productContainer,
          {backgroundColor: product.data.bgColor},
        ]}>
        <Icon
          name="favorite"
          style={styles.productHeart}
          size={25}
          color={Colors.DARK_GREY}
        />
        <Image source={{uri: product.data.image}} style={styles.productImage} />
        <View style={styles.productBottomContainer}>
          <Text style={styles.productName}>{product.data.name}</Text>
          <View style={styles.productPriceRow}>
            <Text style={styles.productPrice}>{`₹${product.data.price}`}</Text>
            <Text style={styles.productDiscountedPrice}>{`₹${getDiscountedPrice(
              product,
            )}`}</Text>
          </View>
          <Text
            style={
              styles.productDiscount
            }>{`${product.data.discount}% off`}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  interface companyProps {
    item: ICompanies;
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
    item: ICategories;
  }
  const renderCategories: React.FC<categoryProps> = ({item: company}) => {
    return (
      <View style={styles.categoryContainer}>
        <Image
          source={{uri: Singleton.BASE_URL + company.image}}
          style={styles.categoryImage}
        />
      </View>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.parent}>
      <HomeToolbar />
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
  );
};

export default Home;

const styles = StyleSheet.create({
  parent: {
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
  },
  categoryImage: {
    height: 45,
    width: 45,
    resizeMode: 'contain',
  },
  productList: {flexGrow: 0},
  productContainer: {
    alignItems: 'center',
    margin: 5,
    borderRadius: 20,
    width: Dimensions.get('window').width / 2 - 20,
    overflow: 'hidden',
    elevation: 5,
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
