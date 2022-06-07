import React from 'react';
import {View, Text, TextInput, StyleSheet, Platform} from 'react-native';
import {Colors} from '../utils';
interface AddressInputProps {
  label: string;
  input: string | undefined;
  onChangeText: (text: string) => void;
  editable?: boolean;
  keyboardType?: 'default' | 'numeric';
}
const LabelledTextInput: React.FC<AddressInputProps> = ({
  label,
  input,
  onChangeText,
  editable = false,
  keyboardType,
}) => {
  const BORDER_WIDTH = 1;
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        value={input}
        onChangeText={onChangeText}
        style={[
          styles.input,
          editable && {
            borderColor: Colors.DARK_GREY,
            borderWidth: BORDER_WIDTH,
          },
        ]}
        editable={editable}
        multiline
        keyboardType={keyboardType}
      />
    </View>
  );
};

export default LabelledTextInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  label: {
    fontSize: 16,
    color: Colors.THEME_TEXT,
    fontWeight: 'bold',
    flex: 1,
    paddingHorizontal: 10,
  },
  input: {
    color: Colors.THEME_TEXT,
    flex: 2,
    paddingVertical: Platform.OS === 'android' ? 0 : 10,
    paddingHorizontal: 5,
    marginBottom: 10,
    borderRadius: 5,
    textAlignVertical: 'center',
  },
});
