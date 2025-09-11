import { StyleSheet, Text, View, SafeAreaView} from 'react-native';
import React from 'react';
import CartIcon from '@/components/index/CartIcon';
import Form from '@/components/index/Form';
import Colors from '@/constants/Colors';
import FontSize from '@/constants/Hierarchies';

export default function Page() {

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Super Ya</Text>
      <View style={styles.main}>
        <Form/>
        <CartIcon/>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 24,
    backgroundColor: Colors.fondo
  },
  main: {
    flex: 1,
    marginTop: 50
  },
  title: {
    fontSize: FontSize.title,
    color: Colors.titulo,
    textShadowColor: 'black',
    textShadowRadius: 7,
    marginTop: 100
  },
  subtitle: {
    fontSize: 36,
    color: '#38434D',
  },
});