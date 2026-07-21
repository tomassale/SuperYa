import { useEffect } from 'react'
import { CartProvider } from '@/context/CartContext'
import { Slot } from 'expo-router'
import { purgeExpiredData } from '@/utils/HistoryUtils'

export default function RootLayout() {
  useEffect(() => {
    // Al iniciar la app se borran del celular las compras vencidas,
    // sin depender de que el usuario abra el historial.
    purgeExpiredData()
  }, [])

  return (
    <CartProvider>
      <Slot/>
    </CartProvider>
  )
}
