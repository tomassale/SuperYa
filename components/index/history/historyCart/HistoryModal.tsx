import { Text, View, StyleSheet, Modal, Pressable } from 'react-native';
import HistoryCartItem from './HistoryCartItem'
import { ArrayCart } from '@/interfaces/ItemsInterfaces';
import { moderateScale, verticalScale, scaleFont } from '@/utils/Responsive';

export function HistoryCartModal({ visible, onClose, date, cart }: Readonly<{ 
  visible: boolean; 
  onClose: () => void; 
  date: string,
  cart: ArrayCart[]
}>) {
  const items = cart?.flatMap(group => group.items) ?? []
  const finalPrice = cart?.reduce((acc, curr) => acc + (curr.finalPrice ?? 0), 0) ?? 0

  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.item}>
          <Pressable onPress={onClose} accessibilityRole="button">
            <Text style={styles.close}>X</Text>
          </Pressable>
          <View style={styles.content}>
            <Text style={styles.title}>Compra {date}</Text>
            {items.length > 0 ? (
              <HistoryCartItem items={items} finalPrice={finalPrice}/>
            ) : (
              <Text style={styles.empty}>Sin productos registrados</Text>
            )}
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: moderateScale(24),
  },
  item: {
    backgroundColor: '#DFDFDF',
    borderRadius: 20,
    height: verticalScale(480),
    maxHeight: '85%',
    width: '100%',
    maxWidth: 320,
    paddingBottom: verticalScale(20),
    paddingHorizontal: moderateScale(18),
    borderWidth: 2,
    borderColor: '#1F1F1F',
  },
  close: {
    alignSelf: 'flex-end',
    marginTop: verticalScale(12),
    marginRight: moderateScale(4),
    fontSize: scaleFont(26),
    fontWeight: 'bold',
    color: '#1E1E1E',
  },
  content: {
    flex: 1,
    marginBottom: verticalScale(10),
    gap: verticalScale(12),
  },
  title: {
    textAlign: 'center',
    fontSize: scaleFont(40),
    marginBottom: verticalScale(6),
    color: '#DCE897',
    fontWeight: '500',
    textShadowColor: '#00000060',
    textShadowRadius: 6,
    textShadowOffset: { width: 1, height: 1 },
  },
  empty: {
    textAlign: 'center',
    marginTop: verticalScale(40),
    fontSize: scaleFont(18),
    color: '#2B2B2B',
  }
})