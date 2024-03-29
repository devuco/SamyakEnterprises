import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from '../utils/Colors';
import {useNavigation} from '@react-navigation/native';
import {TextInput} from 'react-native-gesture-handler';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import Api from '../service/Api';
import {Singleton} from '../utils';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

interface Props {
  isSearch?: (value: boolean) => void;
  route: 'HOME' | 'WISHLIST' | 'CATEGORY' | 'COMPANIES';
}
const HomeToolbar: React.FC<Props> = ({isSearch, route}) => {
  const drawerNavigation =
    useNavigation<DrawerNavigationProp<DrawerParamList>>();
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();

  const [searchPressed, setSearchPressed] = useState<boolean>(false);
  const [data, setData] = useState<ISearch>({
    categories: [],
    companies: [],
    products: [],
  });

  const searchRef = useRef<TextInput>(null);

  const callAPI = (input: string) => {
    if (input.trim()) {
      Api.searchProducts(input).then(response => setData(response.data));
    }
  };

  const renderSearch = (
    itemArray: Array<IProducts | ICategories | ICompanies>,
    screen: 'ProductDetails' | 'CategoryDetails' | 'CompanyDetails',
  ) => {
    return itemArray?.map((item, index) => (
      <TouchableOpacity
        style={styles.resultItemContainer}
        key={index}
        onPress={() => navigation.navigate(screen, {id: item._id})}>
        <Image
          source={{uri: Singleton.BASE_URL + item.image}}
          style={styles.resultItemImage}
        />
        <Text style={styles.resultItemName}>{item.name}</Text>
      </TouchableOpacity>
    ));
  };

  const CONDITIONAL_FLEX = searchPressed ? 1 : 0;

  return (
    <View style={{flex: CONDITIONAL_FLEX}}>
      <View style={styles.container}>
        {!searchPressed && (
          <Icon
            name="api"
            size={25}
            color={Colors.THEME_TEXT}
            style={styles.icon}
            onPress={() => drawerNavigation.openDrawer()}
          />
        )}
        {!searchPressed && (
          <Icon
            name={route === 'WISHLIST' ? 'shopping-cart' : 'search'}
            size={25}
            color={Colors.THEME_TEXT}
            style={styles.icon}
            onPress={() => {
              if (route === 'WISHLIST') {
                navigation.navigate('Cart');
              } else {
                setSearchPressed(true);
                setTimeout(() => searchRef.current?.focus(), 100);
                isSearch && isSearch(true);
              }
            }}
          />
        )}
        {searchPressed && (
          <View style={styles.searchContainer}>
            <Icon
              name="search"
              size={25}
              color={Colors.THEME_TEXT}
              style={styles.openIcon}
            />
            <TextInput
              ref={searchRef}
              onChangeText={callAPI}
              style={styles.searchInput}
            />
            <Icon
              name="close"
              size={25}
              color={Colors.THEME_TEXT}
              style={styles.openIcon}
              onPress={() => {
                setSearchPressed(false);
                isSearch && isSearch(false);
              }}
            />
          </View>
        )}
      </View>
      {searchPressed && (
        <ScrollView
          style={styles.searchResultContainer}
          keyboardShouldPersistTaps="handled">
          {data?.products.length > 0 && (
            <Text style={styles.searchResultTitle}>Products</Text>
          )}
          {renderSearch(data?.products, 'ProductDetails')}
          {data?.categories.length > 0 && (
            <Text style={styles.searchResultTitle}>Categories</Text>
          )}
          {renderSearch(data?.categories, 'CategoryDetails')}
          {data?.companies.length > 0 && (
            <Text style={styles.searchResultTitle}>Brands</Text>
          )}
          {renderSearch(data?.companies, 'CompanyDetails')}
        </ScrollView>
      )}
    </View>
  );
};

export default HomeToolbar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginVertical: 20,
  },
  icon: {backgroundColor: Colors.THEME_PRIMARY, borderRadius: 10, padding: 5},
  openIcon: {
    backgroundColor: Colors.THEME_SECONDARY,
    borderRadius: 0,
    padding: 5,
  },
  searchContainer: {
    flexDirection: 'row',
    flex: 1,
    borderRadius: 10,
    overflow: 'hidden',
  },
  searchInput: {
    backgroundColor: Colors.THEME_SECONDARY,
    flex: 1,
    height: 35,
    color: Colors.THEME_TEXT,
  },
  searchResultContainer: {
    backgroundColor: Colors.THEME_PRIMARY,
    marginBottom: 80,
  },
  searchResultTitle: {
    color: Colors.THEME_TEXT,
    fontWeight: 'bold',
    fontSize: 24,
    marginVertical: 25,
    marginHorizontal: 20,
  },
  resultItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.THEME_PRIMARY,
    paddingHorizontal: 20,
    marginVertical: 0.5,
    paddingVertical: 10,
  },
  resultItemImage: {height: 75, width: 75, resizeMode: 'contain'},
  resultItemName: {
    color: Colors.THEME_TEXT,
    marginLeft: 20,
    fontWeight: 'bold',
    fontSize: 16,
    flexShrink: 1,
  },
});
