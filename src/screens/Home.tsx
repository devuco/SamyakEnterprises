import React, {useCallback, useEffect, useRef} from 'react';
import {useState} from 'react';
import {
  Appearance,
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
import IProducts from '../types/IProducts';
import Colors, {isDarkMode} from '../utils/Colors';

const Home = ({navigation}) => {
  const [response, setResponse] = useState<Array<IProducts>>([]);

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
        setResponse(res.data);
      })
      .catch(error => {
        console.log(error);
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

  interface props {
    item: IProducts;
    index: number;
  }
  const renderItems = ({item, index}: props) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('ProductDetails', {response: response[index]});
        }}
        key={index}
        style={[styles.itemContainer, {backgroundColor: item.bgColor}]}>
        <Icon
          name="favorite"
          style={styles.itemHeart}
          size={25}
          color="#808080"
        />
        <Image source={{uri: item.image}} style={styles.itemImage} />
        <View style={styles.itemBottomContainer}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemPrice}>{`₹${item.price}`}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.parent}>
      <HomeToolbar />
      <FlatList numColumns={2} data={response} renderItem={renderItems} />
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
  itemContainer: {
    flex: 1,
    alignItems: 'center',
    margin: 5,
    borderRadius: 20,
    overflow: 'hidden',
  },
  itemHeart: {alignSelf: 'flex-end', marginRight: 15, marginTop: 15},
  itemImage: {
    height: 'auto',
    width: '100%',
    aspectRatio: 1,
    resizeMode: 'contain',
  },
  itemBottomContainer: {
    backgroundColor: Colors.THEME_PRIMARY,
    width: '95%',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginVertical: 5,
  },
  itemName: {
    color: Colors.THEME_TEXT,
    alignSelf: 'center',
    textAlign: 'center',
    margin: 5,
    fontWeight: '900',
    fontSize: 16,
  },
  itemPrice: {
    color: Colors.THEME_TEXT,
    alignSelf: 'center',
    marginBottom: 5,
    marginLeft: 5,
    fontWeight: '700',
  },
});
