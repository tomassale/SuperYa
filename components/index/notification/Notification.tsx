import React, { useEffect, useRef } from 'react'
import { Text, StyleSheet, Animated } from 'react-native'

type ToastProps = {
  readonly visible: boolean
}

const Toast = ({ visible }: ToastProps) => {
  const opacity = useRef(new Animated.Value(0)).current
  const translateX = useRef(new Animated.Value(30)).current

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
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 50,
    right: 5,
    backgroundColor: 'rgb(122, 189, 108)',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
})

export default Toast