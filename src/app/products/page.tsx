import { Suspense } from "react"
import { SlidersHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import ProductCard from "@/components/product-card"

// Mock data for products
const products = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    description: "Noise-cancelling with premium sound quality",
    price: 199.99,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 2,
    name: "Smart Fitness Watch",
    description: "Track your fitness goals with precision",
    price: 149.99,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 3,
    name: "Ergonomic Office Chair",
    description: "Comfortable seating for long work hours",
    price: 249.99,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 4,
    name: "Ultra HD Smart TV",
    description: "Immersive viewing experience with smart features",
    price: 799.99,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 5,
    name: "Professional DSLR Camera",
    description: "Capture stunning photos and videos",
    price: 1299.99,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 6,
    name: "Smartphone with 5G",
    description: "Latest technology with powerful features",
    price: 899.99,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 7,
    name: "Portable Bluetooth Speaker",
    description: "Rich sound in a compact design",
    price: 79.99,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 8,
    name: "Gaming Laptop",
    description: "High-performance for immersive gaming",
    price: 1499.99,
    image: "/placeholder.svg?height=300&width=300",
  },
]

function ProductsLoading() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {Array(8)
        .fill(0)
        .map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <CardHeader className="p-0">
              <Skeleton className="aspect-square" />
            </CardHeader>
            <CardContent className="p-4">
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-full mb-1" />
              <Skeleton className="h-4 w-2/3 mb-4" />
              <Skeleton className="h-5 w-1/4" />
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Skeleton className="h-10 w-full" />
            </CardFooter>
          </Card>
        ))}
    </div>
  )
}

export default function ProductsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex items-center justify-between px-4 py-4 border-b md:px-6">
        <div>
          <h1 className="text-2xl font-bold">Products</h1>
          <p className="text-sm text-muted-foreground">Browse our collection of products</p>
        </div>
        <Button variant="outline" size="sm" className="ml-auto">
          <SlidersHorizontal className="mr-2 h-4 w-4" />
          Filters
        </Button>
      </div>
      <div className="grid flex-1 md:grid-cols-[240px_1fr] lg:grid-cols-[280px_1fr]">
        <aside className="hidden border-r bg-muted/40 md:block">
          <div className="sticky top-16 p-4 space-y-6">
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Search</h3>
              <div className="relative">
                <Input placeholder="Search products..." className="w-full" />
              </div>
            </div>
            <Separator />
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Categories</h3>
              <div className="space-y-1">
                <Button variant="ghost" className="w-full justify-start text-sm font-normal">
                  All Categories
                </Button>
                <Button variant="ghost" className="w-full justify-start text-sm font-normal">
                  Electronics
                </Button>
                <Button variant="ghost" className="w-full justify-start text-sm font-normal">
                  Clothing
                </Button>
                <Button variant="ghost" className="w-full justify-start text-sm font-normal">
                  Home & Kitchen
                </Button>
                <Button variant="ghost" className="w-full justify-start text-sm font-normal">
                  Sports & Outdoors
                </Button>
              </div>
            </div>
            <Separator />
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Price Range</h3>
              <div className="grid grid-cols-2 gap-2">
                <Input placeholder="Min" type="number" />
                <Input placeholder="Max" type="number" />
              </div>
              <Button className="w-full">Apply</Button>
            </div>
          </div>
        </aside>
        <main className="flex-1 p-4 md:p-6">
          <Suspense fallback={<ProductsLoading />}>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </Suspense>
        </main>
      </div>
    </div>
  )
}

