import { type NextRequest, NextResponse } from "next/server"

// Mock AI responses for farming queries
const mockAIResponses = [
  "Based on your question about crop diseases, I recommend checking for common symptoms like yellowing leaves or spots. Consider using organic neem oil as a natural treatment.",
  "For better wheat yield, ensure proper soil preparation, use quality seeds, and maintain adequate irrigation. The current weather conditions are favorable for wheat cultivation.",
  "Government schemes available for farmers include PM-KISAN, Soil Health Card, and Pradhan Mantri Fasal Bima Yojana. Would you like details about any specific scheme?",
  "For organic farming, focus on composting, crop rotation, and natural pest control methods. This will improve soil health and reduce chemical dependency.",
  "Market prices for your crops are currently favorable. Consider selling through our marketplace to get better rates directly from buyers.",
  "To prevent pest attacks, use integrated pest management techniques including beneficial insects, crop rotation, and organic pesticides like neem oil.",
  "Soil testing is recommended every 2-3 years. Based on results, adjust fertilizer application to maintain optimal nutrient levels for your crops.",
]

// Mock feedback database
const mockFeedback: Array<{
  id: string
  query: string
  response: string
  rating: "up" | "down" | null
  userId: string
  createdAt: string
}> = []

export async function POST(request: NextRequest) {
  try {
    const { query, userId } = await request.json()

    if (!query || !query.trim()) {
      return NextResponse.json({ error: "Query is required" }, { status: 400 })
    }

    // Simulate AI processing delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Get random response (in real app, this would call actual AI service)
    const randomResponse = mockAIResponses[Math.floor(Math.random() * mockAIResponses.length)]

    // Store query and response for feedback
    const queryRecord = {
      id: Date.now().toString(),
      query: query.trim(),
      response: randomResponse,
      rating: null,
      userId: userId || "anonymous",
      createdAt: new Date().toISOString(),
    }

    mockFeedback.push(queryRecord)

    // Generate alternative responses
    const alternatives = mockAIResponses
      .filter((response) => response !== randomResponse)
      .slice(0, 3)
      .map((alt) => alt.substring(0, 100) + "...")

    return NextResponse.json({
      success: true,
      data: {
        id: queryRecord.id,
        response: randomResponse,
        alternatives,
        confidence: Math.random() * 0.3 + 0.7, // Random confidence between 0.7-1.0
      },
    })
  } catch (error) {
    console.error("AI query error:", error)
    return NextResponse.json({ error: "Failed to process AI query" }, { status: 500 })
  }
}
