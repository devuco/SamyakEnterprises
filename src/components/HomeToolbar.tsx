import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from '../utils/Colors';
import {useNavigation} from '@react-navigation/native';
import {TextInput} from 'react-native-gesture-handler';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {Api} from '../service/Api';
import ISearch from '../types/ISearch';
import {ICategories, ICompanies, IProducts} from '../types';
import {Singleton} from '../utils';

interface Props {
  isSearch: CallableFunction;
}
const HomeToolbar: React.FC<Props> = ({isSearch}) => {
  const navigation = useNavigation<DrawerNavigationProp<any>>();
  const [searchPressed, setSearchPressed] = useState<boolean>(false);
  const [data, setData] = useState<ISearch>(null);
  const searchRef = useRef(null);

  const callAPI = (input: string) => {
    Api.searchProducts(input)
      .then(response => setData(response.data))
      .catch(err => console.log('search err', err.response.data));
  };

  const renderSearch = (
    itemArray: Array<
      IProducts | ICategories['data'][0] | ICompanies['data'][0]
    >,
  ) => {
    return itemArray?.map(
      (item: IProducts | ICategories['data'][0] | ICompanies['data'][0]) => {
        return (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: Colors.THEME_PRIMARY,
              paddingHorizontal: 20,
              marginVertical: 0.5,
              paddingVertical: 10,
            }}>
            <Image
              source={{uri: Singleton.BASE_URL + item.image}}
              style={{height: 75, width: 75, resizeMode: 'contain'}}
            />
            <Text style={{color: Colors.THEME_TEXT, marginLeft: 20}}>
              {item.name}
            </Text>
          </View>
        );
      },
    );
  };

  return (
    <View style={{flex: searchPressed === true ? 1 : 0}}>
      <View style={styles.container}>
        {!searchPressed && (
          <Icon
            name="api"
            size={25}
            color={Colors.THEME_TEXT}
            style={styles.icon}
            onPress={() => {
              navigation.openDrawer();
            }}
          />
        )}
        {!searchPressed && (
          <Icon
            name="search"
            size={25}
            color={Colors.THEME_TEXT}
            style={styles.icon}
            onPress={() => {
              setSearchPressed(true);
              setTimeout(() => {
                searchRef.current.focus();
              }, 100);
              isSearch(true);
            }}
          />
        )}
        {searchPressed && (
          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              borderRadius: 10,
              overflow: 'hidden',
            }}>
            <Icon
              name="search"
              size={25}
              color={Colors.THEME_TEXT}
              style={styles.openIcon}
            />
            <TextInput
              ref={searchRef}
              onChangeText={text => callAPI(text)}
              style={{
                backgroundColor: Colors.THEME_SECONDARY,
                flex: 1,
                height: 35,
                color: Colors.THEME_TEXT,
              }}
            />
            <Icon
              name="close"
              size={25}
              color={Colors.THEME_TEXT}
              style={styles.openIcon}
              onPress={() => {
                setSearchPressed(false);
                isSearch(false);
              }}
            />
          </View>
        )}
      </View>
      {searchPressed && (
        <ScrollView
          style={{
            backgroundColor: Colors.THEME_SECONDARY,
            marginBottom: 80,
          }}>
          {data?.products.length > 0 && (
            <Text style={styles.searchTitle}>Products</Text>
          )}
          {renderSearch(data?.products)}
          {data?.categories.length > 0 && (
            <Text style={styles.searchTitle}>Categories</Text>
          )}
          {renderSearch(data?.categories)}
          {data?.companies.length > 0 && (
            <Text style={styles.searchTitle}>Brands</Text>
          )}
          {renderSearch(data?.companies)}
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
  icon: {backgroundColor: Colors.THEME_SECONDARY, borderRadius: 10, padding: 5},
  openIcon: {
    backgroundColor: Colors.THEME_SECONDARY,
    borderRadius: 0,
    padding: 5,
  },
  searchTitle: {
    color: Colors.THEME_TEXT,
    fontWeight: 'bold',
    fontSize: 24,
    marginVertical: 25,
    marginHorizontal: 20,
  },
});
