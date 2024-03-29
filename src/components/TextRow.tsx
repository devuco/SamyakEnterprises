import {Pressable, StyleSheet, Text, TextStyle, ViewStyle} from 'react-native';
import React from 'react';
import {Colors} from '../utils';

type Props = {
  texts: Array<string>;
  style?: ViewStyle;
  textStyle?: TextStyle;
  onPress?: () => void;
};
const TextRow: React.FC<Props> = ({texts, style, textStyle, onPress}) => {
  return (
    <Pressable style={[styles.Container, style]} onPress={onPress}>
      {texts.map((text, index) => {
        return (
          <Text style={[styles.Text, textStyle]} key={index}>
            {text}
          </Text>
        );
      })}
    </Pressable>
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
