import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

// Mock user database - in real app, this would be MongoDB
const mockUsers = [
  {
    id: "1",
    email: "farmer@example.com",
    phone: "+91 98765 43210",
    password: "password123", // In real app, this would be hashed
    name: "Rajesh Kumar",
    location: "Punjab",
    farmSize: "medium",
    language: "hindi",
  },
  {
    id: "2",
    email: "demo@kisanseva.com",
    phone: "+91 87654 32109",
    password: "demo123",
    name: "Demo Farmer",
    location: "Maharashtra",
    farmSize: "small",
    language: "english",
  },
]

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Find user by email or phone
    const user = mockUsers.find((u) => u.email === email || u.phone === email)

    if (!user || user.password !== password) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        name: user.name,
      },
      JWT_SECRET,
      { expiresIn: "7d" },
    )

    // Return user data without password
    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json({
      success: true,
      token,
      user: userWithoutPassword,
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
