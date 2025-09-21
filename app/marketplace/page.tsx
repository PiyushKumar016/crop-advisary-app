"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Search, Filter, Plus, MapPin, Calendar, Star, ShoppingCart, Phone } from "lucide-react"
import Link from "next/link"

interface Product {
  id: string
  name: string
  category: string
  price: number
  unit: string
  quantity: number
  location: string
  farmer: string
  farmerPhone: string
  description: string
  image: string
  rating: number
  reviews: number
  harvestDate: string
  organic: boolean
}

const mockProducts: Product[] = [
  {
    id: "1",
    name: "Basmati Rice",
    category: "grains",
    price: 45,
    unit: "kg",
    quantity: 500,
    location: "Punjab",
    farmer: "Rajesh Kumar",
    farmerPhone: "+91 98765 43210",
    description: "Premium quality basmati rice, freshly harvested",
    image: "/basmati-rice-grains.jpg",
    rating: 4.8,
    reviews: 24,
    harvestDate: "2024-01-15",
    organic: true,
  },
  {
    id: "2",
    name: "Fresh Tomatoes",
    category: "vegetables",
    price: 25,
    unit: "kg",
    quantity: 200,
    location: "Maharashtra",
    farmer: "Sunita Patil",
    farmerPhone: "+91 87654 32109",
    description: "Fresh red tomatoes, perfect for cooking",
    image: "/fresh-red-tomatoes.jpg",
    rating: 4.5,
    reviews: 18,
    harvestDate: "2024-01-20",
    organic: false,
  },
  {
    id: "3",
    name: "Wheat Flour",
    category: "grains",
    price: 35,
    unit: "kg",
    quantity: 300,
    location: "Haryana",
    farmer: "Mohan Singh",
    farmerPhone: "+91 76543 21098",
    description: "Stone ground wheat flour, chemical-free",
    image: "/wheat-flour-powder.jpg",
    rating: 4.7,
    reviews: 31,
    harvestDate: "2024-01-10",
    organic: true,
  },
  {
    id: "4",
    name: "Green Chilies",
    category: "vegetables",
    price: 40,
    unit: "kg",
    quantity: 50,
    location: "Karnataka",
    farmer: "Lakshmi Reddy",
    farmerPhone: "+91 65432 10987",
    description: "Spicy green chilies, freshly picked",
    image: "/green-chilies-peppers.jpg",
    rating: 4.6,
    reviews: 12,
    harvestDate: "2024-01-22",
    organic: false,
  },
  {
    id: "5",
    name: "Organic Onions",
    category: "vegetables",
    price: 30,
    unit: "kg",
    quantity: 400,
    location: "Gujarat",
    farmer: "Kiran Patel",
    farmerPhone: "+91 54321 09876",
    description: "Certified organic onions, no chemicals used",
    image: "/organic-onions-bulbs.jpg",
    rating: 4.9,
    reviews: 45,
    harvestDate: "2024-01-18",
    organic: true,
  },
  {
    id: "6",
    name: "Fresh Milk",
    category: "dairy",
    price: 55,
    unit: "liter",
    quantity: 100,
    location: "Rajasthan",
    farmer: "Ganga Devi",
    farmerPhone: "+91 43210 98765",
    description: "Fresh cow milk, delivered daily",
    image: "/fresh-cow-milk-glass.jpg",
    rating: 4.8,
    reviews: 28,
    harvestDate: "2024-01-25",
    organic: true,
  },
]

export default function MarketplacePage() {
  const [products, setProducts] = useState<Product[]>(mockProducts)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("name")
  const [cart, setCart] = useState<{ [key: string]: number }>({})

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "grains", label: "Grains & Cereals" },
    { value: "vegetables", label: "Vegetables" },
    { value: "fruits", label: "Fruits" },
    { value: "dairy", label: "Dairy Products" },
    { value: "spices", label: "Spices" },
  ]

  const filteredProducts = products
    .filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.farmer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.location.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "rating":
          return b.rating - a.rating
        case "recent":
          return new Date(b.harvestDate).getTime() - new Date(a.harvestDate).getTime()
        default:
          return a.name.localeCompare(b.name)
      }
    })

  const addToCart = (productId: string) => {
    setCart((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1,
    }))
  }

  const getTotalCartItems = () => {
    return Object.values(cart).reduce((sum, quantity) => sum + quantity, 0)
  }

  const getTotalCartValue = () => {
    return Object.entries(cart).reduce((total, [productId, quantity]) => {
      const product = products.find((p) => p.id === productId)
      return total + (product ? product.price * quantity : 0)
    }, 0)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Link>
              </Button>
              <h1 className="text-xl font-bold text-foreground">Marketplace</h1>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" asChild>
                <Link href="/marketplace/sell">
                  <Plus className="h-4 w-4 mr-2" />
                  Sell Product
                </Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link href="/marketplace/cart">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Cart ({getTotalCartItems()})
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <Tabs defaultValue="browse" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="browse">Browse Products</TabsTrigger>
            <TabsTrigger value="my-listings">My Listings</TabsTrigger>
          </TabsList>

          <TabsContent value="browse" className="space-y-6">
            {/* Search and Filters */}
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search products, farmers, or locations..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-full md:w-48">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-full md:w-48">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="name">Name A-Z</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                      <SelectItem value="recent">Recently Harvested</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    {product.organic && <Badge className="absolute top-2 left-2 bg-green-600">Organic</Badge>}
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{product.name}</CardTitle>
                        <CardDescription className="flex items-center gap-1 mt-1">
                          <MapPin className="h-3 w-3" />
                          {product.location}
                        </CardDescription>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">₹{product.price}</div>
                        <div className="text-sm text-muted-foreground">per {product.unit}</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{product.rating}</span>
                        <span className="text-muted-foreground">({product.reviews})</span>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {new Date(product.harvestDate).toLocaleDateString()}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">{product.farmer}</p>
                        <p className="text-xs text-muted-foreground">
                          {product.quantity} {product.unit} available
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`tel:${product.farmerPhone}`}>
                            <Phone className="h-3 w-3" />
                          </Link>
                        </Button>
                        <Button size="sm" onClick={() => addToCart(product.id)}>
                          <ShoppingCart className="h-3 w-3 mr-1" />
                          Add
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <Card>
                <CardContent className="p-8 text-center">
                  <p className="text-muted-foreground">No products found matching your criteria.</p>
                  <Button className="mt-4" asChild>
                    <Link href="/marketplace/sell">List Your Product</Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="my-listings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>My Product Listings</CardTitle>
                <CardDescription>Manage your products and view sales</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">You haven't listed any products yet.</p>
                  <Button asChild>
                    <Link href="/marketplace/sell">
                      <Plus className="h-4 w-4 mr-2" />
                      List Your First Product
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Cart Summary */}
        {getTotalCartItems() > 0 && (
          <div className="fixed bottom-4 right-4 z-50">
            <Card className="shadow-lg">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div>
                    <p className="font-medium">{getTotalCartItems()} items</p>
                    <p className="text-sm text-muted-foreground">₹{getTotalCartValue()}</p>
                  </div>
                  <Button asChild>
                    <Link href="/marketplace/cart">View Cart</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
