import React, { memo, useState } from 'react'
import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native'
import { Product } from '@/interfaces/ItemsInterfaces'
import { useSetCartItems } from '@/context/CartContext'
import { formatPriceCompact } from '@/utils/FormatPrice'
import { moderateScale, scaleFont } from '@/utils/Responsive'

function ItemDetails({ id, name, quantity, price }: Readonly<Product>) {
  const setCartItems = useSetCartItems()
  const [editing, setEditing] = useState(false)
  const [tempPrice, setTempPrice] = useState(String(price))

  const handleStartEdit = () => {
    setTempPrice(String(price))
    setEditing(true)
  }

  const handleFinishEdit = () => {
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

    setCartItems(prev =>
      prev.map(item => (item.id === id ? { ...item, price: numeric } : item))
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
            returnKeyType="done"
          />
        ) : (
          <Pressable onPress={handleStartEdit}>
            <Text style={styles.price}>${formatPriceCompact(price)}</Text>
          </Pressable>
        )}
        <Text style={styles.priceSumarized}>${formatPriceCompact(price * quantity)}</Text>
      </View>
    </View>
  )
}

export default memo(ItemDetails)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    gap: moderateScale(2),
    alignItems: 'center',
  },
  name: {
    marginLeft: moderateScale(10),
    flex: 1,
    fontSize: scaleFont(20),
  },
  quantity: {
    width: moderateScale(40),
    fontSize: scaleFont(17.5),
  },
  prices: { width: moderateScale(100) },
  price: { fontSize: scaleFont(20) },
  priceSumarized: { fontSize: scaleFont(20) },
  priceInput: {
    borderBottomWidth: 1,
    borderColor: '#000',
    paddingVertical: 0,
  },
})