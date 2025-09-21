"use client"

import { useState, useRef, useEffect } from "react"

export function useSpeechSynthesis() {
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isSupported, setIsSupported] = useState(false)
  const synthesisRef = useRef<SpeechSynthesis | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      synthesisRef.current = window.speechSynthesis
      setIsSupported(true)
    }
  }, [])

  const speak = (
    text: string,
    options?: {
      lang?: string
      rate?: number
      pitch?: number
      volume?: number
    },
  ) => {
    if (!synthesisRef.current || !text) return

    // Stop any ongoing speech
    synthesisRef.current.cancel()

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = options?.lang || "hi-IN"
    utterance.rate = options?.rate || 0.8
    utterance.pitch = options?.pitch || 1
    utterance.volume = options?.volume || 1

    utterance.onstart = () => setIsSpeaking(true)
    utterance.onend = () => setIsSpeaking(false)
    utterance.onerror = () => setIsSpeaking(false)

    synthesisRef.current.speak(utterance)
  }

  const stop = () => {
    if (synthesisRef.current) {
      synthesisRef.current.cancel()
      setIsSpeaking(false)
    }
  }

  const pause = () => {
    if (synthesisRef.current) {
      synthesisRef.current.pause()
    }
  }

  const resume = () => {
    if (synthesisRef.current) {
      synthesisRef.current.resume()
    }
  }

  return {
    speak,
    stop,
    pause,
    resume,
    isSpeaking,
    isSupported,
  }
}
