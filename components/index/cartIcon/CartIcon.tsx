import { StyleSheet, Text, View, Image } from 'react-native'
import { Link } from 'expo-router'
import React from 'react'
import Colors from '@/constants/Colors'
import { useCart } from '@/context/CartContext'
import { moderateScale, verticalScale, scaleFont } from '@/utils/Responsive'

const ICON_SIZE = moderateScale(70)
const BADGE_SIZE = moderateScale(20)

export default function CartIcon() {

  const { cartItems } = useCart()
  const itemsQuantity: number = cartItems.length

  return (
    <View style={styles.container}>
      <Link href="/Cart">
        <Image style={styles.image} source={require("@/assets/img/IconApp.png")}/>
      </Link>
      <Text style={styles.number}>{itemsQuantity}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: verticalScale(30),
    right: moderateScale(4),
    width: ICON_SIZE,
    height: ICON_SIZE,
  },
  image:{
    height: ICON_SIZE,
    width: ICON_SIZE,
  },
  number: {
    position: 'absolute',
    top: -BADGE_SIZE / 4,
    right: -BADGE_SIZE / 4,
    minWidth: BADGE_SIZE,
    height: BADGE_SIZE,
    lineHeight: BADGE_SIZE,
    textAlign: 'center',
    fontSize: scaleFont(12),
    paddingHorizontal: moderateScale(4),
    borderRadius: BADGE_SIZE / 2,
    overflow: 'hidden',
    zIndex: 1,
    backgroundColor: Colors.numeroCart,
  }
})