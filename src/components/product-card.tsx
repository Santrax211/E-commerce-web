"use client"

import Image from "next/image"
import Link from "next/link"
import { ShoppingCart } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { useCartContext } from "@/components/providers/cart-provider"

interface Product {
  id: string | number
  name: string
  description: string
  price: number
  image: string
}

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCartContext()
  
  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image
    })
  }
  
  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-0">
        <Link href={`/products/${product.id}`}>
          <div className="overflow-hidden aspect-square">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              width={300}
              height={300}
              className="object-cover transition-transform hover:scale-105 duration-500"
            />
          </div>
        </Link>
      </CardHeader>
      <CardContent className="p-4">
        <Link href={`/products/${product.id}`}>
          <h3 className="font-semibold text-lg truncate hover:underline">{product.name}</h3>
        </Link>
        <p className="text-sm text-muted-foreground line-clamp-2 h-10">{product.description}</p>
        <p className="font-bold mt-2">${product.price.toFixed(2)}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full" onClick={handleAddToCart}>
          <ShoppingCart className="mr-2 h-4 w-4" />
          Añadir al Carrito
        </Button>
      </CardFooter>
    </Card>
  )
}