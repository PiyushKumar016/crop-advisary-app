"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  ArrowLeft,
  Sun,
  Cloud,
  CloudRain,
  Droplets,
  Wind,
  Eye,
  AlertTriangle,
  CheckCircle,
  Calendar,
  TrendingUp,
  Leaf,
  Bug,
  Sprout,
  Volume2,
} from "lucide-react"
import Link from "next/link"

interface WeatherData {
  current: {
    temperature: number
    condition: string
    humidity: number
    windSpeed: number
    visibility: number
    uvIndex: number
  }
  forecast: Array<{
    date: string
    high: number
    low: number
    condition: string
    precipitation: number
    icon: string
  }>
}

interface CropAlert {
  id: string
  type: "warning" | "info" | "success"
  title: string
  description: string
  action?: string
  priority: "high" | "medium" | "low"
}

interface FarmingTip {
  id: string
  category: string
  title: string
  description: string
  season: string
  difficulty: "beginner" | "intermediate" | "advanced"
}

const mockWeatherData: WeatherData = {
  current: {
    temperature: 28,
    condition: "Partly Cloudy",
    humidity: 65,
    windSpeed: 12,
    visibility: 10,
    uvIndex: 6,
  },
  forecast: [
    { date: "Today", high: 32, low: 22, condition: "Sunny", precipitation: 0, icon: "sun" },
    { date: "Tomorrow", high: 30, low: 20, condition: "Partly Cloudy", precipitation: 10, icon: "cloud" },
    { date: "Day 3", high: 28, low: 18, condition: "Light Rain", precipitation: 60, icon: "rain" },
    { date: "Day 4", high: 26, low: 16, condition: "Rain", precipitation: 80, icon: "rain" },
    { date: "Day 5", high: 29, low: 19, condition: "Cloudy", precipitation: 20, icon: "cloud" },
  ],
}

const mockCropAlerts: CropAlert[] = [
  {
    id: "1",
    type: "warning",
    title: "Pest Alert: Aphids Detected",
    description: "High aphid activity reported in nearby farms. Check your crops and consider preventive measures.",
    action: "Apply neem oil spray",
    priority: "high",
  },
  {
    id: "2",
    type: "info",
    title: "Optimal Planting Time",
    description: "Weather conditions are favorable for planting winter crops in the next 7 days.",
    priority: "medium",
  },
  {
    id: "3",
    type: "success",
    title: "Irrigation Reminder",
    description: "Your scheduled irrigation for wheat field is due tomorrow morning.",
    priority: "low",
  },
]

const mockFarmingTips: FarmingTip[] = [
  {
    id: "1",
    category: "Soil Health",
    title: "Improve Soil Fertility with Composting",
    description:
      "Create nutrient-rich compost using kitchen scraps and farm waste. This organic matter improves soil structure and provides essential nutrients for better crop growth.",
    season: "All Seasons",
    difficulty: "beginner",
  },
  {
    id: "2",
    category: "Pest Control",
    title: "Natural Pest Control Methods",
    description:
      "Use companion planting and beneficial insects to control pests naturally. Marigolds, basil, and neem trees can help repel harmful insects without chemicals.",
    season: "Growing Season",
    difficulty: "intermediate",
  },
  {
    id: "3",
    category: "Water Management",
    title: "Drip Irrigation for Water Conservation",
    description:
      "Install drip irrigation systems to reduce water usage by 30-50%. This method delivers water directly to plant roots, minimizing evaporation and runoff.",
    season: "All Seasons",
    difficulty: "advanced",
  },
  {
    id: "4",
    category: "Crop Rotation",
    title: "Benefits of Crop Rotation",
    description:
      "Rotate crops to prevent soil depletion and reduce pest buildup. Follow legumes with cereals to naturally fix nitrogen in the soil.",
    season: "Planning Season",
    difficulty: "intermediate",
  },
]

