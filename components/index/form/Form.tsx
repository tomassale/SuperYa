import { StyleSheet, Keyboard, Pressable } from 'react-native'
import React, { useState } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import ButtonAdd from './ButtonAdd'
import FormItem from './FormItem'
import { verticalScale } from '@/utils/Responsive'

type FormProps = {
  readonly onItemAdded?: () => void
}

type FieldName = 'name' | 'quantity' | 'price'

export default function Form({ onItemAdded }: Readonly<FormProps>) {
  const [name, setName] = useState('')
  const [quantity, setQuantity] = useState('')
  const [price, setPrice] = useState('')
  // Marca en rojo el input que quedó sin datos al intentar agregar.
  const [errors, setErrors] = useState<Record<FieldName, boolean>>({
    name: false,
    quantity: false,
    price: false,
  })

  // Apenas el usuario escribe en un campo, le sacamos el error.
  const handleChange = (field: FieldName, setter: (val: string) => void) => (val: string) => {
    setter(val)
    setErrors(prev => (prev[field] ? { ...prev, [field]: false } : prev))
  }

  const input = [
    { id: 1, label: 'Producto', placeholder: 'Buscar...', keyboardType: 'text', name: name, setData: handleChange('name', setName), error: errors.name },
    { id: 2, label: 'Cantidad', placeholder: '0', keyboardType: 'numeric', name: quantity, setData: handleChange('quantity', setQuantity), error: errors.quantity },
    { id: 3, label: 'Precio', placeholder: '$', keyboardType: 'numeric', name: price, setData: handleChange('price', setPrice), error: errors.price },
  ]

  return (
    <Pressable onPress={Keyboard.dismiss}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.container}
        enableOnAndroid={true}
        extraScrollHeight={40}
        keyboardShouldPersistTaps="handled"
      >
        <FormItem data={input}/>
        <ButtonAdd
          name={name}
          quantity={quantity}
          price={price}
          setName={setName}
          setQuantity={setQuantity}
          setPrice={setPrice}
          setErrors={setErrors}
          onAddSuccess={onItemAdded}
        />
      </KeyboardAwareScrollView>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    marginTop: verticalScale(40),
  },
})
