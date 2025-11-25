import { StyleSheet, View, Image, Pressable } from 'react-native'
import React from 'react'
import { useCart } from '@/context/CartContext'
import ItemUtils from '@/utils/ItemUtils'

export default function ItemFunctions({ itemId }: {itemId: number}) {

  const { cartItems, setCartItems }  = useCart()

  const utils = new ItemUtils(setCartItems, itemId)
  
  const functions = [
    { id: 1, function: utils.restar, img: require('@/assets/img/Minus.png')},
    { id: 2, function: utils.sumar, img: require('@/assets/img/Plus.png')},
    { id: 3, function: utils.borrar, img: require('@/assets/img/Trash.png')}
  ]
  
  return cartItems? (   
    <View style={styles.container}>
      {functions.map(obj => (
        <Pressable key={obj.id} onPress={obj.function}>
          <Image source={obj.img} style={styles.image}/>
        </Pressable>
      ))}
    </View>
  ) : null
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 15,
    height: 50,
    alignItems: 'center',
    margin: 'auto',
  },
  image:{
    height: 20,
    width: 20
  }
})