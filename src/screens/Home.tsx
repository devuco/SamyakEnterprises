import React, {useEffect} from 'react';
import {useState} from 'react';
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Api} from '../service/Api';
import IProducts from '../types/IProducts';
import Colors from '../utils/Colors';

const Home = () => {
  const [response, setResponse] = useState<Array<IProducts>>([]);
  useEffect(() => {
    Api.getProducts()
      .then(response => {
        setResponse(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  return (
    <View
      style={{
        backgroundColor: 'white',
        flex: 1,
      }}>
      <FlatList
        style={{paddingHorizontal: 10}}
        numColumns={2}
        data={response}
        renderItem={({item, index}) => {
          return (
            <View
              key={index}
              style={{
                backgroundColor: '#f8f8f8',
                flex: 1,
                alignItems: 'center',
                margin: 5,
                borderRadius: 20,
              }}>
              <Icon
                name="favorite"
                style={{alignSelf: 'flex-end', marginRight: 15, marginTop: 15}}
                size={25}
                color="#cbcbcb"
              />
              <Image
                source={{uri: 'http://192.168.0.108:3000/' + item.image}}
                style={{
                  height: 'auto',
                  width: '100%',
                  aspectRatio: 1,
                  resizeMode: 'contain',
                }}
              />
              <View
                style={{
                  backgroundColor: Colors.WHITE,
                  width: '95%',
                  borderBottomLeftRadius: 20,
                  borderBottomRightRadius: 20,
                  marginVertical: 5,
                }}>
                <Text
                  style={{
                    color: 'grey',
                    alignSelf: 'center',
                    margin: 5,
                    fontWeight: '900',
                    fontSize: 16,
                  }}>
                  {item.name}
                </Text>
                <Text
                  style={{
                    color: 'grey',
                    alignSelf: 'center',
                    textAlign: 'center',
                    marginBottom: 5,
                    fontWeight: '700',
                  }}>
                  {item.description}
                </Text>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
