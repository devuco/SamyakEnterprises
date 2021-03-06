import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  ListRenderItem,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Box from '../components/Box';
import HomeToolbar from '../components/HomeToolbar';
import ParentView from '../components/ParentView';
import Api from '../service/Api';
import {Colors, Singleton} from '../utils';

const Home = () => {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();

  const [productsData, setProductsData] = useState<Array<IProducts>>([]);
  const [companiesData, setCompaniesData] = useState<Array<ICompanies>>([]);
  const [categoriesData, setCategoriesData] = useState<Array<ICategories>>([]);
  const [search, setSearch] = useState<boolean>(false);
  const [isParentLoading, setIsParentLoading] = useState<boolean>(true);

  useEffect(() => {
    Api.getProducts()
      .then(response => setProductsData(response.data.data))
      .finally(() => setIsParentLoading(false));
    Api.getCompanies().then(response => setCompaniesData(response.data.data));
    Api.getCategories().then(response => setCategoriesData(response.data.data));
  }, []);

  const updateWishList = (pid: string) => {
    Api.updateWishList(pid).then(() =>
      Api.getProducts().then(res => setProductsData(res.data.data)),
    );
  };

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
          <Icon
            name="favorite"
            style={styles.productHeart}
            size={25}
            color={product.isSaved ? Colors.RED : Colors.DARK_GREY}
            onPress={() => updateWishList(product._id)}
          />
        </View>
        <Image
          source={{uri: Singleton.BASE_URL + product.image}}
          style={styles.productImage}
        />
        <View style={styles.productBottomContainer}>
          <Text style={styles.productName}>{product.name}</Text>
          <View style={styles.productPriceRow}>
            {product.discount !== 0 && (
              <Text style={styles.productPrice}>{`???${product.price}`}</Text>
            )}
            <Text
              style={
                styles.productDiscountedPrice
              }>{`???${product.discountedPrice}`}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

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
    <SafeAreaView style={styles.parent}>
      <ParentView isLoading={isParentLoading}>
        <HomeToolbar isSearch={setSearch} />
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
              horizontal
              data={productsData}
              renderItem={renderProducts}
            />
          </ScrollView>
        )}
        <TouchableOpacity
          style={styles.fab}
          onPress={() => navigation.navigate('Cart')}>
          <Icon name="shopping-cart" size={25} color={Colors.SECONDARY} />
        </TouchableOpacity>
      </ParentView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  parent: {backgroundColor: Colors.THEME_PRIMARY, flexGrow: 1},
  scrollView: {
    backgroundColor: Colors.THEME_PRIMARY,
    paddingHorizontal: 10,
    paddingBottom: 150,
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
    alignSelf: 'stretch',
    marginHorizontal: 10,
    marginVertical: 10,
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
