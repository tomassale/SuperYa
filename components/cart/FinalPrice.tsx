import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ArrayCart } from '@/interfaces/ItemsInterfaces';
import Colors from '@/constants/Colors';
import { formatPrice } from '@/utils/FormatPrice';
import { moderateScale, verticalScale, scaleFont } from '@/utils/Responsive';

export default function FinalPrice({ finalPrice }: Readonly<ArrayCart> ) {

  // El total ya viene calculado y memoizado desde CartContext (totalPrice); no lo recalculamos.
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Final: ${formatPrice(finalPrice)}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.input,
    alignSelf: 'flex-end',
    marginTop: verticalScale(10),
    marginRight: moderateScale(20),
    width: 'auto',
    height: 'auto',
    borderRadius: 10
  },
  text: {
    paddingHorizontal: moderateScale(20),
    fontSize: scaleFont(30)
  }
})