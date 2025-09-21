"use client"

import { useState, useEffect } from "react"
import { type Language, type Translations, getTranslation, getCurrentLanguage, setLanguage } from "@/lib/i18n"

export function useTranslation() {
  const [language, setCurrentLanguage] = useState<Language>("en")

  useEffect(() => {
    setCurrentLanguage(getCurrentLanguage())

    const handleLanguageChange = (event: CustomEvent<Language>) => {
      setCurrentLanguage(event.detail)
    }

    window.addEventListener("languageChange", handleLanguageChange as EventListener)
    return () => {
      window.removeEventListener("languageChange", handleLanguageChange as EventListener)
    }
  }, [])

  const t = (key: keyof Translations): string => {
    return getTranslation(language, key)
  }

  const changeLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage)
    setCurrentLanguage(newLanguage)
  }

  return {
    language,
    t,
    changeLanguage,
    isHindi: language === "hi",
    isEnglish: language === "en",
  }
}
