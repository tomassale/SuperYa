import { View, StyleSheet, ScrollView, Text } from 'react-native'
import { Product } from '@/interfaces/ItemsInterfaces'
import { moderateScale, verticalScale, scaleFont } from '@/utils/Responsive'

type HistoryCartItemProps = {
  readonly items: Product[]
  readonly finalPrice: number
}

export default function HistoryCartItem({ items, finalPrice }: Readonly<HistoryCartItemProps>) {
  const formatPrice = (value: number) =>
    value.toLocaleString('es-AR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })

  return (
    <View style={styles.wrapper}>
      <ScrollView contentContainerStyle={styles.list}>
        {items.map((item) => (
          <View key={`${item.id}-${item.name}`} style={styles.row}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.unit}>U: ${formatPrice(item.price)}</Text>
            <Text style={styles.qty}>x{item.quantity}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.footer}>
        <Text style={styles.footerText}>Final: ${formatPrice(finalPrice)}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    width: '100%',
    gap: verticalScale(16),
  },
  list: {
    gap: verticalScale(4),
    paddingBottom: verticalScale(10),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: verticalScale(10),
    paddingHorizontal: moderateScale(14),
    borderRadius: 12,
    backgroundColor: '#D6D6D6',
    borderWidth: 1,
    borderColor: '#9E9E9E',
    shadowColor: '#00000040',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  name: {
    flex: 0.9,
    fontSize: scaleFont(18),
    fontWeight: '600',
    color: '#2B2B2B',
  },
  unit: {
    flex: 1,
    fontSize: scaleFont(16),
    color: '#2B2B2B',
    textAlign: 'center',
  },
  qty: {
    width: moderateScale(42),
    fontSize: scaleFont(18),
    color: '#2B2B2B',
    fontWeight: '700',
    textAlign: 'right',
  },
  footer: {
    alignSelf: 'center',
    paddingHorizontal: moderateScale(28),
    paddingVertical: verticalScale(8),
    borderRadius: 12,
    backgroundColor: '#D6D6D6',
    borderWidth: 1,
    borderColor: '#9E9E9E',
  },
  footerText: {
    fontSize: scaleFont(20),
    fontWeight: '700',
    color: '#2B2B2B',
  },
})