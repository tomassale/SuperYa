import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native'
import { Product } from '@/interfaces/ItemsInterfaces'
import { useCart } from '@/context/CartContext'

export default function ItemDetails({ id, name, quantity, price }: Readonly<Product>) {
  const { cartItems, setCartItems } = useCart()
  const [editing, setEditing] = useState(false)
  const [tempPrice, setTempPrice] = useState(String(price))

  const priceFixed = price.toLocaleString('es-AR', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
  const priceMultiplied = (price * quantity).toLocaleString('es-AR', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })

  const handleStartEdit = () => {
    setTempPrice(String(price))
    setEditing(true)
  }

  const handleFinishEdit = async () => {
    const numeric = Number(
      tempPrice
        .replace(/\./g, '')
        .replace(',', '.')
    )

    if (isNaN(numeric) || numeric <= 0) {
      setTempPrice(String(price))
      setEditing(false)
      return
    }

    const itemInCart = cartItems.find(item => item.id === id)
    if (!itemInCart) {
      setEditing(false)
      return
    }

    const updatedItem = { ...itemInCart, price: numeric }

    setCartItems(prev =>
      prev.map(item => (item.id === id ? updatedItem : item))
    )

    setEditing(false)
  }

  return (
    <View key={id} style={styles.container}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.quantity}>x{quantity}</Text>
      <View style={styles.prices}>
        {editing ? (
          <TextInput
            style={[styles.price, styles.priceInput]}
            value={tempPrice}
            onChangeText={setTempPrice}
            keyboardType="numeric"
            autoFocus
            onBlur={handleFinishEdit}
            onSubmitEditing={handleFinishEdit}
            returnKeyType="done"
          />
        ) : (
          <Pressable onPress={handleStartEdit}>
            <Text style={styles.price}>${priceFixed}</Text>
          </Pressable>
        )}
        <Text style={styles.priceSumarized}>${priceMultiplied}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  name: {
    marginLeft: 10,
    width: 115,
    fontSize: 20,
  },
  quantity: {
    width: 40,
    fontSize: 17.5,
  },
  prices: { width: 100 },
  price: { fontSize: 20 },
  priceSumarized: { fontSize: 20 },
  priceInput: {
    borderBottomWidth: 1,
    borderColor: '#000',
    paddingVertical: 0,
  },
})