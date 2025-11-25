import { Text, View, StyleSheet, Modal, Pressable } from 'react-native';
import HistoryCartItem from './HistoryCartItem'
import FontSize from '@/constants/Hierarchies';
import { ArrayCart } from '@/interfaces/ItemsInterfaces';

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
    paddingHorizontal: 24,
  },
  item: {
    backgroundColor: '#DFDFDF',
    borderRadius: 20,
    height: 480,
    width: '100%',
    maxWidth: 320,
    paddingBottom: 20,
    paddingHorizontal: 18,
    borderWidth: 2,
    borderColor: '#1F1F1F',
  },
  close: {
    alignSelf: 'flex-end',
    marginTop: 12,
    marginRight: 4,
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1E1E1E',
  },
  content: {
    flex: 1,
    marginBottom: 10,
    gap: 12,
  },
  title: {
    textAlign: 'center',
    fontSize: FontSize.title - 30,
    marginBottom: 6,
    color: '#DCE897',
    fontWeight: '500',
    textShadowColor: '#00000060',
    textShadowRadius: 6,
    textShadowOffset: { width: 1, height: 1 },
  },
  empty: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 18,
    color: '#2B2B2B',
  }
})