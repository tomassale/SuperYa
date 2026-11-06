import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors'
import FontSize from '@/constants/Hierarchies'
import { useSetCartItems } from '@/context/CartContext'
import parseInputNumber from '../../../utils/ComaReplace';
import { moderateScale, verticalScale } from '@/utils/Responsive'

type FieldErrors = { name: boolean; quantity: boolean; price: boolean }

const isPositive = (value: number | null): value is number => value !== null && value > 0

type AddItem = {
  name: string
  quantity: string
  price: string
  setName: (val: string) => void
  setQuantity: (val: string) => void
  setPrice: (val: string) => void
  setErrors: (errors: FieldErrors) => void
  onAddSuccess?: () => void
}

export default function ButtonAdd({
  name,
  quantity,
  price,
  setName,
  setQuantity,
  setPrice,
  setErrors,
  onAddSuccess,
}: Readonly<AddItem>) {

  const setCartItems = useSetCartItems()

  const handleSubmit = () => {
    const parsedQuantity = parseInputNumber(quantity)
    const parsedPrice = parseInputNumber(price)

    // Un NaN o un negativo romperían el total y el guardado de la compra.
    if (name.trim() === '' || !isPositive(parsedQuantity) || !isPositive(parsedPrice)) {
      setErrors({
        name: name.trim() === '',
        quantity: !isPositive(parsedQuantity),
        price: !isPositive(parsedPrice),
      })
      return
    }

    setCartItems(prev => [
      ...prev,
      {
        // Date.now() da un id único aunque se borren items (prev.length los colisiona).
        id: Date.now(),
        name: name.trim(),
        quantity: parsedQuantity,
        price: parsedPrice
      }
    ])
    setName('')
    setQuantity('')
    setPrice('')
    setErrors({ name: false, quantity: false, price: false })
    onAddSuccess?.()
  }

  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={handleSubmit}>
        <Text style={styles.text}>Agregar</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.botones,
    width: moderateScale(200),
    borderRadius: 15,
    margin: 'auto',
    marginTop: verticalScale(30)
  },
  button: {
    borderRadius: 10,
    paddingVertical: verticalScale(10)
  },
  text: {
    textAlign: 'center',
    fontSize: FontSize.button,
    fontWeight: '600'
  }
})