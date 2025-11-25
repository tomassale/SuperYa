import { useState, useContext, createContext, useMemo } from 'react'
import type { Product } from '@/interfaces/ItemsInterfaces'

type CartContextType = {
  cartItems: Product[]
  setCartItems: React.Dispatch<React.SetStateAction<Product[]>>
  totalPrice: number
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { readonly children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<Product[]>([])

  const totalPrice = useMemo(
    () => cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0),
    [cartItems]
  )

  const value = useMemo(
    () => ({ cartItems, setCartItems, totalPrice }),
    [cartItems, totalPrice]
  )

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}
