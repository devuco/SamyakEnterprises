import {SafeAreaView, StyleSheet} from 'react-native';
import React from 'react';
import Loader from './Loader';
import {Colors} from '../utils';

type Props = {
  children: React.ReactNode;
  isLoading: boolean;
  text?: string;
};
const ParentView: React.FC<Props> = ({children, isLoading, text}) => (
  <SafeAreaView style={styles.parent}>
    {!isLoading && children}
    <Loader
      isLoading={isLoading}
      backgroundColor={Colors.THEME_PRIMARY}
      text={text}
    />
  </SafeAreaView>
);

export default ParentView;

const styles = StyleSheet.create({
  parent: {flex: 1, backgroundColor: Colors.THEME_PRIMARY},
});
