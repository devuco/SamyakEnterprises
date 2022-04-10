import React, {useEffect, useRef, useState} from 'react';
import {Animated, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from '../utils/Colors';

const TabBar = ({state, navigation}) => {
  const [selected, setSelected] = useState('Home');
  const {routes} = state;
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [y, setY] = useState(0);
  const [transAnimation] = useState(new Animated.Value(0));

  const animate = (x: number) => {
    Animated.spring(transAnimation, {
      toValue: x,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: Colors.THEME_PRIMARY,
        marginHorizontal: 20,
        borderRadius: 15,
        paddingVertical: 10,
        paddingHorizontal: 10,
        position: 'absolute',
        alignSelf: 'center',
        bottom: 10,
        left: 0,
        right: 0,
      }}>
      <Animated.View
        style={{
          backgroundColor: Colors.SECONDARY,
          borderRadius: 15,
          width: width,
          height: height,
          position: 'absolute',
          transform: [{translateX: transAnimation}, {translateY: y}],
        }}
      />
      {routes.map((item: any, index: number) => {
        return (
          <TouchableOpacity
            onLayout={event => {
              const params = event.nativeEvent.layout;
              if (item.name === selected) {
                setWidth(params.width);
                setHeight(params.height);
                animate(params.x);
                setY(params.y);
              }
            }}
            style={{
              flexDirection: 'row',
              borderRadius: 15,
              alignItems: 'center',
              paddingVertical: 10,
              paddingHorizontal: 15,
            }}
            onPress={() => {
              setSelected(item.name);
              if (state.index !== index) navigation.navigate(item.name);
            }}
            key={item.key}>
            <Icon
              name={item.params.icon}
              color={item.name === selected ? Colors.PRIMARY : '#cbcbcb'}
              size={25}
            />
            {item.name === selected && (
              <Text
                style={{
                  color: Colors.PRIMARY,
                  marginLeft: 5,
                  fontWeight: '700',
                }}>
                {item.name}
              </Text>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default TabBar;

const styles = StyleSheet.create({});