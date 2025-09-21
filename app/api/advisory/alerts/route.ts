import { type NextRequest, NextResponse } from "next/server"

// Mock crop alerts data
const mockAlerts = [
  {
    id: "1",
    type: "warning",
    title: "Pest Alert: Aphids Detected",
    description: "High aphid activity reported in nearby farms. Check your crops and consider preventive measures.",
    action: "Apply neem oil spray",
    priority: "high",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    type: "info",
    title: "Optimal Planting Time",
    description: "Weather conditions are favorable for planting winter crops in the next 7 days.",
    priority: "medium",
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    type: "success",
    title: "Irrigation Reminder",
    description: "Your scheduled irrigation for wheat field is due tomorrow morning.",
    priority: "low",
    createdAt: new Date().toISOString(),
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const priority = searchParams.get("priority")
    const type = searchParams.get("type")

    let filteredAlerts = mockAlerts

    if (priority) {
      filteredAlerts = filteredAlerts.filter((alert) => alert.priority === priority)
    }

    if (type) {
      filteredAlerts = filteredAlerts.filter((alert) => alert.type === type)
    }

    return NextResponse.json({
      success: true,
      data: filteredAlerts,
    })
  } catch (error) {
    console.error("Alerts API error:", error)
    return NextResponse.json({ error: "Failed to fetch alerts" }, { status: 500 })
  }
}
