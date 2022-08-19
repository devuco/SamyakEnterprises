import {Keyboard, StyleSheet, TextInput, View, ViewStyle} from 'react-native';
import React, {createRef, useEffect, useState} from 'react';
import {Colors} from '../utils';

type Props = {
  length: number;
  onCodeFilled: (code: string) => void;
  code?: string;
  style?: ViewStyle;
};
const OTPView: React.FC<Props> = ({length, onCodeFilled, code, style}) => {
  const array = [...Array(length)];
  const [otp, setOtp] = useState<Array<string>>([]);
  const [fCode, setFCode] = useState<Array<string>>([]);
  const inputRef = array.map(() => createRef<TextInput>());

  useEffect(() => {
    let tempArr: string[] = [];
    for (let i = 0; i < length; i++) {
      tempArr.push(code?.charAt(i) ?? '');
    }
    setFCode(tempArr);
  }, [code, length]);

  return (
    <View style={[styles.parent, style]}>
      {array.map((_item, index) => (
        <TextInput
          key={index}
          ref={inputRef[index]}
          style={styles.textInput}
          value={code ? fCode[index] : otp[index]}
          onChangeText={e => {
            setOtp(prev => {
              const arr: Array<string> = [...prev];
              arr[index] = e;
              if (index === length - 1) {
                if (arr[length - 1] !== '') {
                  Keyboard.dismiss();
                  let result = '';
                  arr.forEach(i => (result = result + i));
                  onCodeFilled(result);
                }
              }
              return arr;
            });
            if (inputRef[index + 1] && e !== '') {
              inputRef[index + 1].current?.focus();
            }
          }}
          onKeyPress={e => {
            if (
              e.nativeEvent.key === 'Backspace' &&
              inputRef[index - 1] &&
              !otp[index]
            ) {
              setOtp(prev => {
                const arr: Array<string> = [...prev];
                arr[index - 1] = '';
                inputRef[index - 1].current?.focus();
                return arr;
              });
            }
          }}
          maxLength={1}
          keyboardType="phone-pad"
        />
      ))}
    </View>
  );
};

export default OTPView;

const styles = StyleSheet.create({
  parent: {justifyContent: 'space-evenly', flexDirection: 'row', width: '100%'},
  textInput: {
    height: 45,
    width: 40,
    borderColor: Colors.PRIMARY,
    borderWidth: 3,
    color: Colors.THEME_TEXT,
    textAlign: 'center',
    fontSize: 16,
    borderRadius: 5,
  },
});
