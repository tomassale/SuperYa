import { StyleSheet, Text, SafeAreaView, View, Image } from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors'
import { useRouter } from 'expo-router'

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
  },
  image: {
    margin: 'auto',
    marginBottom: -370,
  },
  text: {
    margin: 'auto',
    fontSize: 30
  }
})