import { StyleSheet, Text, TextInput, Keyboard, Pressable } from 'react-native'
import React, { useState } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Colors from '@/constants/Colors'
import ButtonAdd from './ButtonAdd'
import FontSize from '@/constants/Hierarchies'

export default function Form() {
  const [name, setName] = useState('')
  const [quantity, setQuantity] = useState('')
  const [price, setPrice] = useState('')

  return (
    <Pressable onPress={Keyboard.dismiss}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.container}
        enableOnAndroid={true}
        extraScrollHeight={40}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.label}>Producto</Text>
        <TextInput
          style={styles.input}
          placeholder='Buscar...'
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>Cantidad</Text>
        <TextInput
          style={styles.input}
          placeholder='0'
          value={quantity}
          keyboardType='numeric'
          onChangeText={setQuantity}
        />

        <Text style={styles.label}>Precio</Text>
        <TextInput
          style={styles.input}
          placeholder='$'
          value={price}
          keyboardType='numeric'
          onChangeText={setPrice}
        />

        <ButtonAdd 
          name={name} 
          quantity={quantity} 
          price={price}
          setName={setName}
          setQuantity={setQuantity}
          setPrice={setPrice}
        />
      </KeyboardAwareScrollView>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  label:{
    marginLeft: 30,
    fontSize: FontSize.label,
    alignSelf: 'flex-start'
  },
  input:{
    backgroundColor: Colors.input,
    width: 300,
    margin: 10,
    fontSize: FontSize.input,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8
  },
})
