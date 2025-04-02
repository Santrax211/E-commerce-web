"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChevronLeft, CreditCard, Lock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function CheckoutPage() {
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)

  // Mock cart summary data
  const cartSummary = {
    subtotal: 499.97,
    shipping: 10.0,
    discount: 20.0,
    total: 489.97,
    items: [
      { name: "Premium Wireless Headphones", price: 199.99, quantity: 1 },
      { name: "Smart Fitness Watch", price: 149.99, quantity: 2 },
    ],
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      router.push("/checkout/success")
    }, 2000)
  }

  return (
    <div className="container px-4 py-8 mx-auto md:px-6 md:py-12">
      <Link href="/cart" className="inline-flex items-center mb-6 text-sm font-medium">
        <ChevronLeft className="w-4 h-4 mr-1" />
        Back to Cart
      </Link>

      <h1 className="mb-6 text-3xl font-bold">Checkout</h1>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Tabs defaultValue="card" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="card">Credit Card</TabsTrigger>
              <TabsTrigger value="paypal">PayPal</TabsTrigger>
              <TabsTrigger value="bank">Bank Transfer</TabsTrigger>
            </TabsList>
            <TabsContent value="card">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Information</CardTitle>
                  <CardDescription>Enter your credit card details</CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="cardName">Name on Card</Label>
                        <Input id="cardName" placeholder="John Doe" required />
                      </div>

                      <div>
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <div className="relative">
                          <Input id="cardNumber" placeholder="1234 5678 9012 3456" required />
                          <CreditCard className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div className="col-span-1">
                          <Label htmlFor="expiryMonth">Month</Label>
                          <Select defaultValue="01">
                            <SelectTrigger id="expiryMonth">
                              <SelectValue placeholder="Month" />
                            </SelectTrigger>
                            <SelectContent>
                              {Array.from({ length: 12 }, (_, i) => {
                                const month = (i + 1).toString().padStart(2, "0")
                                return (
                                  <SelectItem key={month} value={month}>
                                    {month}
                                  </SelectItem>
                                )
                              })}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="col-span-1">
                          <Label htmlFor="expiryYear">Year</Label>
                          <Select defaultValue="2024">
                            <SelectTrigger id="expiryYear">
                              <SelectValue placeholder="Year" />
                            </SelectTrigger>
                            <SelectContent>
                              {Array.from({ length: 10 }, (_, i) => {
                                const year = (new Date().getFullYear() + i).toString()
                                return (
                                  <SelectItem key={year} value={year}>
                                    {year}
                                  </SelectItem>
                                )
                              })}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="col-span-1">
                          <Label htmlFor="cvv">CVV</Label>
                          <Input id="cvv" placeholder="123" required />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Billing Address</h3>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName">First Name</Label>
                          <Input id="firstName" required />
                        </div>
                        <div>
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input id="lastName" required />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="address">Address</Label>
                        <Input id="address" required />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="city">City</Label>
                          <Input id="city" required />
                        </div>
                        <div>
                          <Label htmlFor="postalCode">Postal Code</Label>
                          <Input id="postalCode" required />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="country">Country</Label>
                        <Select defaultValue="us">
                          <SelectTrigger id="country">
                            <SelectValue placeholder="Select country" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="us">United States</SelectItem>
                            <SelectItem value="ca">Canada</SelectItem>
                            <SelectItem value="mx">Mexico</SelectItem>
                            <SelectItem value="uk">United Kingdom</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" className="w-full" disabled={isProcessing}>
                      {isProcessing ? (
                        <>Processing Payment...</>
                      ) : (
                        <>
                          <Lock className="w-4 h-4 mr-2" />
                          Pay ${cartSummary.total.toFixed(2)}
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
            <TabsContent value="paypal">
              <Card>
                <CardHeader>
                  <CardTitle>PayPal</CardTitle>
                  <CardDescription>Pay using your PayPal account</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center py-10">
                  <p className="mb-4 text-center text-muted-foreground">
                    You will be redirected to PayPal to complete your payment.
                  </p>
                  <Button className="w-full max-w-md">Continue to PayPal</Button>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="bank">
              <Card>
                <CardHeader>
                  <CardTitle>Bank Transfer</CardTitle>
                  <CardDescription>Pay directly from your bank account</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <RadioGroup defaultValue="ach">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="ach" id="ach" />
                      <Label htmlFor="ach">ACH Transfer (US)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="sepa" id="sepa" />
                      <Label htmlFor="sepa">SEPA Transfer (EU)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="wire" id="wire" />
                      <Label htmlFor="wire">International Wire Transfer</Label>
                    </div>
                  </RadioGroup>

                  <div className="p-4 mt-4 border rounded-md">
                    <h4 className="mb-2 font-medium">Bank Account Details</h4>
                    <p className="text-sm text-muted-foreground">
                      Account Name: ShopNow Inc.
                      <br />
                      Account Number: XXXX-XXXX-XXXX-1234
                      <br />
                      Routing Number: XXXXXXXXX
                      <br />
                      Bank: Example Bank
                      <br />
                      Reference: Your Order ID will be provided after confirmation
                    </p>
                  </div>

                  <Button className="w-full">Confirm Order</Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {cartSummary.items.map((item, index) => (
                <div key={index} className="flex justify-between">
                  <span className="text-sm">
                    {item.name} <span className="text-muted-foreground">x{item.quantity}</span>
                  </span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}

              <Separator />

              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${cartSummary.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>${cartSummary.shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span>-${cartSummary.discount.toFixed(2)}</span>
              </div>

              <Separator />

              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>${cartSummary.total.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

