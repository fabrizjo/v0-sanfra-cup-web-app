"use client"

import { Languages } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { Language } from "@/lib/i18n"

interface LanguageSwitcherProps {
  currentLang: Language
  onLanguageChange: (lang: Language) => void
}

export function LanguageSwitcher({ currentLang, onLanguageChange }: LanguageSwitcherProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 bg-black/50 border-yellow-500 text-white hover:bg-yellow-500 hover:text-black"
        >
          <Languages className="h-4 w-4" />
          {currentLang === "it" ? "🇮🇹 IT" : "🇬🇧 EN"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-black border-yellow-500">
        <DropdownMenuItem
          onClick={() => onLanguageChange("it")}
          className="cursor-pointer text-white hover:bg-yellow-500 hover:text-black"
        >
          🇮🇹 Italiano
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => onLanguageChange("en")}
          className="cursor-pointer text-white hover:bg-yellow-500 hover:text-black"
        >
          🇬🇧 English
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
