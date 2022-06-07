import {StyleSheet, View, Animated} from 'react-native';
import React, {useEffect, useLayoutEffect, useRef} from 'react';
import {Colors} from '../utils';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LottieView from 'lottie-react-native';

type Props = {
  onPress: () => void;
};
const SuccessTick: React.FC<Props> = ({onPress}) => {
  const tickAnimation = useRef(new Animated.Value(0)).current;
  const textAnimation = useRef(new Animated.Value(0)).current;
  const buttonAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {}, []);

  useLayoutEffect(() => {
    Animated.spring(tickAnimation, {
      toValue: 1,
      useNativeDriver: true,
      speed: 2,
    }).start();
    Animated.timing(textAnimation, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
      delay: 500,
    }).start();
    Animated.timing(buttonAnimation, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
      delay: 1200,
    }).start();
  }, [tickAnimation, textAnimation, buttonAnimation, onPress]);

  return (
    <View style={styles.parent}>
      <Animated.View
        style={[styles.tick, {transform: [{scale: tickAnimation}]}]}>
        <Icon name="done" size={70} color={Colors.WHITE} />
      </Animated.View>
      <LottieView
        source={require('../assets/confetti.json')}
        autoPlay
        loop={false}
        speed={1}
        style={styles.confetti}
      />
      <Animated.Text style={[styles.text, {opacity: textAnimation}]}>
        {'YAY!\n Order Placed Successfully'}
      </Animated.Text>
      <Animated.Text
        style={[styles.button, {opacity: buttonAnimation}]}
        onPress={onPress}>
        {'Next'}
      </Animated.Text>
    </View>
  );
};

export default SuccessTick;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.THEME_PRIMARY,
  },
  tick: {
    backgroundColor: Colors.DISCOUNT_GREEN,
    alignSelf: 'center',
    padding: 30,
    borderRadius: 100,
  },
  confetti: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    transform: [{scale: 2}],
    bottom: 0,
  },
  text: {
    color: Colors.THEME_TEXT,
    alignSelf: 'center',
    marginTop: 30,
    fontWeight: 'bold',
    fontSize: 22,
    textAlign: 'center',
  },
  button: {
    backgroundColor: Colors.SECONDARY,
    paddingHorizontal: 20,
    paddingVertical: 5,
    textAlignVertical: 'center',
    color: Colors.PRIMARY,
    borderRadius: 18,
    borderColor: Colors.PRIMARY,
    borderWidth: 2,
    alignSelf: 'center',
    marginTop: 40,
    fontWeight: 'bold',
    fontSize: 22,
    textAlign: 'center',
    overflow: 'hidden',
  },
});
