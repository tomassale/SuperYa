import { StyleSheet, Text } from 'react-native'
import { Link } from 'expo-router'
import React from 'react'
import Colors from '@/constants/Colors'
import FontSize from '@/constants/Hierarchies'
import { useCart } from '@/context/CartContext'

export default function ButtonFinish() {

  const { setCartItems } = useCart()
  const handleClearCart = () => setCartItems([])

  return (
    <Link href="/Finish" style={styles.button} onPress={handleClearCart}>
      <Text style={styles.text}>Finalizar compra</Text>
    </Link>
  )
}

const styles = StyleSheet.create({
  button:{
    padding: 10,
    fontSize: FontSize.button,
    backgroundColor: Colors.botones,
    margin: 'auto',
    marginTop: 40,
    marginBottom: 100,
    borderRadius: 20
  },
  text:{
    fontSize: 30
  }
})