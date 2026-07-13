import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ArrayCart } from '@/interfaces/ItemsInterfaces';
import Colors from '@/constants/Colors';
import { moderateScale, verticalScale, scaleFont } from '@/utils/Responsive';

export default function FinalPrice({ items }: Readonly<ArrayCart> ) {

  let finalPrice: number = 0
  items.forEach((obj) => {
    finalPrice += obj.price * obj.quantity;
  })

  const precioFinal: string = finalPrice.toLocaleString('es-AR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })
  
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Final: ${precioFinal}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.input,
    margin: 'auto',
    marginTop: verticalScale(10),
    width: 'auto',
    height: 'auto',
    borderRadius: 10
  },
  text: {
    paddingHorizontal: moderateScale(20),
    fontSize: scaleFont(30)
  }
})