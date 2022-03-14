import {getTabBarHeight} from '@react-navigation/bottom-tabs/lib/typescript/src/views/BottomTabBar';
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
import Icon from 'react-native-vector-icons/MaterialIcons';
import HomeToolbar from '../components/HomeToolbar';
import {Api} from '../service/Api';
import IProducts from '../types/IProducts';
import Colors, {isDarkMode} from '../utils/Colors';

const Home = ({navigation}) => {
  const [response, setResponse] = useState<Array<IProducts>>([]);
  useEffect(() => {
    Api.getProducts()
      .then(async res => {
        await Promise.all(
          res.data.map(async (el, index) => {
            const image = 'http://192.168.0.109:3000/' + el.image;
            const bgColor = await getBackgroundColor(image);
            res.data[index].bgColor = bgColor;
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

  const renderItems = ({item, index}) => {
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
        <Image
          source={{
            uri:
              //  'https://i.pinimg.com/originals/62/98/b0/6298b026a65cf80bcf9dce061e9b79c9.png',
              'http://192.168.0.109:3000/' + item.image,
          }}
          style={styles.itemImage}
        />
        <View style={styles.itemBottomContainer}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemPrice}>{item.description}</Text>
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
    color: 'grey',
    alignSelf: 'center',
    margin: 5,
    fontWeight: '900',
    fontSize: 16,
  },
  itemPrice: {
    color: 'grey',
    alignSelf: 'center',
    textAlign: 'center',
    marginBottom: 5,
    fontWeight: '700',
  },
});
