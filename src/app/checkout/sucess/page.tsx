import Link from "next/link"
import { CheckCircle, Package } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function CheckoutSuccessPage() {
  // Mock order details
  const orderDetails = {
    orderId: "ORD-" + Math.floor(100000 + Math.random() * 900000),
    date: new Date().toLocaleDateString(),
    total: 489.97,
    email: "customer@example.com",
  }

  return (
    <div className="container flex flex-col items-center justify-center px-4 py-12 mx-auto md:px-6 md:py-24">
      <div className="flex flex-col items-center justify-center mb-8 text-center">
        <CheckCircle className="w-16 h-16 mb-4 text-green-500" />
        <h1 className="text-3xl font-bold">Order Confirmed!</h1>
        <p className="mt-2 text-muted-foreground">Thank you for your purchase. Your order has been received.</p>
      </div>

      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Order Details</CardTitle>
          <CardDescription>Order #{orderDetails.orderId}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Date</p>
              <p className="font-medium">{orderDetails.date}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total</p>
              <p className="font-medium">${orderDetails.total.toFixed(2)}</p>
            </div>
            <div className="col-span-2">
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium">{orderDetails.email}</p>
            </div>
          </div>

          <div className="p-4 mt-2 border rounded-md">
            <div className="flex items-center">
              <Package className="w-5 h-5 mr-2 text-muted-foreground" />
              <div>
                <p className="font-medium">Shipping Information</p>
                <p className="text-sm text-muted-foreground">
                  You will receive a shipping confirmation email with tracking details soon.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Link href="/" className="w-full">
            <Button className="w-full">Continue Shopping</Button>
          </Link>
          <Link href="/account/orders" className="w-full">
            <Button variant="outline" className="w-full">
              View Order History
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}

