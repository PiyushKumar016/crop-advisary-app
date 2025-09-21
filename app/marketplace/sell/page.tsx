"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Upload, Camera } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function SellProductPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    unit: "",
    quantity: "",
    description: "",
    location: "",
    harvestDate: "",
    organic: false,
    image: null as File | null,
  })
  const router = useRouter()

  const categories = [
    { value: "grains", label: "Grains & Cereals" },
    { value: "vegetables", label: "Vegetables" },
    { value: "fruits", label: "Fruits" },
    { value: "dairy", label: "Dairy Products" },
    { value: "spices", label: "Spices" },
    { value: "pulses", label: "Pulses & Legumes" },
  ]

  const units = [
    { value: "kg", label: "Kilogram (kg)" },
    { value: "quintal", label: "Quintal" },
    { value: "ton", label: "Ton" },
    { value: "liter", label: "Liter" },
    { value: "piece", label: "Piece" },
    { value: "dozen", label: "Dozen" },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      alert("Product listed successfully!")
      router.push("/marketplace")
    }, 1500)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData({ ...formData, image: file })
    }
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
            <h1 className="text-xl font-bold text-foreground">Sell Your Product</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>List Your Product</CardTitle>
            <CardDescription>Fill in the details to list your product in the marketplace</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Product Image */}
              <div className="space-y-2">
                <Label>Product Image</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                  {formData.image ? (
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Selected: {formData.image.name}</p>
                      <Button type="button" variant="outline" onClick={() => setFormData({ ...formData, image: null })}>
                        Remove Image
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">Upload a photo of your product</p>
                      <div className="flex gap-2 justify-center">
                        <Button type="button" variant="outline" asChild>
                          <label htmlFor="image-upload" className="cursor-pointer">
                            <Upload className="h-4 w-4 mr-2" />
                            Choose File
                          </label>
                        </Button>
                        <Button type="button" variant="outline">
                          <Camera className="h-4 w-4 mr-2" />
                          Take Photo
                        </Button>
                      </div>
                      <input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Product Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Product Name *</Label>
                <Input
                  id="name"
                  placeholder="e.g., Basmati Rice, Fresh Tomatoes"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              {/* Category and Unit */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Category *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Unit *</Label>
                  <Select value={formData.unit} onValueChange={(value) => setFormData({ ...formData, unit: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select unit" />
                    </SelectTrigger>
                    <SelectContent>
                      {units.map((unit) => (
                        <SelectItem key={unit.value} value={unit.value}>
                          {unit.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Price and Quantity */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price per Unit (₹) *</Label>
                  <Input
                    id="price"
                    type="number"
                    placeholder="e.g., 45"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quantity">Available Quantity *</Label>
                  <Input
                    id="quantity"
                    type="number"
                    placeholder="e.g., 500"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    required
                  />
                </div>
              </div>

              {/* Location and Harvest Date */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    placeholder="Village, District, State"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="harvestDate">Harvest Date *</Label>
                  <Input
                    id="harvestDate"
                    type="date"
                    value={formData.harvestDate}
                    onChange={(e) => setFormData({ ...formData, harvestDate: e.target.value })}
                    required
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your product quality, farming methods, etc."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                />
              </div>

              {/* Organic Checkbox */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="organic"
                  checked={formData.organic}
                  onCheckedChange={(checked) => setFormData({ ...formData, organic: checked as boolean })}
                />
                <Label htmlFor="organic" className="text-sm">
                  This is an organic product (grown without chemicals)
                </Label>
              </div>

              {/* Submit Button */}
              <div className="flex gap-4">
                <Button type="button" variant="outline" asChild className="flex-1 bg-transparent">
                  <Link href="/marketplace">Cancel</Link>
                </Button>
                <Button type="submit" disabled={isLoading} className="flex-1">
                  {isLoading ? "Listing Product..." : "List Product"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Tips Card */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-lg">Tips for Better Sales</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>• Upload clear, high-quality photos of your products</p>
            <p>• Write detailed descriptions about quality and farming methods</p>
            <p>• Set competitive prices based on market rates</p>
            <p>• Mention if your products are organic or chemical-free</p>
            <p>• Keep your contact information updated for buyers</p>
            <p>• Update quantity regularly to avoid overselling</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
