import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useEffect, useRef, useState } from 'react';
import Toast from '@/components/index/notification/Notification';
import Calculator from '@/components/index/calculator/Calculator';
import History from '@/components/index/history/History';
import CartIcon from '@/components/index/cartIcon/CartIcon';
import Form from '@/components/index/form/Form';
import Colors from '@/constants/Colors';
import FontSize from '@/constants/Hierarchies';

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
        <Text style={styles.title}>Super Ya</Text>
        <View style={styles.main}>
          <History />
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
    padding: 24,
    backgroundColor: Colors.fondo,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 24,
  },
  main: {
    flex: 1,
  },
  title: {
    fontSize: FontSize.title,
    color: Colors.titulo,
    textShadowColor: 'black',
    textShadowRadius: 7,
    marginTop: 50
  },
  subtitle: {
    fontSize: 36,
    color: '#38434D',
  },
});