"use client"

import { useState, useEffect } from "react"
import { toast } from "@/components/ui/use-toast"


export type CartItem = {
  id: string | number
  name: string
  price: number
  quantity: number
  image: string
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Cargar carrito desde localStorage al iniciar
  useEffect(() => {
    const storedCart = localStorage.getItem("cart")
    if (storedCart) {
      try {
        setItems(JSON.parse(storedCart))
      } catch (error) {
        console.error("Error parsing cart from localStorage:", error)
      }
    }
    setIsLoading(false)
  }, [])

  // Guardar carrito en localStorage cuando cambia
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("cart", JSON.stringify(items))
    }
  }, [items, isLoading])

  // Añadir item al carrito
  const addItem = (item: CartItem) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(i => i.id === item.id)
      
      if (existingItem) {
        // Actualizar cantidad si el item ya existe
        const updatedItems = prevItems.map(i => 
          i.id === item.id 
            ? { ...i, quantity: i.quantity + item.quantity } 
            : i
        )
        
        toast({
          title: "Producto actualizado",
          description: `${item.name} cantidad actualizada en el carrito`
        })
        
        return updatedItems
      } else {
        // Añadir nuevo item
        toast({
          title: "Producto añadido",
          description: `${item.name} añadido al carrito`
        })
        
        return [...prevItems, item]
      }
    })
  }

  // Actualizar cantidad de un item
  const updateQuantity = (id: string | number, quantity: number) => {
    if (quantity < 1) return
    
    setItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    )
  }

  // Eliminar item del carrito
  const removeItem = (id: string | number) => {
    setItems(prevItems => {
      const itemToRemove = prevItems.find(item => item.id === id)
      
      if (itemToRemove) {
        toast({
          title: "Producto eliminado",
          description: `${itemToRemove.name} eliminado del carrito`
        })
      }
      
      return prevItems.filter(item => item.id !== id)
    })
  }

  // Vaciar carrito
  const clearCart = () => {
    setItems([])
    toast({
      title: "Carrito vaciado",
      description: "Todos los productos han sido eliminados del carrito"
    })
  }

  // Calcular subtotal
  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity, 
    0
  )

  return {
    items,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    subtotal,
    isLoading
  }
}