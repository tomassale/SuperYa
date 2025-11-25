import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { History } from '@/interfaces/ItemsInterfaces'
import HistoryCart from './historyCart/HistoryCartButton';

interface HistoryItemProps {
  data: History[];
}

export default function HistoryItem({data}: Readonly<HistoryItemProps>){

  return(
    <ScrollView contentContainerStyle={styles.content}>
    {data && data.length > 0 ? (
      data.map((obj: History, index: number) => (
          <View style={styles.item} key={index}>
            <Text style={styles.date}>{obj.date} - {obj.hour}</Text>
            <Text style={styles.price}>Precio Final: ${obj.finalPrice?.toLocaleString('es-AR', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            }) || '0.00'}</Text>
            <HistoryCart date={obj.date} cart={obj.cart}/>
          </View>
      ))
    ) : (
       <Text style={styles.empty}>No hay compras recientes</Text>
    )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  content: {
    paddingBottom: 120,
  },
  item: {
    padding: 10,
    width: 'auto',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    gap: 15,
  },
  date: {
    textAlign: 'center',
    fontSize: 24
  },
  price: {
    fontSize: 20,
    marginVertical: 8,
  },
  empty: {
    textAlign: 'center',
    fontSize: 25,
    marginTop: 20
  }
})