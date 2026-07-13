import { StyleSheet, View } from 'react-native'
import React from 'react'
import { ArrayCart } from '@/interfaces/ItemsInterfaces'
import Colors from '@/constants/Colors'
import ItemDetails from './items/ItemDetails'
import ItemFunctions from './items/ItemFunctions'
import { moderateScale, verticalScale } from '@/utils/Responsive'

export default function Items({items}: Readonly<ArrayCart>) {

  return (
    <View style={styles.container}>
      {items.map((item, index: number) => (
        <View key={index} style={styles.itemRow}>
          <ItemDetails 
            id={item.id}
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
    padding: moderateScale(10),
  },
  itemRow:{
    backgroundColor: Colors.input,
    margin: moderateScale(5),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: verticalScale(15)
  },
})