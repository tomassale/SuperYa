import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Product } from '@/interfaces/ItemsInterfaces'

export default function ItemDetails({id, name, quantity, price}: Readonly<Product>) {

  const priceFixed : string = price.toLocaleString("es-AR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  })
  const priceMultiplied: string = (price * quantity).toLocaleString("es-AR", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })

  return (
    <View key={id} style={styles.container}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.quantity}>x{quantity}</Text>
      <View style={styles.prices}>
        <Text style={styles.price}>${priceFixed}</Text>
        <Text style={styles.priceSumarized}>${priceMultiplied}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center'
  },
  name:{
    marginLeft: 10,
    width: 115,
    fontSize: 20,
  },
  quantity:{
    width: 40,
    fontSize: 17.5
  },
  prices: { width: 100 },
  price: { fontSize: 20 },
  priceSumarized: { fontSize: 20 }
})