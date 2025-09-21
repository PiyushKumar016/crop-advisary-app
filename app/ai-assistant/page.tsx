"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Mic, MicOff, Send, Volume2, VolumeX, ThumbsUp, ThumbsDown, RotateCcw, ArrowLeft, Sprout } from "lucide-react"
import Link from "next/link"
import type SpeechRecognition from "speech-recognition"

interface Message {
  id: string
  type: "user" | "assistant"
  content: string
  timestamp: Date
  isVoice?: boolean
  rating?: "up" | "down" | null
  alternatives?: string[]
}

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "assistant",
      content:
        "Namaste! I am your AI farming assistant. You can ask me questions about crops, weather, diseases, or any farming topic. Speak or type your question.",
      timestamp: new Date(),
    },
  ])
  const [inputText, setInputText] = useState("")
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [speechEnabled, setSpeechEnabled] = useState(true)

  const recognitionRef = useRef<SpeechRecognition | null>(null)
  const synthesisRef = useRef<SpeechSynthesis | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Initialize speech recognition and synthesis
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Speech Recognition
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition()
        recognitionRef.current.continuous = false
        recognitionRef.current.interimResults = false
        recognitionRef.current.lang = "hi-IN" // Default to Hindi, can be changed based on user preference

        recognitionRef.current.onresult = (event) => {
          const transcript = event.results[0][0].transcript
          setInputText(transcript)
          setIsListening(false)
        }

        recognitionRef.current.onerror = () => {
          setIsListening(false)
        }

        recognitionRef.current.onend = () => {
          setIsListening(false)
        }
      }

      // Speech Synthesis
      synthesisRef.current = window.speechSynthesis
    }
  }, [])

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setIsListening(true)
      recognitionRef.current.start()
    }
  }

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop()
      setIsListening(false)
    }
  }

  const speakText = (text: string) => {
    if (synthesisRef.current && speechEnabled) {
      // Stop any ongoing speech
      synthesisRef.current.cancel()

      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = "hi-IN" // Can be changed based on user preference
      utterance.rate = 0.8
      utterance.pitch = 1

      utterance.onstart = () => setIsSpeaking(true)
      utterance.onend = () => setIsSpeaking(false)
      utterance.onerror = () => setIsSpeaking(false)

      synthesisRef.current.speak(utterance)
    }
  }

  const stopSpeaking = () => {
    if (synthesisRef.current) {
      synthesisRef.current.cancel()
      setIsSpeaking(false)
    }
  }

  const sendMessage = async (text: string, isVoice = false) => {
    if (!text.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: text,
      timestamp: new Date(),
      isVoice,
    }

    setMessages((prev) => [...prev, userMessage])
    setInputText("")
    setIsLoading(true)

    // Simulate AI response (in real app, this would call your backend API)
    setTimeout(() => {
      const responses = [
        "Based on your question about crop diseases, I recommend checking for common symptoms like yellowing leaves or spots. Consider using organic neem oil as a natural treatment.",
        "For better wheat yield, ensure proper soil preparation, use quality seeds, and maintain adequate irrigation. The current weather conditions are favorable for wheat cultivation.",
        "Government schemes available for farmers include PM-KISAN, Soil Health Card, and Pradhan Mantri Fasal Bima Yojana. Would you like details about any specific scheme?",
        "For organic farming, focus on composting, crop rotation, and natural pest control methods. This will improve soil health and reduce chemical dependency.",
        "Market prices for your crops are currently favorable. Consider selling through our marketplace to get better rates directly from buyers.",
      ]

      const randomResponse = responses[Math.floor(Math.random() * responses.length)]

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: randomResponse,
        timestamp: new Date(),
        alternatives: [
          "Here's an alternative approach to your farming question...",
          "Another perspective on this topic would be...",
          "You might also consider this farming technique...",
        ],
      }

      setMessages((prev) => [...prev, assistantMessage])
      setIsLoading(false)

      // Auto-speak the response if speech is enabled
      if (speechEnabled) {
        speakText(randomResponse)
      }
    }, 1500)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(inputText)
  }

  const rateMessage = (messageId: string, rating: "up" | "down") => {
    setMessages((prev) => prev.map((msg) => (msg.id === messageId ? { ...msg, rating } : msg)))
  }

  const requestAlternative = (messageId: string) => {
    const message = messages.find((msg) => msg.id === messageId)
    if (message?.alternatives) {
      const randomAlt = message.alternatives[Math.floor(Math.random() * message.alternatives.length)]
      const newMessage: Message = {
        id: Date.now().toString(),
        type: "assistant",
        content: randomAlt,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, newMessage])

      if (speechEnabled) {
        speakText(randomAlt)
      }
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
              <div className="flex items-center gap-2">
                <Sprout className="h-6 w-6 text-primary" />
                <h1 className="text-xl font-bold text-foreground">AI Assistant</h1>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={speechEnabled ? "default" : "secondary"}>
                {speechEnabled ? "Voice On" : "Voice Off"}
              </Badge>
              <Button variant="outline" size="sm" onClick={() => setSpeechEnabled(!speechEnabled)}>
                {speechEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Chat Messages */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Chat with AI Assistant</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-96 w-full pr-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.type === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        <div className="flex-1">
                          <p className="text-sm">{message.content}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-xs opacity-70">{message.timestamp.toLocaleTimeString()}</span>
                            {message.isVoice && (
                              <Badge variant="outline" className="text-xs">
                                <Mic className="h-3 w-3 mr-1" />
                                Voice
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Rating and alternatives for assistant messages */}
                      {message.type === "assistant" && (
                        <div className="flex items-center gap-2 mt-3 pt-2 border-t border-border/50">
                          <div className="flex gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => rateMessage(message.id, "up")}
                              className={`h-6 w-6 p-0 ${message.rating === "up" ? "text-green-600" : ""}`}
                            >
                              <ThumbsUp className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => rateMessage(message.id, "down")}
                              className={`h-6 w-6 p-0 ${message.rating === "down" ? "text-red-600" : ""}`}
                            >
                              <ThumbsDown className="h-3 w-3" />
                            </Button>
                          </div>
                          <Separator orientation="vertical" className="h-4" />
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => requestAlternative(message.id)}
                            className="h-6 text-xs"
                          >
                            <RotateCcw className="h-3 w-3 mr-1" />
                            Try Different Answer
                          </Button>
                          {speechEnabled && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => speakText(message.content)}
                              className="h-6 text-xs"
                            >
                              <Volume2 className="h-3 w-3 mr-1" />
                              Speak
                            </Button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-muted rounded-lg p-3">
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                        <span className="text-sm">AI is thinking...</span>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Input Section */}
        <Card>
          <CardContent className="p-4">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <div className="flex-1 relative">
                <Input
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Ask about farming, crops, weather, or any agricultural topic..."
                  disabled={isLoading || isListening}
                  className="pr-12"
                />
                {isListening && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <div className="animate-pulse text-red-500">
                      <Mic className="h-4 w-4" />
                    </div>
                  </div>
                )}
              </div>

              <Button
                type="button"
                variant="outline"
                onClick={isListening ? stopListening : startListening}
                disabled={isLoading}
                className={isListening ? "bg-red-50 border-red-200" : ""}
              >
                {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </Button>

              <Button type="submit" disabled={isLoading || !inputText.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </form>

            {isSpeaking && (
              <div className="flex items-center justify-between mt-3 p-2 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Volume2 className="h-4 w-4 text-blue-600" />
                  <span className="text-sm text-blue-800">Speaking response...</span>
                </div>
                <Button variant="ghost" size="sm" onClick={stopSpeaking}>
                  Stop
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Questions */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-lg">Quick Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                "What crops should I plant this season?",
                "How to prevent pest attacks?",
                "Current weather forecast for farming",
                "Government schemes for farmers",
                "Organic farming techniques",
                "Market prices for my crops",
              ].map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="justify-start text-left h-auto p-3 bg-transparent"
                  onClick={() => sendMessage(question)}
                  disabled={isLoading}
                >
                  {question}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
