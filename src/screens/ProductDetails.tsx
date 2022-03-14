import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import IProducts from '../types/IProducts';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from '../utils/Colors';
import {AirbnbRating} from 'react-native-ratings';
import SButton from '../components/SButton';

const ProductDetails = ({route, navigation}) => {
  const item: IProducts = route.params.response;
  const discountedPrice = item.price - (item.price * item.discount) / 100;

  const getStock = (stock: number) => {
    if (stock === 0) {
      return 'Out of Stock';
    } else if (stock <= 5) {
      return `Hurry! Only ${stock} left`;
    }
    return 'Available in Stock';
  };
  return (
    <View style={{flex: 1, backgroundColor: Colors.THEME_PRIMARY}}>
      <ScrollView>
        <Icon
          name="arrow-back"
          color={Colors.THEME_TEXT}
          style={{
            zIndex: 1,
            backgroundColor: item.bgColor,
            paddingLeft: 10,
            paddingTop: 20,
          }}
          size={25}
          onPress={() => navigation.goBack()}
        />
        <View
          style={{
            backgroundColor: item.bgColor,
            borderBottomRightRadius: 500,
            borderBottomLeftRadius: 500,
            paddingBottom: 50,
            width: Dimensions.get('window').width + 100,
            alignSelf: 'center',
          }}>
          <Image
            source={{uri: item.image}}
            style={{
              height: Dimensions.get('window').height / 3,
              width: '100%',
              aspectRatio: 1,
              alignSelf: 'center',
            }}
          />
        </View>
        <View
          style={{
            marginHorizontal: 20,
            marginTop: 20,
            flex: 1,
          }}>
          <Text
            style={{
              color: Colors.THEME_TEXT,
              fontWeight: 'bold',
              fontSize: 18,
            }}>
            {item.name}
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
            <AirbnbRating
              count={5}
              size={20}
              isDisabled
              defaultRating={item.avgRating || 0}
              ratingContainerStyle={{alignSelf: 'baseline', marginTop: -15}}
              reviewSize={0}
              selectedColor={Colors.STAR_YELLOW}
            />
            <Text
              style={{
                color: Colors.THEME_TEXT,
                marginBottom: 3,
                marginLeft: 20,
              }}>{`(${item.totalRatings} Reviews)`}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: Colors.THEME_TEXT,
                fontSize: 24,
                fontWeight: 'bold',
              }}>
              {`₹${discountedPrice}`}
            </Text>
            <Text
              style={{
                color: Colors.THEME_TEXT,
                textDecorationLine: 'line-through',
                marginLeft: 15,
                flex: 1,
              }}>
              {`₹${item.price}`}
            </Text>
            <Text
              style={{
                color: Colors.THEME_TEXT,
                fontWeight: 'bold',
                fontSize: 18,
              }}>
              {getStock(item.stock)}
            </Text>
          </View>
          <Text
            style={{
              color: Colors.THEME_TEXT,
              marginTop: 30,
              fontWeight: '600',
              fontSize: 18,
            }}>
            About
          </Text>
          <Text style={{color: Colors.THEME_TEXT, marginTop: 14}}>
            {item.description}
          </Text>
        </View>
      </ScrollView>
      <SButton title={'Add to cart'} />
    </View>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({});
