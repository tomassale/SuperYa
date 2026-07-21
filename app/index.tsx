import { StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useEffect, useRef, useState } from 'react'
import Toast from '@/components/index/notification/Notification'
import Calculator from '@/components/index/calculator/Calculator'
import History from '@/components/index/history/History'
import ShoppingList from '@/components/index/shoppingList/ShoppingList'
import CartIcon from '@/components/index/cartIcon/CartIcon'
import Form from '@/components/index/form/Form'
import Colors from '@/constants/Colors'
import { moderateScale } from '@/utils/Responsive'

export default function Page() {
  const [toastVisible, setToastVisible] = useState(false)
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleItemAdded = () => {
    if (toastTimer.current) {
      clearTimeout(toastTimer.current)
    }
    setToastVisible(true)
    toastTimer.current = setTimeout(() => {
      setToastVisible(false)
    }, 2500)
  }

  useEffect(() => {
    return () => {
      if (toastTimer.current) {
        clearTimeout(toastTimer.current)
      }
    }
  }, [])

  return (
    <SafeAreaView style={styles.screen} edges={['top', 'left', 'right']}>
      <Toast visible={toastVisible} />
      <View style={styles.container}>
        <View style={styles.main}>
          <History />
          <ShoppingList />
          <Form onItemAdded={handleItemAdded} />
          <CartIcon />
          <Calculator />
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    position: 'relative',
    padding: moderateScale(24),
    backgroundColor: Colors.fondo,
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  main: {
    flex: 1,
    width: '100%',
    position: 'relative',
  },
})