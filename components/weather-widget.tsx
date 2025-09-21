"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sun, Cloud, CloudRain, Droplets, Wind } from "lucide-react"

interface WeatherWidgetProps {
  temperature: number
  condition: string
  humidity: number
  windSpeed: number
  location?: string
}

export function WeatherWidget({ temperature, condition, humidity, windSpeed, location }: WeatherWidgetProps) {
  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "sunny":
        return <Sun className="h-8 w-8 text-yellow-500" />
      case "partly cloudy":
      case "cloudy":
        return <Cloud className="h-8 w-8 text-gray-500" />
      case "light rain":
      case "rain":
        return <CloudRain className="h-8 w-8 text-blue-500" />
      default:
        return <Sun className="h-8 w-8 text-yellow-500" />
    }
  }

  const getConditionColor = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "sunny":
        return "bg-yellow-100 text-yellow-800"
      case "partly cloudy":
      case "cloudy":
        return "bg-gray-100 text-gray-800"
      case "light rain":
      case "rain":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          {getWeatherIcon(condition)}
          Weather Update
        </CardTitle>
        {location && <p className="text-sm text-muted-foreground">{location}</p>}
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-3xl font-bold text-primary">{temperature}°C</div>
            <Badge className={`text-xs ${getConditionColor(condition)}`}>{condition}</Badge>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Droplets className="h-4 w-4 text-blue-500" />
            <div>
              <p className="font-medium">{humidity}%</p>
              <p className="text-xs text-muted-foreground">Humidity</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Wind className="h-4 w-4 text-gray-500" />
            <div>
              <p className="font-medium">{windSpeed} km/h</p>
              <p className="text-xs text-muted-foreground">Wind</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
