"use client"

import { createContext, useContext, ReactNode } from "react"
import { useCart, CartItem } from "@/hooks/use-cart"

type CartContextType = {
  items: CartItem[]
  addItem: (item: CartItem) => void
  updateQuantity: (id: string | number, quantity: number) => void
  removeItem: (id: string | number) => void
  clearCart: () => void
  subtotal: number
  isLoading: boolean
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const cart = useCart()
  
  return (
    <CartContext.Provider value = {cart}>
      {children}
    </CartContext.Provider>
  )
}

export function useCartContext() {
  const context = useContext(CartContext)
  
  if (context === undefined) {
    throw new Error("useCartContext must be used within a CartProvider")
  }
  
  return context
}