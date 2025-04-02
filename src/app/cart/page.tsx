"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useCartContext } from "@/components/providers/cart-provider"

export default function CartPage() {
  const { items, updateQuantity, removeItem, subtotal } = useCartContext()
  const [promoCode, setPromoCode] = useState("")
  const [promoApplied, setPromoApplied] = useState(false)
  const [promoDiscount, setPromoDiscount] = useState(0)

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "discount20") {
      setPromoApplied(true)
      setPromoDiscount(20)
    } else {
      alert("Código promocional inválido")
    }
  }

  const shipping = 10.0
  const discount = promoApplied ? (subtotal * promoDiscount) / 100 : 0
  const total = subtotal + shipping - discount

  return (
    <div className="container px-4 py-8 mx-auto md:px-6 md:py-12">
      <Link href="/products" className="inline-flex items-center mb-6 text-sm font-medium">
        <ChevronLeft className="w-4 h-4 mr-1" />
        Continuar Comprando
      </Link>

      <h1 className="mb-6 text-3xl font-bold">Tu Carrito</h1>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <ShoppingBag className="w-16 h-16 mb-4 text-muted-foreground" />
          <h2 className="mb-2 text-xl font-semibold">Tu carrito está vacío</h2>
          <p className="mb-6 text-muted-foreground">Parece que aún no has añadido nada a tu carrito.</p>
          <Link href="/products">
            <Button>Ver Productos</Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-start p-4 border rounded-lg">
                  <div className="flex-shrink-0 mr-4">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={80}
                      height={80}
                      className="rounded-md"
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">Precio unitario: ${item.price.toFixed(2)}</p>
                    <div className="flex items-center mt-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="w-8 h-8"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="w-8 mx-2 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="w-8 h-8"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="mt-2 text-destructive"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Resumen del Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Envío</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                {promoApplied && (
                  <div className="flex justify-between text-green-600">
                    <span>Descuento ({promoDiscount}%)</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                <div className="pt-4">
                  <div className="flex space-x-2">
                    <Input placeholder="Código promocional" value={promoCode} onChange={(e) => setPromoCode(e.target.value)} />
                    <Button variant="outline" onClick={applyPromoCode}>
                      Aplicar
                    </Button>
                  </div>
                  {promoApplied && <p className="mt-2 text-sm text-green-600">¡Código promocional aplicado correctamente!</p>}
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/checkout" className="w-full">
                  <Button className="w-full">Proceder al Pago</Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}