export default function AdvisoryPage() {
  const [selectedTab, setSelectedTab] = useState("weather")
  const [weatherData] = useState<WeatherData>(mockWeatherData)
  const [cropAlerts] = useState<CropAlert[]>(mockCropAlerts)
  const [farmingTips] = useState<FarmingTip[]>(mockFarmingTips)

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "sunny":
        return <Sun className="h-6 w-6 text-yellow-500" />
      case "partly cloudy":
      case "cloudy":
        return <Cloud className="h-6 w-6 text-gray-500" />
      case "light rain":
      case "rain":
        return <CloudRain className="h-6 w-6 text-blue-500" />
      default:
        return <Sun className="h-6 w-6 text-yellow-500" />
    }
  }

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "warning":
        return <AlertTriangle className="h-4 w-4" />
      case "success":
        return <CheckCircle className="h-4 w-4" />
      default:
        return <AlertTriangle className="h-4 w-4" />
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-100 text-green-800"
      case "intermediate":
        return "bg-yellow-100 text-yellow-800"
      case "advanced":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const speakText = (text: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = "hi-IN"
      utterance.rate = 0.8
      window.speechSynthesis.speak(utterance)
    }
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
              <h1 className="text-xl font-bold text-foreground">Farm Advisory</h1>
            </div>
            <Badge variant="outline">Real-time Updates</Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="weather">Weather</TabsTrigger>
            <TabsTrigger value="alerts">Crop Alerts</TabsTrigger>
            <TabsTrigger value="tips">Farming Tips</TabsTrigger>
            <TabsTrigger value="calendar">Farm Calendar</TabsTrigger>
          </TabsList>

          {/* Weather Tab */}
          <TabsContent value="weather" className="space-y-6">
            {/* Current Weather */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {getWeatherIcon(weatherData.current.condition)}
                  Current Weather
                </CardTitle>
                <CardDescription>Real-time weather conditions for your location</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">{weatherData.current.temperature}°C</div>
                    <p className="text-sm text-muted-foreground">{weatherData.current.condition}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Droplets className="h-4 w-4 text-blue-500" />
                    <div>
                      <p className="font-medium">{weatherData.current.humidity}%</p>
                      <p className="text-xs text-muted-foreground">Humidity</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Wind className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="font-medium">{weatherData.current.windSpeed} km/h</p>
                      <p className="text-xs text-muted-foreground">Wind Speed</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4 text-purple-500" />
                    <div>
                      <p className="font-medium">{weatherData.current.visibility} km</p>
                      <p className="text-xs text-muted-foreground">Visibility</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">UV Index</span>
                    <span className="text-sm">{weatherData.current.uvIndex}/10</span>
                  </div>
                  <Progress value={weatherData.current.uvIndex * 10} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-1">
                    {weatherData.current.uvIndex <= 3
                      ? "Low - Safe for outdoor work"
                      : weatherData.current.uvIndex <= 6
                        ? "Moderate - Use sun protection"
                        : "High - Limit outdoor exposure"}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Weather Forecast */}
            <Card>
              <CardHeader>
                <CardTitle>5-Day Forecast</CardTitle>
                <CardDescription>Plan your farming activities based on upcoming weather</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  {weatherData.forecast.map((day, index) => (
                    <div key={index} className="text-center p-3 border border-border rounded-lg">
                      <p className="font-medium text-sm mb-2">{day.date}</p>
                      <div className="flex justify-center mb-2">{getWeatherIcon(day.condition)}</div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">
                          {day.high}° / {day.low}°
                        </p>
                        <p className="text-xs text-muted-foreground">{day.condition}</p>
                        {day.precipitation > 0 && (
                          <div className="flex items-center justify-center gap-1">
                            <Droplets className="h-3 w-3 text-blue-500" />
                            <span className="text-xs">{day.precipitation}%</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Weather Advisory */}
            <Card>
              <CardHeader>
                <CardTitle>Weather Advisory</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    Current conditions are favorable for field work. Good visibility and moderate wind speeds.
                  </AlertDescription>
                </Alert>
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    Rain expected in 2 days. Consider completing irrigation and harvesting activities before then.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Crop Alerts Tab */}
          <TabsContent value="alerts" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Active Crop Alerts</CardTitle>
                <CardDescription>Important notifications about your crops and farming conditions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {cropAlerts.map((alert) => (
                  <Alert key={alert.id} className={alert.type === "warning" ? "border-orange-200" : ""}>
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5">{getAlertIcon(alert.type)}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium">{alert.title}</h4>
                          <Badge variant={alert.priority === "high" ? "destructive" : "secondary"} className="text-xs">
                            {alert.priority}
                          </Badge>
                        </div>
                        <AlertDescription className="mb-2">{alert.description}</AlertDescription>
                        {alert.action && (
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              {alert.action}
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => speakText(`${alert.title}. ${alert.description}`)}
                            >
                              <Volume2 className="h-3 w-3" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </Alert>
                ))}
              </CardContent>
            </Card>

            {/* Crop Health Monitor */}
            <Card>
              <CardHeader>
                <CardTitle>Crop Health Monitor</CardTitle>
                <CardDescription>Overview of your crop conditions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border border-border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Leaf className="h-5 w-5 text-green-500" />
                      <h4 className="font-medium">Wheat Field</h4>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Health Score</span>
                        <span className="font-medium">85%</span>
                      </div>
                      <Progress value={85} className="h-2" />
                      <p className="text-xs text-muted-foreground">Good condition, regular monitoring needed</p>
                    </div>
                  </div>

                  <div className="p-4 border border-border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Sprout className="h-5 w-5 text-green-500" />
                      <h4 className="font-medium">Vegetable Garden</h4>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Health Score</span>
                        <span className="font-medium">92%</span>
                      </div>
                      <Progress value={92} className="h-2" />
                      <p className="text-xs text-muted-foreground">Excellent condition, thriving growth</p>
                    </div>
                  </div>

                  <div className="p-4 border border-border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Bug className="h-5 w-5 text-orange-500" />
                      <h4 className="font-medium">Rice Paddy</h4>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Health Score</span>
                        <span className="font-medium">68%</span>
                      </div>
                      <Progress value={68} className="h-2" />
                      <p className="text-xs text-muted-foreground">Pest activity detected, action required</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Farming Tips Tab */}
          <TabsContent value="tips" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Farming Tips & Best Practices</CardTitle>
                <CardDescription>Expert advice to improve your farming techniques</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {farmingTips.map((tip) => (
                    <Card key={tip.id} className="border border-border">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="text-xs">
                            {tip.category}
                          </Badge>
                          <Badge className={`text-xs ${getDifficultyColor(tip.difficulty)}`}>{tip.difficulty}</Badge>
                        </div>
                        <CardTitle className="text-lg">{tip.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-3">{tip.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">{tip.season}</span>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => speakText(`${tip.title}. ${tip.description}`)}
                          >
                            <Volume2 className="h-3 w-3 mr-1" />
                            Listen
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Farm Calendar Tab */}
          <TabsContent value="calendar" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Farm Calendar</CardTitle>
                <CardDescription>Seasonal farming activities and important dates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Card className="border border-green-200 bg-green-50">
                      <CardHeader className="pb-2">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-green-600" />
                          <CardTitle className="text-sm">This Week</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="text-sm space-y-1">
                          <li>• Wheat irrigation scheduled</li>
                          <li>• Pest monitoring for vegetables</li>
                          <li>• Soil testing for new plot</li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="border border-blue-200 bg-blue-50">
                      <CardHeader className="pb-2">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-blue-600" />
                          <CardTitle className="text-sm">Next Week</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="text-sm space-y-1">
                          <li>• Fertilizer application</li>
                          <li>• Harvest tomatoes</li>
                          <li>• Prepare land for winter crops</li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="border border-orange-200 bg-orange-50">
                      <CardHeader className="pb-2">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-orange-600" />
                          <CardTitle className="text-sm">This Month</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="text-sm space-y-1">
                          <li>• Winter crop sowing</li>
                          <li>• Equipment maintenance</li>
                          <li>• Market price analysis</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Seasonal Recommendations</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium mb-2 flex items-center gap-2">
                            <TrendingUp className="h-4 w-4 text-primary" />
                            Current Season Activities
                          </h4>
                          <ul className="text-sm space-y-1 text-muted-foreground">
                            <li>• Plant winter vegetables (cabbage, cauliflower)</li>
                            <li>• Harvest kharif crops (rice, sugarcane)</li>
                            <li>• Prepare soil for rabi season</li>
                            <li>• Apply organic manure</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2 flex items-center gap-2">
                            <Leaf className="h-4 w-4 text-primary" />
                            Upcoming Activities
                          </h4>
                          <ul className="text-sm space-y-1 text-muted-foreground">
                            <li>• Wheat and barley sowing</li>
                            <li>• Mustard and gram planting</li>
                            <li>• Irrigation system maintenance</li>
                            <li>• Pest control measures</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
