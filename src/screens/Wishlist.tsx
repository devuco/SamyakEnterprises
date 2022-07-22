import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import Api from '../service/Api';
import ParentView from '../components/ParentView';
import {FlatList} from 'react-native-gesture-handler';
import {Colors, Singleton} from '../utils';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ProductCard from '../components/ProductCard';
import {useFocusEffect} from '@react-navigation/native';

const Wishlist = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<Array<IProducts>>([]);
  useFocusEffect(
    useCallback(() => {
      setIsLoading(true);
      Api.getWishlist()
        .then(res => setData(res.data.data.products))
        .finally(() => setIsLoading(false));
    }, []),
  );
  return (
    <ParentView isLoading={isLoading}>
      <View style={{flex: 1, backgroundColor: Colors.THEME_PRIMARY}}>
        <FlatList
          style={{marginTop: 10}}
          data={data}
          renderItem={({item}) => (
            <View
              style={{
                flexDirection: 'row',
                margin: 10,
                elevation: 5,
                borderRadius: 8,
                backgroundColor: Colors.WHITE,
              }}>
              <Image
                source={{uri: Singleton.BASE_URL + item.image}}
                style={{width: 100, height: 100}}
              />
              <Text
                style={{
                  color: Colors.THEME_TEXT,
                  alignSelf: 'center',
                  marginLeft: 15,
                }}>
                {item.name}
              </Text>
            </View>
          )}
        />
      </View>
    </ParentView>
  );
};

export default Wishlist;

const styles = StyleSheet.create({});
