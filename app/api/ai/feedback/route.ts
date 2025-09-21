import { type NextRequest, NextResponse } from "next/server"

// Mock feedback database (shared with query route)
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
    const { queryId, rating } = await request.json()

    if (!queryId || !rating) {
      return NextResponse.json({ error: "Query ID and rating are required" }, { status: 400 })
    }

    // Find and update feedback
    const feedbackIndex = mockFeedback.findIndex((f) => f.id === queryId)
    if (feedbackIndex === -1) {
      return NextResponse.json({ error: "Query not found" }, { status: 404 })
    }

    mockFeedback[feedbackIndex].rating = rating

    return NextResponse.json({
      success: true,
      message: "Feedback recorded successfully",
    })
  } catch (error) {
    console.error("Feedback API error:", error)
    return NextResponse.json({ error: "Failed to record feedback" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")

    let filteredFeedback = mockFeedback

    if (userId) {
      filteredFeedback = filteredFeedback.filter((f) => f.userId === userId)
    }

    // Calculate feedback statistics
    const totalQueries = filteredFeedback.length
    const positiveRatings = filteredFeedback.filter((f) => f.rating === "up").length
    const negativeRatings = filteredFeedback.filter((f) => f.rating === "down").length
    const satisfactionRate = totalQueries > 0 ? (positiveRatings / totalQueries) * 100 : 0

    return NextResponse.json({
      success: true,
      data: {
        feedback: filteredFeedback,
        statistics: {
          totalQueries,
          positiveRatings,
          negativeRatings,
          satisfactionRate: Math.round(satisfactionRate),
        },
      },
    })
  } catch (error) {
    console.error("Get feedback error:", error)
    return NextResponse.json({ error: "Failed to fetch feedback" }, { status: 500 })
  }
}
