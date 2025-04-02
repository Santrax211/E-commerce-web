"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, Minus, Plus, ShoppingCart, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock product data
const productData = {
  id: 1,
  name: "Premium Wireless Headphones",
  description:
    "Experience crystal-clear audio with our noise-cancelling wireless headphones. Perfect for music lovers, gamers, and professionals who need to focus in noisy environments. The comfortable over-ear design allows for hours of wear without discomfort.",
  price: 199.99,
  rating: 4.8,
  reviews: 124,
  stock: 15,
  images: [
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600",
  ],
  features: [
    "Active Noise Cancellation",
    "40-hour battery life",
    "Bluetooth 5.0 connectivity",
    "Built-in microphone for calls",
    "Foldable design for easy storage",
    "Premium sound quality with deep bass",
  ],
  specifications: {
    Brand: "AudioTech",
    Model: "SoundPro X1",
    Color: "Matte Black",
    Connectivity: "Bluetooth 5.0, 3.5mm audio jack",
    "Battery Life": "Up to 40 hours",
    "Charging Time": "2 hours",
    Weight: "250g",
  },
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const [quantity, setQuantity] = useState(1)
  const [mainImage, setMainImage] = useState(productData.images[0])

  const increaseQuantity = () => {
    if (quantity < productData.stock) {
      setQuantity(quantity + 1)
    }
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const addToCart = () => {
    console.log(`Added ${quantity} of product ${params.id} to cart`)
    // Here you would implement the actual cart functionality
  }

  return (
    <div className="container px-4 py-8 mx-auto md:px-6 md:py-12">
      <Link href="/products" className="inline-flex items-center mb-6 text-sm font-medium">
        <ChevronLeft className="w-4 h-4 mr-1" />
        Back to Products
      </Link>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <div className="overflow-hidden border rounded-lg">
            <Image
              src={mainImage || "/placeholder.svg"}
              alt={productData.name}
              width={600}
              height={600}
              className="object-cover w-full"
            />
          </div>
          <div className="flex space-x-2">
            {productData.images.map((image, index) => (
              <button
                key={index}
                className={`border rounded-md overflow-hidden ${mainImage === image ? "ring-2 ring-primary" : ""}`}
                onClick={() => setMainImage(image)}
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`Product image ${index + 1}`}
                  width={80}
                  height={80}
                  className="object-cover w-20 h-20"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{productData.name}</h1>
            <div className="flex items-center mt-2 space-x-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(productData.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {productData.rating} ({productData.reviews} reviews)
              </span>
            </div>
          </div>

          <div className="text-2xl font-bold">${productData.price.toFixed(2)}</div>

          <p className="text-muted-foreground">{productData.description}</p>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">Quantity:</span>
              <div className="flex items-center">
                <Button variant="outline" size="icon" onClick={decreaseQuantity} disabled={quantity <= 1}>
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="w-12 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={increaseQuantity}
                  disabled={quantity >= productData.stock}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="text-sm text-muted-foreground">{productData.stock} items in stock</div>

            <Button className="w-full" size="lg" onClick={addToCart}>
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add to Cart
            </Button>
          </div>
        </div>
      </div>

      <Tabs defaultValue="description" className="mt-12">
        <TabsList>
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="specifications">Specifications</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>
        <TabsContent value="description" className="py-4">
          <p>{productData.description}</p>
        </TabsContent>
        <TabsContent value="features" className="py-4">
          <ul className="pl-5 space-y-2 list-disc">
            {productData.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </TabsContent>
        <TabsContent value="specifications" className="py-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {Object.entries(productData.specifications).map(([key, value]) => (
              <div key={key} className="flex justify-between p-3 border rounded-md">
                <span className="font-medium">{key}</span>
                <span className="text-muted-foreground">{value}</span>
              </div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="reviews" className="py-4">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Customer Reviews</h3>
              <Button>Write a Review</Button>
            </div>
            <div className="space-y-4">
              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium">John Doe</div>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < 5 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                </div>
                <div className="text-sm text-muted-foreground mb-2">2 weeks ago</div>
                <p>
                  These headphones are amazing! The sound quality is exceptional and the noise cancellation works
                  perfectly. Battery life is impressive too.
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium">Jane Smith</div>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                </div>
                <div className="text-sm text-muted-foreground mb-2">1 month ago</div>
                <p>
                  Very comfortable to wear for long periods. The sound is great but I wish the bass was a bit stronger.
                  Overall, I'm satisfied with my purchase.
                </p>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

