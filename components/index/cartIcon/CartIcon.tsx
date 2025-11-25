import { StyleSheet, Text, View, Image } from 'react-native'
import { Link } from 'expo-router'
import React from 'react'
import Colors from '@/constants/Colors'
import { useCart } from '@/context/CartContext'

export default function CartIcon() {

  const { cartItems } = useCart()
  const itemsQuantity: number = cartItems.length

  return (
    <View style={styles.container}>
      <Text style={styles.number}>{itemsQuantity}</Text>
      <Link href="/Cart">
        <Image style={styles.image} source={require("@/assets/img/Icon.png")}/>
      </Link>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 30,
    right: 0,
  },
  image:{
    height: 70,
    width: 70
  },
  number: {
    width: 19,
    textAlign: 'center',
    position: 'absolute',
    fontSize: 12,
    zIndex: 1,
    bottom: 65,
    paddingRight: 2,
    marginLeft: 60,
    borderRadius: 10,
    backgroundColor: Colors.numeroCart,
  }
})