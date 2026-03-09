import { CartProvider } from '@/context/CartContext'
import { Slot } from 'expo-router'

export default function RootLayout() {
  return (
    <CartProvider>
      <Slot/> 
    </CartProvider>
  )
}
