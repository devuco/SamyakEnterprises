import {StyleSheet, Text, View, ViewStyle} from 'react-native';
import React from 'react';
import {Colors} from '../utils';

type Props = {
  texts: Array<string>;
  style?: ViewStyle;
};
const TextRow: React.FC<Props> = ({texts, style}) => {
  return (
    <View style={[styles.Container, style]}>
      {texts.map((text, index) => {
        return (
          <Text style={styles.Text} key={index}>
            {text}
          </Text>
        );
      })}
    </View>
  );
};

export default TextRow;

const styles = StyleSheet.create({
  Container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    borderRadius: 12,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  Text: {
    color: Colors.THEME_TEXT,
    fontWeight: 'bold',
    fontSize: 18,
  },
});
