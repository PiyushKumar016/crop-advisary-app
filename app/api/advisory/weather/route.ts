import { type NextRequest, NextResponse } from "next/server"

// Mock weather data - in real app, this would come from weather API
const mockWeatherData = {
  current: {
    temperature: 28,
    condition: "Partly Cloudy",
    humidity: 65,
    windSpeed: 12,
    visibility: 10,
    uvIndex: 6,
    location: "Punjab, India",
  },
  forecast: [
    { date: "Today", high: 32, low: 22, condition: "Sunny", precipitation: 0, icon: "sun" },
    { date: "Tomorrow", high: 30, low: 20, condition: "Partly Cloudy", precipitation: 10, icon: "cloud" },
    { date: "Day 3", high: 28, low: 18, condition: "Light Rain", precipitation: 60, icon: "rain" },
    { date: "Day 4", high: 26, low: 16, condition: "Rain", precipitation: 80, icon: "rain" },
    { date: "Day 5", high: 29, low: 19, condition: "Cloudy", precipitation: 20, icon: "cloud" },
  ],
  advisory: [
    {
      type: "info",
      message: "Current conditions are favorable for field work. Good visibility and moderate wind speeds.",
    },
    {
      type: "warning",
      message: "Rain expected in 2 days. Consider completing irrigation and harvesting activities before then.",
    },
  ],
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const location = searchParams.get("location") || "Punjab, India"

    // In real app, fetch weather data from external API based on location
    const weatherData = {
      ...mockWeatherData,
      current: {
        ...mockWeatherData.current,
        location,
      },
    }

    return NextResponse.json({
      success: true,
      data: weatherData,
    })
  } catch (error) {
    console.error("Weather API error:", error)
    return NextResponse.json({ error: "Failed to fetch weather data" }, { status: 500 })
  }
}
