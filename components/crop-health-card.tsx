"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Leaf, AlertTriangle, CheckCircle, Volume2 } from "lucide-react"

interface CropHealthCardProps {
  cropName: string
  healthScore: number
  status: "excellent" | "good" | "warning" | "critical"
  description: string
  recommendations?: string[]
}

export function CropHealthCard({ cropName, healthScore, status, description, recommendations }: CropHealthCardProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "excellent":
      case "good":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "warning":
      case "critical":
        return <AlertTriangle className="h-5 w-5 text-orange-500" />
      default:
        return <Leaf className="h-5 w-5 text-green-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent":
        return "bg-green-100 text-green-800"
      case "good":
        return "bg-blue-100 text-blue-800"
      case "warning":
        return "bg-orange-100 text-orange-800"
      case "critical":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const speakRecommendations = () => {
    if (recommendations && "speechSynthesis" in window) {
      const text = `Recommendations for ${cropName}: ${recommendations.join(". ")}`
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = "hi-IN"
      utterance.rate = 0.8
      window.speechSynthesis.speak(utterance)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            {getStatusIcon(status)}
            {cropName}
          </CardTitle>
          <Badge className={`text-xs ${getStatusColor(status)}`}>{status}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span>Health Score</span>
            <span className="font-medium">{healthScore}%</span>
          </div>
          <Progress value={healthScore} className="h-2" />
        </div>

        <p className="text-sm text-muted-foreground">{description}</p>

        {recommendations && recommendations.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Recommendations:</h4>
            <ul className="text-xs text-muted-foreground space-y-1">
              {recommendations.map((rec, index) => (
                <li key={index}>• {rec}</li>
              ))}
            </ul>
            <Button size="sm" variant="ghost" onClick={speakRecommendations} className="text-xs">
              <Volume2 className="h-3 w-3 mr-1" />
              Listen to Recommendations
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
