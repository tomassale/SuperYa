import { StyleSheet, Keyboard, Pressable } from 'react-native'
import React, { useState } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import ButtonAdd from './ButtonAdd'
import FormItem from './FormItem'

type FormProps = {
  readonly onItemAdded?: () => void
}

export default function Form({ onItemAdded }: Readonly<FormProps>) {
  const [name, setName] = useState('')
  const [quantity, setQuantity] = useState('')
  const [price, setPrice] = useState('')

  const input = [
    { id: 1, label: 'Producto', placeholder: 'Buscar...', keyboardType: 'text', name: name, setData: setName },
    { id: 2, label: 'Cantidad', placeholder: '0', keyboardType: 'numeric', name: quantity, setData: setQuantity },
    { id: 3, label: 'Precio', placeholder: '$', keyboardType: 'numeric', name: price, setData: setPrice },
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
          onAddSuccess={onItemAdded}
        />
      </KeyboardAwareScrollView>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    marginTop: 40,
  },
})
