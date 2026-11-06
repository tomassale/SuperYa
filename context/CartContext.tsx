import { useState, useContext, createContext, useMemo } from 'react'
import type { Product } from '@/interfaces/ItemsInterfaces'

type CartContextType = {
  cartItems: Product[]
  totalPrice: number
}

type SetCartItems = React.Dispatch<React.SetStateAction<Product[]>>

const CartContext = createContext<CartContextType | null>(null)
// Separado porque el setter es estable: quien solo modifica el carrito no se re-renderiza cuando cambia.
const SetCartItemsContext = createContext<SetCartItems | null>(null)

export function CartProvider({ children }: { readonly children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<Product[]>([])

  const value = useMemo(
    () => ({
      cartItems,
      totalPrice: cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0),
    }),
    [cartItems]
  )

  return (
    <SetCartItemsContext.Provider value={setCartItems}>
      <CartContext.Provider value={value}>
        {children}
      </CartContext.Provider>
    </SetCartItemsContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}

export function useSetCartItems() {
  const setCartItems = useContext(SetCartItemsContext)
  if (!setCartItems) throw new Error('useSetCartItems must be used inside CartProvider')
  return setCartItems
}
