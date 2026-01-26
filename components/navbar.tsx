"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LanguageSwitcher } from "@/components/language-switcher"
import { type Language, type Sport, getTranslation } from "@/lib/i18n"

interface NavbarProps {
  currentLang: Language
  onLanguageChange: (lang: Language) => void
  currentSport: Sport
  onSportChange: (sport: Sport) => void
}

export function Navbar({ currentLang, onLanguageChange, currentSport, onSportChange }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const t = (key: Parameters<typeof getTranslation>[1]) => getTranslation(currentLang, key)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-yellow-500/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* Left: Logo */}
          <Link href="/" className="text-xl font-bold text-yellow-400 tracking-tight">
            SanfraCup
          </Link>

          {/* Center: Navigation Links (Desktop) */}
          <div className="hidden md:flex items-center gap-8">
            <button
              type="button"
              onClick={() => {
                onSportChange("home")
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              {t("home")}
            </button>
            <a
              href="#chi-siamo"
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              {t("aboutUs")}
            </a>
            <Link
              href="/negozio"
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              {t("shop")}
            </Link>
            <span className="text-yellow-500/30">|</span>
            <button
              type="button"
              onClick={() => onSportChange("calcio")}
              className={`text-sm transition-colors ${
                currentSport === "calcio"
                  ? "text-yellow-400 font-medium"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {t("calcio")}
            </button>
            <button
              type="button"
              onClick={() => onSportChange("volley")}
              className={`text-sm transition-colors ${
                currentSport === "volley"
                  ? "text-yellow-400 font-medium"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {t("volley")}
            </button>
          </div>

          {/* Right: Social, Language, Admin */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="https://www.instagram.com/sanfracup/"
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-60 hover:opacity-100 transition-opacity"
            >
              <img 
                src="https://img.icons8.com/?size=100&id=32309&format=png&color=000000" 
                alt="Instagram" 
                className="h-5 w-5 invert"
              />
            </a>
            <a
              href="https://www.tiktok.com/@sanfracup?is_from_webapp=1&sender_device=pc"
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-60 hover:opacity-100 transition-opacity"
            >
              <img 
                src="https://img.icons8.com/?size=100&id=118638&format=png&color=000000" 
                alt="TikTok" 
                className="h-5 w-5 invert"
              />
            </a>
            <LanguageSwitcher currentLang={currentLang} onLanguageChange={onLanguageChange} />
            <Link href="/admin/login">
              <Button
                variant="ghost"
                size="sm"
                className="text-sm text-gray-400 hover:text-white hover:bg-white/10"
              >
                {t("adminArea")}
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden text-white p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-6 border-t border-yellow-500/10 bg-black">
            <div className="flex flex-col gap-4">
              <button
                type="button"
                onClick={() => {
                  onSportChange("home")
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                  setMobileMenuOpen(false)
                }}
                className="text-gray-400 hover:text-white transition-colors py-2 text-left"
              >
                {t("home")}
              </button>
              <a
                href="#chi-siamo"
                className="text-gray-400 hover:text-white transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t("aboutUs")}
              </a>
              <Link
                href="/negozio"
                className="text-gray-400 hover:text-white transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t("shop")}
              </Link>
              
              <div className="border-t border-yellow-500/10 pt-4 flex gap-6">
                <button
                  type="button"
                  onClick={() => {
                    onSportChange("calcio")
                    setMobileMenuOpen(false)
                  }}
                  className={`transition-colors ${
                    currentSport === "calcio"
                      ? "text-yellow-400 font-medium"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {t("calcio")}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onSportChange("volley")
                    setMobileMenuOpen(false)
                  }}
                  className={`transition-colors ${
                    currentSport === "volley"
                      ? "text-yellow-400 font-medium"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {t("volley")}
                </button>
              </div>
              
              <div className="flex items-center gap-4 pt-4 border-t border-yellow-500/10">
                <a
                  href="https://www.instagram.com/sanfracup/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="opacity-60 hover:opacity-100 transition-opacity"
                >
                  <img 
                    src="https://img.icons8.com/?size=100&id=32309&format=png&color=000000" 
                    alt="Instagram" 
                    className="h-5 w-5 invert"
                  />
                </a>
                <a
                  href="https://www.tiktok.com/@sanfracup?is_from_webapp=1&sender_device=pc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="opacity-60 hover:opacity-100 transition-opacity"
                >
                  <img 
                    src="https://img.icons8.com/?size=100&id=118638&format=png&color=000000" 
                    alt="TikTok" 
                    className="h-5 w-5 invert"
                  />
                </a>
                <LanguageSwitcher currentLang={currentLang} onLanguageChange={onLanguageChange} />
                <Link href="/admin/login">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-sm text-gray-400 hover:text-white"
                  >
                    {t("adminArea")}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
