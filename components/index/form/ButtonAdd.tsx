import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors'
import FontSize from '@/constants/Hierarchies'
import { useCart } from '@/context/CartContext'
import parseInputNumber from '../../../utils/ComaReplace';
import { moderateScale, verticalScale } from '@/utils/Responsive'

type FieldErrors = { name: boolean; quantity: boolean; price: boolean }

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

  const { setCartItems } = useCart()

  const handleSubmit = () => {
    const parsedPrice = parseInputNumber(price)

    // Marca cada input que quedó sin datos válidos.
    const errors: FieldErrors = {
      name: name.trim() === '',
      quantity: quantity.trim() === '',
      price: price.trim() === '' || parsedPrice === null,
    }

    const isValid = !errors.name && !errors.quantity && !errors.price

    if (isValid) {
      setCartItems(prev => [
        ...prev,
        {
          id: prev.length,
          name: name.trim(),
          quantity: Number(quantity),
          price: parsedPrice
        }
      ])
      setName('')
      setQuantity('')
      setPrice('')
      setErrors({ name: false, quantity: false, price: false })
      onAddSuccess?.()
    } else {
      setErrors(errors)
    }
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
    fontWeight: '700'
  }
})