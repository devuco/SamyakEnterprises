import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from '../utils/Colors';

const TabBar = ({state, navigation}) => {
  const [selected, setSelected] = useState('Home');
  const {routes} = state;
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'absolute',
        bottom: 0,
        backgroundColor: Colors.WHITE,
        left: 0,
        right: 0,
        marginHorizontal: 20,
        borderRadius: 15,
        paddingVertical: 10,
        paddingHorizontal: 10,
      }}>
      {routes.map((el, index) => {
        return (
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              backgroundColor:
                el.name === selected ? Colors.SECONDARY : 'white',
              borderRadius: 15,
              alignItems: 'center',
              paddingVertical: 10,
              paddingHorizontal: 15,
            }}
            onPress={() => {
              setSelected(el.name);
              if (state.index !== index) navigation.navigate(el.name);
            }}
            key={el.key}>
            <Icon
              name={el.params.icon}
              color={el.name === selected ? Colors.PRIMARY : '#cbcbcb'}
              size={25}
            />
            {el.name === selected && (
              <Text
                style={{
                  color: Colors.PRIMARY,
                  marginLeft: 5,
                  fontWeight: '700',
                }}>
                {el.name}
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
