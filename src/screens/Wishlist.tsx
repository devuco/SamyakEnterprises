import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import Api from '../service/Api';
import ParentView from '../components/ParentView';
import {FlatList} from 'react-native-gesture-handler';
import {Colors, Singleton} from '../utils';
import {useFocusEffect} from '@react-navigation/native';
import HomeToolbar from '../components/HomeToolbar';

const Wishlist = () => {
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
  return (
    <ParentView isLoading={isLoading}>
      <HomeToolbar route={'WISHLIST'} />
      <View style={styles.parent}>
        <FlatList
          data={data}
          renderItem={({item}) => (
            <View style={styles.itemContainer}>
              <Image
                source={{uri: Singleton.BASE_URL + item.image}}
                style={[styles.itemImage, {backgroundColor: item.color}]}
              />
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemName}>{`₹${item.price}`}</Text>
            </View>
          )}
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
    color: Colors.THEME_TEXT,
    alignSelf: 'center',
    marginLeft: 15,
    fontWeight: 'bold',
  },
});
