import { StyleSheet, Text, View, Image, Animated } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useEffect, useRef } from 'react'
import Colors from '@/constants/Colors'
import { useRouter } from 'expo-router'
import { useCart } from '@/context/CartContext'
import { moderateScale, verticalScale, scaleFont } from '@/utils/Responsive'

export default function Finish() {

  const router = useRouter();
  const { setCartItems } = useCart();
  const opacity = useRef(new Animated.Value(0)).current

  useEffect(() => {
    // Vaciamos el carrito acá (no en el botón) para no cortar la navegación.
    setCartItems([])

    // El cartel aparece con fade, se mantiene 3s y se desvanece antes de volver.
    const animation = Animated.sequence([
      Animated.timing(opacity, { toValue: 1, duration: 400, useNativeDriver: true }),
      Animated.delay(2200),
      Animated.timing(opacity, { toValue: 0, duration: 400, useNativeDriver: true }),
    ])

    animation.start(({ finished }) => {
      if (finished) router.replace('/')
    })

    return () => animation.stop()
    // Solo al montar: no queremos re-disparar la secuencia en cada render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={[styles.main, { opacity }]}>
        <Image style={styles.image} source={require('@/assets/img/Check-circle.png')}/>
        <Text style={styles.text}>Compra Finalizada</Text>
      </Animated.View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.finalizado,
    flex: 1,
  },
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: verticalScale(20),
  },
  image: {
    width: moderateScale(120),
    height: moderateScale(120),
    resizeMode: 'contain',
  },
  text: {
    fontSize: scaleFont(30)
  }
})
