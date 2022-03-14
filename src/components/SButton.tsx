import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Colors from '../utils/Colors';

interface props {
  title: string;
}

const SButton = ({title}: props) => {
  return (
    <Text
      style={{
        color: Colors.WHITE,
        backgroundColor: Colors.PRIMARY,
        marginBottom: 20,
        textAlign: 'center',
        marginHorizontal: 20,
        borderRadius: 14,
        paddingVertical: 12,
        fontSize: 16,
        fontWeight: '500',
      }}>
      {title}
    </Text>
  );
};

export default SButton;

const styles = StyleSheet.create({});
