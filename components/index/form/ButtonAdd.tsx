import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors'
import FontSize from '@/constants/Hierarchies'
import { useCart } from '@/context/CartContext'

type AddItem = {
  name: string
  quantity: string
  price: string
  setName: (val: string) => void
  setQuantity: (val: string) => void
  setPrice: (val: string) => void
  onAddSuccess?: () => void
}

export default function ButtonAdd({
  name,
  quantity,
  price,
  setName,
  setQuantity,
  setPrice,
  onAddSuccess,
}: Readonly<AddItem>) {
  
  const { setCartItems } = useCart()

  const handleSubmit = () => {
    if(name && quantity && price){
      setCartItems(prev => [
        ...prev,
        {
          id: prev.length,
          name,
          quantity: Number(quantity),
          price: Number(price)
        }
      ])
      setName('')
      setQuantity('')
      setPrice('')
      onAddSuccess?.()
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
    width: 200,
    borderRadius: 15,
    margin: 'auto',
    marginTop: 30
  },
  button: {
    borderRadius: 10,
    paddingVertical: 10
  },
  text: {
    textAlign: 'center',
    fontSize: FontSize.button
  }
})