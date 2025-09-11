import { StyleSheet, ScrollView, Text } from 'react-native'
import Items from '@/components/cart/Items'
import FinalPrice from '@/components/cart/FinalPrice'
import ButtonFinish from '@/components/cart/ButtonFinish'
import Colors from '@/constants/Colors'
import { useCart } from '@/context/CartContext'

export default function Cart() {
  const { cartItems } = useCart()

  return(
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Carrito de compra</Text>
      <Items items={cartItems}/>
      <FinalPrice items={cartItems}/>
      <ButtonFinish/>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.fondo,
  },
  title: {
    alignSelf: 'center',
    color: Colors.titulo,
    fontSize: 42,
    marginTop: 80,
    marginBottom: 50,
    textShadowColor: 'black',
    textShadowRadius: 7,
  },
})