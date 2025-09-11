import { useState, useContext, createContext, useMemo } from 'react'

type CartContextType = {
  cartItems: any[]
  setCartItems: React.Dispatch<React.SetStateAction<any[]>>
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<any[]>([])

  const value = useMemo(
    () => ({ cartItems, setCartItems }),
    [cartItems]
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
