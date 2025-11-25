import { StyleSheet, View } from 'react-native'
import React from 'react'
import { ArrayCart } from '@/interfaces/ItemsInterfaces'
import Colors from '@/constants/Colors'
import ItemDetails from './items/ItemDetails'
import ItemFunctions from './items/ItemFunctions'

export default function Items({items}: Readonly<ArrayCart>) {

  return (
    <View style={styles.container}>
      {items.map((item, index: number) => (
        <View key={item.id} style={styles.itemRow}>
          <ItemDetails 
            id={index}
            name={item.name} 
            quantity={item.quantity} 
            price={item.price}
          />
          <ItemFunctions itemId={item.id}/>
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  itemRow:{
    backgroundColor: Colors.input,
    margin: 5,
    flexDirection: 'row',
    paddingVertical: 15
  },
})