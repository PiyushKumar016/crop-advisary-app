"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Mic, MicOff } from "lucide-react"
import type SpeechRecognition from "speech-recognition"

interface VoiceButtonProps {
  onTranscript: (text: string) => void
  disabled?: boolean
  language?: string
  className?: string
}

export function VoiceButton({ onTranscript, disabled = false, language = "hi-IN", className = "" }: VoiceButtonProps) {
  const [isListening, setIsListening] = useState(false)
  const recognitionRef = useRef<SpeechRecognition | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition()
        recognitionRef.current.continuous = false
        recognitionRef.current.interimResults = false
        recognitionRef.current.lang = language

        recognitionRef.current.onresult = (event) => {
          const transcript = event.results[0][0].transcript
          onTranscript(transcript)
          setIsListening(false)
        }

        recognitionRef.current.onerror = () => {
          setIsListening(false)
        }

        recognitionRef.current.onend = () => {
          setIsListening(false)
        }
      }
    }
  }, [language, onTranscript])

  const toggleListening = () => {
    if (!recognitionRef.current || disabled) return

    if (isListening) {
      recognitionRef.current.stop()
      setIsListening(false)
    } else {
      recognitionRef.current.start()
      setIsListening(true)
    }
  }

  return (
    <Button
      type="button"
      variant={isListening ? "destructive" : "outline"}
      onClick={toggleListening}
      disabled={disabled || !recognitionRef.current}
      className={className}
    >
      {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
    </Button>
  )
}
