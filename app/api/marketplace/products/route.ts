import { type NextRequest, NextResponse } from "next/server"

// Mock products database
const mockProducts = [
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
    createdAt: new Date().toISOString(),
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
    createdAt: new Date().toISOString(),
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const search = searchParams.get("search")
    const sortBy = searchParams.get("sortBy")

    let filteredProducts = [...mockProducts]

    // Filter by category
    if (category && category !== "all") {
      filteredProducts = filteredProducts.filter((product) => product.category === category)
    }

    // Filter by search term
    if (search) {
      const searchLower = search.toLowerCase()
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(searchLower) ||
          product.farmer.toLowerCase().includes(searchLower) ||
          product.location.toLowerCase().includes(searchLower),
      )
    }

    // Sort products
    if (sortBy) {
      switch (sortBy) {
        case "price-low":
          filteredProducts.sort((a, b) => a.price - b.price)
          break
        case "price-high":
          filteredProducts.sort((a, b) => b.price - a.price)
          break
        case "rating":
          filteredProducts.sort((a, b) => b.rating - a.rating)
          break
        case "recent":
          filteredProducts.sort((a, b) => new Date(b.harvestDate).getTime() - new Date(a.harvestDate).getTime())
          break
        default:
          filteredProducts.sort((a, b) => a.name.localeCompare(b.name))
      }
    }

    return NextResponse.json({
      success: true,
      data: filteredProducts,
    })
  } catch (error) {
    console.error("Products API error:", error)
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const productData = await request.json()

    // Create new product
    const newProduct = {
      id: (mockProducts.length + 1).toString(),
      ...productData,
      rating: 0,
      reviews: 0,
      createdAt: new Date().toISOString(),
    }

    mockProducts.push(newProduct)

    return NextResponse.json({
      success: true,
      data: newProduct,
    })
  } catch (error) {
    console.error("Create product error:", error)
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 })
  }
}
