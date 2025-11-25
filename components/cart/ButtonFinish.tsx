import { StyleSheet, Text } from 'react-native'
import { Link } from 'expo-router'
import React from 'react'
import Colors from '@/constants/Colors'
import FontSize from '@/constants/Hierarchies'
import { useCart } from '@/context/CartContext'
import { storeData } from '@/utils/HistoryUtils'

export default function ButtonFinish() {

  const { cartItems, setCartItems, totalPrice } = useCart();

  const handleClearCart = async () =>{
    try{
      await storeData({ items: cartItems, finalPrice: totalPrice });
      setCartItems([]);
    } catch(e){
      console.error("Error al guardar el historial: ", e);
    }
  }

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
    borderRadius: 20,
    
  },
  text:{
    fontSize: 30
  }
})