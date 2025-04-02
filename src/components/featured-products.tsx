import ProductCard from "@/components/product-card"

// Mock data for featured products
const featuredProducts = [
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
]

export default function FeaturedProducts() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Featured Products</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Discover our most popular items handpicked for you
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}

