import { StyleSheet, View, Image, Pressable } from 'react-native'
import React from 'react'
import { useCart } from '@/context/CartContext'

const menosImg = require('@/assets/img/Minus.png')
const masImg = require('@/assets/img/Plus.png')
const trashImg = require('@/assets/img/Trash.png')

export default function ItemFunctions({ itemId }: {itemId: number}) {

  const { cartItems, setCartItems }  = useCart()

  const restar = () => {
    setCartItems(prev => (
      prev.map(obj => (
        obj.id === itemId
        ? { ...obj, quantity: Math.max(obj.quantity - 1, 1)}
        : obj
      ))
    ))
  }

  const sumar = () => {
    setCartItems(prev => (
      prev.map(obj =>(
        obj.id === itemId
        ? { ...obj, quantity: obj.quantity + 1}
        : obj
      ))
    ))
  }

  const borrar = () => {
    setCartItems(prev => prev.filter(item => item.id !== itemId))
  }
  
  const functions = [
    { id: 1, function: restar, img: menosImg},
    { id: 2, function: sumar, img: masImg},
    { id: 3, function: borrar, img: trashImg}
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