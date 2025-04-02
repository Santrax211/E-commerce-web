import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HeroSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl">Shop the Latest Trends</h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Discover our curated collection of products with fast shipping and secure checkout.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/products">
                <Button size="lg">Shop Now</Button>
              </Link>
              <Link href="/categories">
                <Button variant="outline" size="lg">
                  Browse Categories
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative h-[300px] w-full overflow-hidden rounded-xl bg-gradient-to-b from-primary/20 to-primary/5 sm:h-[400px] lg:h-[500px]">
              <div className="absolute inset-0 flex items-center justify-center text-lg font-medium">
                Featured Product Image
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

