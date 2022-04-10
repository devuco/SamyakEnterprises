import {StyleSheet, Text, View} from 'react-native';
import React, {useRef, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from '../utils/Colors';
import {useNavigation} from '@react-navigation/native';
import {TextInput} from 'react-native-gesture-handler';

const HomeToolbar = () => {
  const navigation = useNavigation();
  const [searchPressed, setSearchPressed] = useState(false);
  const searchRef = useRef(null);
  return (
    <View>
      <View style={styles.container}>
        {!searchPressed && (
          <Icon
            name="api"
            size={25}
            color={Colors.THEME_TEXT}
            style={styles.icon}
            onPress={() => {
              navigation.openDrawer();
            }}
          />
        )}
        {!searchPressed && (
          <Icon
            name="search"
            size={25}
            color={Colors.THEME_TEXT}
            style={styles.icon}
            onPress={() => {
              setSearchPressed(true);
              setTimeout(() => {
                searchRef.current.focus();
              }, 100);
            }}
          />
        )}
        {searchPressed && (
          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              borderRadius: 10,
              overflow: 'hidden',
            }}>
            <Icon
              name="search"
              size={25}
              color={Colors.THEME_TEXT}
              style={[styles.icon, {borderRadius: 0}]}
              onPress={() => {
                setSearchPressed(true);
              }}
            />
            <TextInput
              ref={searchRef}
              style={{
                backgroundColor: Colors.THEME_SECONDARY,
                flex: 1,
                height: 35,
                color: Colors.THEME_TEXT,
              }}
            />
            <Icon
              name="close"
              size={25}
              color={Colors.THEME_TEXT}
              style={[styles.icon, {borderRadius: 0}]}
              onPress={() => {
                setSearchPressed(false);
              }}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default HomeToolbar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginVertical: 20,
  },
  icon: {backgroundColor: Colors.THEME_SECONDARY, borderRadius: 10, padding: 5},
});
