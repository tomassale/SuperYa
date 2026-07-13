import { StyleSheet, ScrollView, Text, Pressable, Image } from 'react-native'
import { useNavigation } from 'expo-router'
import Items from '@/components/cart/Items'
import FinalPrice from '@/components/cart/FinalPrice'
import ButtonFinish from '@/components/cart/ButtonFinish'
import Colors from '@/constants/Colors'
import { useCart } from '@/context/CartContext'
import { moderateScale, verticalScale, scaleFont } from '@/utils/Responsive'

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
    fontSize: scaleFont(38),
    marginTop: verticalScale(30),
    textShadowColor: 'black',
    textShadowRadius: 7,
  },
  back:{
    marginLeft: moderateScale(20),
    marginTop: verticalScale(50),
    flexDirection: 'row',
    alignItems: 'center',
    fontWeight: 'bold'
  },
  text:{
    fontSize: scaleFont(25),
    color: '#626262',
  },
  arrow:{
    height: verticalScale(23),
    width: moderateScale(8),
    marginRight: moderateScale(8),
  },
  empty: {
    textAlign: 'center',
    fontSize: scaleFont(25),
    paddingHorizontal: moderateScale(13),
    marginTop: verticalScale(30),
    alignContent: 'center',
  }
})