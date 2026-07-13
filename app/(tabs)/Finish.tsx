import { StyleSheet, Text, View, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React from 'react'
import Colors from '@/constants/Colors'
import { useRouter } from 'expo-router'
import { moderateScale, verticalScale, scaleFont } from '@/utils/Responsive'

export default function Finish() {

  const router = useRouter();

  setTimeout(()=>{
    router.replace('/')
  }, 3000)

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.main}>
        <Image style={styles.image} source={require('@/assets/img/Check-circle.png')}/>
        <Text style={styles.text}>Compra Finalizada</Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.finalizado,
    flex: 1,
  },
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: verticalScale(20),
  },
  image: {
    width: moderateScale(120),
    height: moderateScale(120),
    resizeMode: 'contain',
  },
  text: {
    fontSize: scaleFont(30)
  }
})