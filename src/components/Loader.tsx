import React from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {Colors} from '../utils';

interface Props {
  isLoading: boolean;
  backgroundColor?: string;
  text?: string;
}
const Loader: React.FC<Props> = ({isLoading, backgroundColor, text}) =>
  isLoading ? (
    <View
      style={[
        styles.loader,
        {
          backgroundColor: backgroundColor
            ? backgroundColor
            : Colors.TRANSLUCENT_GREY,
        },
      ]}>
      <ActivityIndicator size="large" color={Colors.PRIMARY} />
      <Text style={styles.text}>{text}</Text>
    </View>
  ) : null;

const styles = StyleSheet.create({
  loader: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    backgroundColor: '#00000020',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: Colors.PRIMARY,
    fontWeight: 'bold',
    textAlign: 'center',
    marginHorizontal: 20,
    marginVertical: 10,
  },
});

export default Loader;
