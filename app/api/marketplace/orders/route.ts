import { type NextRequest, NextResponse } from "next/server"

// Mock orders database
const mockOrders = [
  {
    id: "1",
    buyerName: "Restaurant Owner",
    buyerPhone: "+91 99999 88888",
    buyerAddress: "Mumbai, Maharashtra",
    items: [
      {
        productId: "1",
        productName: "Basmati Rice",
        quantity: 10,
        price: 45,
        unit: "kg",
      },
    ],
    totalAmount: 450,
    status: "pending",
    paymentMethod: "cod",
    notes: "Need delivery by tomorrow",
    createdAt: new Date().toISOString(),
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")

    let filteredOrders = mockOrders

    if (status) {
      filteredOrders = filteredOrders.filter((order) => order.status === status)
    }

    return NextResponse.json({
      success: true,
      data: filteredOrders,
    })
  } catch (error) {
    console.error("Orders API error:", error)
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const orderData = await request.json()

    // Create new order
    const newOrder = {
      id: (mockOrders.length + 1).toString(),
      ...orderData,
      status: "pending",
      createdAt: new Date().toISOString(),
    }

    mockOrders.push(newOrder)

    return NextResponse.json({
      success: true,
      data: newOrder,
    })
  } catch (error) {
    console.error("Create order error:", error)
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 })
  }
}
