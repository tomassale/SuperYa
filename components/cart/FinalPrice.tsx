import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ArrayCart } from '@/interfaces/Items';
import Colors from '@/constants/Colors';

export default function FinalPrice({ items }: Readonly<ArrayCart> ) {

  let precioAcumulador = 0;
  
  items.forEach((obj) => {
    precioAcumulador += obj.price * obj.quantity;
  })

  const precioFinal: string = precioAcumulador.toLocaleString('es-AR', {
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
    marginTop: 10,
    width: 'auto',
    height: 'auto',
    borderRadius: 10
  },
  text: {
    paddingHorizontal: 20,
    fontSize: 30
  }
})