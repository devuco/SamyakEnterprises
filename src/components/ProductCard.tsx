import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {Colors, Singleton} from '../utils';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type Props = {
  item: ICartProduct;
  onAddProduct?: () => void;
  onSubtractProduct?: () => void;
  canUpdateQuantity: boolean;
  showPrice?: boolean;
  showQuantity?: boolean;
  showDiscount?: boolean;
  containerStyle?: ViewStyle;
};

const ProductCard: React.FC<Props> = ({
  item,
  onAddProduct: addProduct,
  onSubtractProduct: subtractProduct,
  canUpdateQuantity,
  showPrice = true,
  showQuantity = true,
  showDiscount = true,
  containerStyle,
}) => {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();

  const {product, quantity, total} = item;
  const {
    name: pName,
    price: pPrice,
    discount: pDiscount,
    image: pImage,
    color: pColor,
    discountedPrice: pDiscountedPrice,
    _id: p_id,
  } = product ?? {};
  return (
    <View style={[styles.itemContainer, containerStyle]}>
      {/* Column 1 contains Image */}
      <View
        style={[
          styles.itemColumn1,
          {
            backgroundColor: pColor,
          },
        ]}>
        <Image
          source={{uri: Singleton.BASE_URL + pImage}}
          style={[styles.itemImage]}
        />
      </View>

      {/* Column 2 contains name price discount and viewText */}
      <View style={styles.itemColumn2}>
        <Text style={styles.itemName}>{pName}</Text>
        <View style={styles.itemPriceContainer}>
          <Text style={styles.itemDiscountedPrice}>₹{pDiscountedPrice}</Text>
          {showPrice && (pDiscount ?? 0) > 0 && (
            <Text style={styles.itemPrice}>₹{pPrice}</Text>
          )}
        </View>
        {showDiscount && (pDiscount ?? 0) > 0 && (
          <Text style={styles.itemDiscount}>{pDiscount}%off</Text>
        )}
        {canUpdateQuantity && (
          <Text
            style={styles.itemViewProduct}
            onPress={() =>
              navigation.push('ProductDetails', {
                id: p_id,
              })
            }>
            View Product
          </Text>
        )}
      </View>

      {/* Column 3 contains Total Text and Quanity Button*/}
      <View style={styles.itemColumn3}>
        <Text style={styles.itemTotal}>₹{total}</Text>
        <View style={styles.itemQuantityContainer}>
          {canUpdateQuantity && (
            <TouchableOpacity
              onPress={addProduct}
              style={styles.itemQuantityButton}>
              <Text>-</Text>
            </TouchableOpacity>
          )}
          {!canUpdateQuantity && showQuantity && (
            <Text style={styles.itemQuantity}>{'QTY:'}</Text>
          )}
          <Text style={styles.itemQuantity}>{quantity}</Text>
          {canUpdateQuantity && (
            <TouchableOpacity
              onPress={subtractProduct}
              style={styles.itemQuantityButton}>
              <Text>+</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    borderRadius: 12,
    borderColor: Colors.THEME_SECONDARY,
    overflow: 'hidden',
    margin: 10,
  },
  itemColumn1: {
    overflow: 'hidden',
    borderRadius: 12,
    justifyContent: 'center',
  },
  itemImage: {
    height: 'auto',
    width: 100,
    aspectRatio: 1,
    borderRadius: 12,
    resizeMode: 'cover',
  },
  itemColumn2: {
    flex: 1,
    marginHorizontal: 8,
    justifyContent: 'space-evenly',
  },
  itemName: {
    color: Colors.THEME_TEXT,
    fontWeight: 'bold',
  },
  itemPriceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemDiscountedPrice: {
    color: Colors.THEME_TEXT,
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 5,
  },
  itemPrice: {
    color: Colors.DARK_GREY,
    textDecorationLine: 'line-through',
    marginRight: 5,
  },
  itemDiscount: {
    color: Colors.DISCOUNT_GREEN,
    marginRight: 5,
    fontWeight: 'bold',
    flexShrink: 1,
  },
  itemViewProduct: {
    color: Colors.PRIMARY,
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
  itemColumn3: {
    marginVertical: 5,
    justifyContent: 'space-evenly',
    marginRight: 5,
  },
  itemTotal: {
    color: Colors.THEME_TEXT,
    alignSelf: 'flex-end',
    fontWeight: 'bold',
    fontSize: 18,
  },
  itemQuantityContainer: {flexDirection: 'row'},
  itemQuantityButton: {
    backgroundColor: Colors.PRIMARY,
    borderRadius: 10,
    height: 20,
    width: 20,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  itemQuantity: {
    color: Colors.THEME_TEXT,
    marginHorizontal: 10,
    fontWeight: 'bold',
  },
});
