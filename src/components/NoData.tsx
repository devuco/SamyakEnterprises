import {
  Dimensions,
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {Colors} from '../utils';

type Props = {
  image: ImageSourcePropType;
  heading: string;
  description?: string;
};
const NoData: React.FC<Props> = ({image, heading, description}) => (
  <View style={styles.parent}>
    <Image style={styles.image} source={image} />
    <Text style={styles.heading}>{heading}</Text>
    <Text style={styles.description}>{description}</Text>
  </View>
);

export default NoData;

const styles = StyleSheet.create({
  parent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: Dimensions.get('window').width / 1.5,
    height: 'auto',
    aspectRatio: 1,
  },
  heading: {
    color: Colors.PRIMARY,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    color: Colors.THEME_TEXT,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
