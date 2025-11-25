import { StyleSheet, ScrollView, Text, Pressable, Image } from 'react-native'
import { useNavigation } from 'expo-router'
import Items from '@/components/cart/Items'
import FinalPrice from '@/components/cart/FinalPrice'
import ButtonFinish from '@/components/cart/ButtonFinish'
import Colors from '@/constants/Colors'
import { useCart } from '@/context/CartContext'

export default function Cart() {
  const { cartItems, totalPrice } = useCart()
  const navigation = useNavigation()

  return(
    <ScrollView style={styles.container}>
      <Pressable style={styles.back} onPress={() => navigation.goBack()}>
        <Image source={require('@/assets/img/Arrow.png')} style={styles.arrow}/>
        <Text style={styles.text}>Volver</Text>
      </Pressable>
      <Text style={styles.title}>Carrito de compra</Text>
        {cartItems.length > 0?(
          <>
            <Items items={cartItems} finalPrice={totalPrice}/>
            <FinalPrice items={cartItems} finalPrice={totalPrice}/>
            <ButtonFinish/>
          </>
        ):(
          <Text style={styles.empty}>No hay elementos agregados al carrito</Text>
        )}
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
    fontSize: 38,
    marginTop: 30,
    textShadowColor: 'black',
    textShadowRadius: 7,
  },
  back:{
    marginLeft: 20,
    marginTop: 50,
    flexDirection: 'row',
    alignItems: 'center',
    fontWeight: 'bold'
  },
  text:{
    fontSize: 25,
    color: '#626262',
  },
  arrow:{
    height: 23,
    width: 8,
    marginRight: 8,
  },
  empty: {
    textAlign: 'center',
    fontSize: 25,
    paddingHorizontal: 13,
    marginTop: 30,
    alignContent: 'center',
  }
})