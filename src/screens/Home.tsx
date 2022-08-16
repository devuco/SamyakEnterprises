import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useCallback, useEffect} from 'react';
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
import {ScrollView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useRecoilState} from 'recoil';
import {homeData} from '../atom';
import Box from '../components/Box';
import HomeToolbar from '../components/HomeToolbar';
import ParentView from '../components/ParentView';
import TextRow from '../components/TextRow';
import Api from '../service/Api';
import {Colors, Singleton} from '../utils';

const Home = () => {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();

  const [productsData, setProductsData] =
    useRecoilState<Array<IProducts>>(homeData);
  const [companiesData, setCompaniesData] = useState<Array<ICompanies>>([]);
  const [categoriesData, setCategoriesData] = useState<Array<ICategories>>([]);
  const [search, setSearch] = useState<boolean>(false);
  const [isParentLoading, setIsParentLoading] = useState<boolean>(true);
  const [heartIndex, setHeartIndex] = useState<number>(-1);

  useFocusEffect(
    useCallback(() => {
      if (Singleton.FETCH_HOME) {
        Api.getProducts()
          .then(res => {
            setProductsData(res.data.data);
            Singleton.FETCH_HOME = false;
          })
          .finally(() => setIsParentLoading(false));
      } else {
        setIsParentLoading(false);
      }
    }, [setProductsData]),
  );

  useEffect(() => {
    Api.getCompanies().then(res => setCompaniesData(res.data.data));
    Api.getCategories().then(res => setCategoriesData(res.data.data));
  }, []);

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

  /**
   * renders the comapany card
   * @param item renderItem item of company
   */
  const renderCompanies: ListRenderItem<ICompanies> = ({item: company}) => {
    return (
      <View style={styles.companyContainer}>
        <Image
          source={{uri: Singleton.BASE_URL + company.image}}
          style={styles.companyImage}
        />
      </View>
    );
  };

  /**
   * renders the category card
   * @param item renderItem item of category
   */
  const renderCategories: ListRenderItem<ICategories> = ({item: category}) => {
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
      <ParentView isLoading={isParentLoading}>
        <HomeToolbar isSearch={setSearch} route={'HOME'} />
        {!search && (
          <ScrollView
            contentContainerStyle={styles.scrollView}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}>
            <Text style={styles.heading}>Top Brands</Text>
            <FlatList
              horizontal
              style={styles.companyList}
              data={companiesData}
              renderItem={renderCompanies}
              showsHorizontalScrollIndicator={false}
            />
            <Text style={styles.heading}>Top Categories</Text>
            <FlatList
              horizontal
              style={styles.companyList}
              data={categoriesData}
              renderItem={renderCategories}
              showsHorizontalScrollIndicator={false}
            />
            <TextRow
              texts={['Top Picks For You', 'View All']}
              textStyle={styles.heading}
              style={styles.textRow}
              onPress={() => navigation.navigate('Products')}
            />
            <FlatList
              horizontal
              data={productsData}
              renderItem={renderProducts}
              showsHorizontalScrollIndicator={false}
              extraData={productsData}
            />
          </ScrollView>
        )}
        <TouchableOpacity
          style={styles.fab}
          onPress={() => navigation.navigate('Cart')}>
          <Icon name="shopping-cart" size={25} color={Colors.SECONDARY} />
        </TouchableOpacity>
      </ParentView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  parent: {backgroundColor: Colors.THEME_PRIMARY, flexGrow: 1},
  scrollView: {
    backgroundColor: Colors.THEME_PRIMARY,
    paddingHorizontal: 10,
    paddingBottom: 50,
  },
  heading: {
    color: Colors.PRIMARY,
    fontSize: 18,
    fontWeight: '600',
    marginHorizontal: 10,
    marginBottom: 10,
  },
  companyList: {flexGrow: 0, paddingHorizontal: 5, marginBottom: 30},
  companyContainer: {
    borderRadius: 5,
    marginHorizontal: 5,
    marginVertical: 5,
    backgroundColor: Colors.WHITE,
    elevation: 5,
    shadowColor: Colors.BLACK,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
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
    shadowColor: Colors.BLACK,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  categoryImage: {
    height: 40,
    width: 40,
    resizeMode: 'contain',
  },
  textRow: {marginBottom: 0, marginHorizontal: 0, paddingHorizontal: 0},
  productContainer: {
    alignItems: 'center',
    margin: 5,
    borderRadius: 20,
    width: Dimensions.get('window').width / 2,
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
    width: Dimensions.get('window').width / 2,
    aspectRatio: 1.3,
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
  fab: {
    position: 'absolute',
    bottom: 110,
    right: 25,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 100,
    padding: 15,
  },
});
