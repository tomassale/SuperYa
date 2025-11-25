import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { useState } from 'react'
import { HistoryCartModal } from './HistoryModal'
import { ArrayCart } from '@/interfaces/ItemsInterfaces'

export default function HistoryCartButton({ date, cart } : Readonly<{date: string, cart: ArrayCart[]}>){
  const [show, setShow] = useState(false)
  
  return(
    <View>
      <TouchableOpacity onPress={() => setShow(true)}>
        <Text style={styles.detail}>Ver detalle</Text>
      </TouchableOpacity>
      <HistoryCartModal
        visible={show}
        onClose={() => setShow(false)}
        date={date}
        cart={cart}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  detail: {
    textAlign: 'center',
    backgroundColor: 'rgb(168, 168, 168)',
    borderRadius: 10,
    paddingHorizontal: 10,
    alignSelf: 'center',
    fontSize: 20
  }
})