"use client"

import { Button } from "@/components/ui/button"
import { useTranslation } from "@/hooks/use-translation"
import { Languages } from "lucide-react"

export function LanguageSwitcher() {
  const { language, changeLanguage } = useTranslation()

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => changeLanguage(language === "en" ? "hi" : "en")}
      className="flex items-center gap-2"
    >
      <Languages className="h-4 w-4" />
      <span className="text-sm font-medium">{language === "en" ? "हिं" : "EN"}</span>
    </Button>
  )
}
