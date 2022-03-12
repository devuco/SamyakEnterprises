import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import IProducts from '../types/IProducts';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from '../utils/Colors';

const ProductDetails = ({route, navigation}) => {
  const item: IProducts = route.params.response;
  return (
    <View style={{flex: 1, backgroundColor: Colors.THEME_PRIMARY}}>
      <Icon
        name="arrow-back"
        color={'black'}
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
          source={{uri: 'http://192.168.0.104:3000/' + item.image}}
          style={{
            height: Dimensions.get('window').height / 3,
            width: '100%',
            aspectRatio: 1,
            alignSelf: 'center',
          }}
        />
      </View>
      <View style={{marginHorizontal: 20, marginTop: 20}}>
        <Text
          style={{color: Colors.THEME_TEXT, fontWeight: 'bold', fontSize: 18}}>
          {item.name}
        </Text>
      </View>
    </View>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({});
