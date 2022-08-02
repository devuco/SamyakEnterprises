import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import Api from '../service/Api';
import ParentView from '../components/ParentView';
import {FlatList} from 'react-native-gesture-handler';
import {Colors, Singleton} from '../utils';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import HomeToolbar from '../components/HomeToolbar';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

const Wishlist = () => {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<Array<IProducts>>([]);

  useFocusEffect(
    useCallback(() => {
      if (Singleton.FETCH_WISHLIST) {
        setIsLoading(true);
        Api.getWishlist()
          .then(res => {
            setData(res.data.data.products);
            Singleton.FETCH_WISHLIST = false;
          })
          .finally(() => setIsLoading(false));
      } else {
        setIsLoading(false);
      }
    }, []),
  );

  /**
   * Triggers API to remove product from user's wishlist
   * @param id id of the product
   */
  const removeFromWishlist = (id: string) => {
    setIsLoading(true);
    Api.updateWishList(id)
      .then(res => {
        setData(res.data.data.products);
        Singleton.FETCH_HOME = true;
        Singleton.FETCH_PRODUCT = true;
      })
      .finally(() => setIsLoading(false));
  };

  /**
   * returns a component when the wishlist is empty
   */
  const listEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No items in wishlist</Text>
    </View>
  );

  return (
    <ParentView isLoading={isLoading}>
      <HomeToolbar route={'WISHLIST'} />
      <View style={styles.parent}>
        <FlatList
          data={data}
          renderItem={({item}) => (
            <Pressable
              style={styles.itemContainer}
              onPress={() =>
                navigation.navigate('ProductDetails', {id: item._id})
              }>
              <Image
                source={{uri: Singleton.BASE_URL + item.image}}
                style={[styles.itemImage, {backgroundColor: item.color}]}
              />
              <Text style={styles.itemName}>{item.name}</Text>
              <Text
                style={[
                  styles.itemName,
                  styles.itemPrice,
                ]}>{`₹${item.price}`}</Text>
              <Icon
                name="delete"
                size={20}
                color={Colors.THEME_TEXT}
                style={styles.deleteIcon}
                onPress={() => removeFromWishlist(item._id)}
              />
            </Pressable>
          )}
          ListEmptyComponent={listEmptyComponent}
        />
      </View>
    </ParentView>
  );
};

export default Wishlist;

const styles = StyleSheet.create({
  parent: {flex: 1, backgroundColor: Colors.THEME_PRIMARY, paddingBottom: 10},
  itemContainer: {
    flexDirection: 'row',
    margin: 10,
    elevation: 5,
    borderRadius: 12,
    backgroundColor: Colors.THEME_PRIMARY,
  },
  itemImage: {width: 100, height: 100, borderRadius: 12},
  itemName: {
    flex: 1,
    color: Colors.THEME_TEXT,
    alignSelf: 'center',
    marginLeft: 15,
    fontWeight: 'bold',
  },
  itemPrice: {textAlign: 'right'},
  deleteIcon: {margin: 10},
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: Colors.THEME_TEXT,
    fontSize: 18,
    fontWeight: '600',
  },
});
