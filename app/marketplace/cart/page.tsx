"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Minus, Plus, Trash2, Phone, MapPin } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface CartItem {
  id: string
  name: string
  price: number
  unit: string
  quantity: number
  farmer: string
  farmerPhone: string
  location: string
  image: string
  maxQuantity: number
}

const mockCartItems: CartItem[] = [
  {
    id: "1",
    name: "Basmati Rice",
    price: 45,
    unit: "kg",
    quantity: 10,
    farmer: "Rajesh Kumar",
    farmerPhone: "+91 98765 43210",
    location: "Punjab",
    image: "/basmati-rice.png",
    maxQuantity: 500,
  },
  {
    id: "2",
    name: "Fresh Tomatoes",
    price: 25,
    unit: "kg",
    quantity: 5,
    farmer: "Sunita Patil",
    farmerPhone: "+91 87654 32109",
    location: "Maharashtra",
    image: "/fresh-tomatoes.png",
    maxQuantity: 200,
  },
]

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>(mockCartItems)
  const [isLoading, setIsLoading] = useState(false)
  const [orderForm, setOrderForm] = useState({
    name: "",
    phone: "",
    address: "",
    notes: "",
  })
  const router = useRouter()

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id)
      return
    }

    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: Math.min(newQuantity, item.maxQuantity) } : item)),
    )
  }

  const removeItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  const getTotalAmount = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      alert("Order placed successfully! Farmers will contact you soon.")
      router.push("/marketplace")
    }, 1500)
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b border-border bg-card">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/marketplace">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Marketplace
                </Link>
              </Button>
              <h1 className="text-xl font-bold text-foreground">Shopping Cart</h1>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground mb-4">Your cart is empty</p>
              <Button asChild>
                <Link href="/marketplace">Continue Shopping</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/marketplace">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Marketplace
              </Link>
            </Button>
            <h1 className="text-xl font-bold text-foreground">Shopping Cart</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Cart Items ({cartItems.length})</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4 p-4 border border-border rounded-lg">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-sm text-muted-foreground">by {item.farmer}</p>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="h-3 w-3" />
                            {item.location}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">₹{item.price * item.quantity}</p>
                          <p className="text-sm text-muted-foreground">
                            ₹{item.price} per {item.unit}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-12 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            disabled={item.quantity >= item.maxQuantity}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                          <span className="text-sm text-muted-foreground ml-2">{item.unit}</span>
                        </div>

                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`tel:${item.farmerPhone}`}>
                              <Phone className="h-3 w-3" />
                            </Link>
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => removeItem(item.id)}>
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>

                      {item.quantity >= item.maxQuantity && (
                        <Badge variant="secondary" className="text-xs">
                          Maximum quantity reached
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary and Form */}
          <div className="space-y-4">
            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>
                      {item.name} × {item.quantity}
                    </span>
                    <span>₹{item.price * item.quantity}</span>
                  </div>
                ))}
                <Separator />
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>₹{getTotalAmount()}</span>
                </div>
              </CardContent>
            </Card>

            {/* Order Form */}
            <Card>
              <CardHeader>
                <CardTitle>Delivery Details</CardTitle>
                <CardDescription>Farmers will contact you to arrange delivery</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePlaceOrder} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={orderForm.name}
                      onChange={(e) => setOrderForm({ ...orderForm, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={orderForm.phone}
                      onChange={(e) => setOrderForm({ ...orderForm, phone: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Delivery Address *</Label>
                    <Input
                      id="address"
                      value={orderForm.address}
                      onChange={(e) => setOrderForm({ ...orderForm, address: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Special Instructions</Label>
                    <Input
                      id="notes"
                      placeholder="Any special requirements..."
                      value={orderForm.notes}
                      onChange={(e) => setOrderForm({ ...orderForm, notes: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Badge variant="outline" className="w-full justify-center py-2">
                      Payment: Cash on Delivery (COD)
                    </Badge>
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Placing Order..." : `Place Order - ₹${getTotalAmount()}`}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
