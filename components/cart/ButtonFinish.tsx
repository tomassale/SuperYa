import { StyleSheet, Text } from 'react-native'
import { Link } from 'expo-router'
import React from 'react'
import Colors from '@/constants/Colors'
import FontSize from '@/constants/Hierarchies'
import { useCart } from '@/context/CartContext'
import { storeData } from '@/utils/HistoryUtils'
import { moderateScale, verticalScale, scaleFont } from '@/utils/Responsive'

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
    padding: moderateScale(10),
    fontSize: FontSize.button,
    backgroundColor: Colors.botones,
    margin: 'auto',
    marginTop: verticalScale(40),
    marginBottom: verticalScale(100),
    borderRadius: 20,

  },
  text:{
    fontSize: scaleFont(30)
  }
})