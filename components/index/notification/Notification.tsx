import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { Text, StyleSheet, Animated } from 'react-native'
import { moderateScale, verticalScale, scaleFont } from '@/utils/Responsive'

export type ToastHandle = {
  show: () => void
}

const Toast = forwardRef<ToastHandle>((_props, ref) => {
  // El estado y el timer viven acá adentro: mostrar el toast no re-renderiza la home.
  const [visible, setVisible] = useState(false)
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const opacity = useRef(new Animated.Value(0)).current
  const translateX = useRef(new Animated.Value(30)).current

  useImperativeHandle(ref, () => ({
    show: () => {
      if (hideTimer.current) clearTimeout(hideTimer.current)
      setVisible(true)
      hideTimer.current = setTimeout(() => setVisible(false), 2500)
    },
  }), [])

  // Limpia el timer si el componente se desmonta con el toast visible.
  useEffect(() => () => {
    if (hideTimer.current) clearTimeout(hideTimer.current)
  }, [])

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: visible ? 1 : 0,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(translateX, {
        toValue: visible ? 0 : 30,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start()
  }, [opacity, translateX, visible])

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.container,
        {
          opacity,
          transform: [{ translateX }],
        },
      ]}
    >
      <Text style={styles.text}>Producto agregado</Text>
    </Animated.View>
  )
})

Toast.displayName = 'Toast'

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: verticalScale(50),
    right: moderateScale(5),
    backgroundColor: 'rgb(122, 189, 108)',
    paddingVertical: verticalScale(12),
    paddingHorizontal: moderateScale(16),
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    zIndex: 9999,
    elevation: 8,
  },
  text: {
    color: 'white',
    fontSize: scaleFont(16),
    fontWeight: '600',
  },
})

export default Toast