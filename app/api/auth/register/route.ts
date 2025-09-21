import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

// Mock user database - in real app, this would be MongoDB
const mockUsers = [
  {
    id: "1",
    email: "farmer@example.com",
    phone: "+91 98765 43210",
    password: "password123",
    name: "Rajesh Kumar",
    location: "Punjab",
    farmSize: "medium",
    language: "hindi",
  },
]

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, password, location, farmSize, language } = await request.json()

    // Check if user already exists
    const existingUser = mockUsers.find((u) => u.email === email || u.phone === phone)
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 })
    }

    // Create new user
    const newUser = {
      id: (mockUsers.length + 1).toString(),
      email,
      phone,
      password, // In real app, hash this password
      name,
      location,
      farmSize,
      language,
    }

    mockUsers.push(newUser)

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: newUser.id,
        email: newUser.email,
        name: newUser.name,
      },
      JWT_SECRET,
      { expiresIn: "7d" },
    )

    // Return user data without password
    const { password: _, ...userWithoutPassword } = newUser

    return NextResponse.json({
      success: true,
      token,
      user: userWithoutPassword,
    })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
