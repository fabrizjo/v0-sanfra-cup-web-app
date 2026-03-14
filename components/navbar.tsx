"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import { Menu, X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LanguageSwitcher } from "@/components/language-switcher"
import { type Language, type Sport, getTranslation } from "@/lib/i18n"
import { motion, AnimatePresence, MotionConfig } from "framer-motion"
import { useClickAway } from "@/hooks/use-click-away"

interface NavbarProps {
  currentLang: Language
  onLanguageChange: (lang: Language) => void
  currentSport: Sport
  onSportChange: (sport: Sport) => void
}

const socialLinks = [
  {
    id: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/sanfracup/",
    icon: "https://img.icons8.com/?size=100&id=32309&format=png&color=000000",
    color: "#E1306C",
  },
  {
    id: "tiktok",
    label: "TikTok",
    href: "https://www.tiktok.com/@sanfracup?is_from_webapp=1&sender_device=pc",
    icon: "https://img.icons8.com/?size=100&id=118638&format=png&color=000000",
    color: "#00f2ea",
  },
  {
    id: "facebook",
    label: "Facebook",
    href: "#",
    icon: "https://img.icons8.com/?size=100&id=118497&format=png&color=000000",
    color: "#1877F2",
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    href: "#",
    icon: "https://img.icons8.com/?size=100&id=16713&format=png&color=000000",
    color: "#25D366",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren" as const,
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
}

function SocialDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useClickAway(dropdownRef, () => setIsOpen(false))

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center gap-1 text-sm transition-colors ${
            isOpen ? "text-white" : "text-gray-400 hover:text-white"
          }`}
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          I nostri media
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-center"
          >
            <ChevronDown className="w-3.5 h-3.5" />
          </motion.div>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 1, y: 0, height: 0 }}
              animate={{
                opacity: 1,
                y: 0,
                height: "auto",
                transition: { type: "spring", stiffness: 500, damping: 30, mass: 1 },
              }}
              exit={{
                opacity: 0,
                y: 0,
                height: 0,
                transition: { type: "spring", stiffness: 500, damping: 30, mass: 1 },
              }}
              className="absolute left-1/2 -translate-x-1/2 top-full mt-3 w-48"
            >
              <motion.div
                className="rounded-lg border border-neutral-800 bg-neutral-900 p-1 shadow-lg"
                initial={{ borderRadius: 8 }}
                animate={{ borderRadius: 12, transition: { duration: 0.2 } }}
                style={{ transformOrigin: "top" }}
              >
                <motion.div className="py-1 relative" variants={containerVariants} initial="hidden" animate="visible">
                  <motion.div
                    layoutId="social-hover-highlight"
                    className="absolute inset-x-1 bg-neutral-800 rounded-md"
                    animate={{
                      y: socialLinks.findIndex((s) => (hoveredItem || socialLinks[0].id) === s.id) * 40,
                      height: 40,
                    }}
                    transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                  />
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.id}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsOpen(false)}
                      onHoverStart={() => setHoveredItem(social.id)}
                      onHoverEnd={() => setHoveredItem(null)}
                      className={`relative flex w-full items-center px-4 py-2.5 text-sm rounded-md transition-colors duration-150 focus:outline-none ${
                        hoveredItem === social.id ? "text-neutral-200" : "text-neutral-400"
                      }`}
                      whileTap={{ scale: 0.98 }}
                      variants={itemVariants}
                    >
                      <motion.div
                        className="w-4 h-4 mr-2.5 relative"
                        initial={false}
                        animate={hoveredItem === social.id ? { scale: 1.2 } : { scale: 1 }}
                      >
                        <img
                          src={social.icon || "/placeholder.svg"}
                          alt=""
                          className="w-4 h-4 invert"
                          style={hoveredItem === social.id ? { filter: "invert(1)" } : { filter: "invert(0.6)" }}
                        />
                      </motion.div>
                      {social.label}
                    </motion.a>
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MotionConfig>
  )
}

export function Navbar({ currentLang, onLanguageChange, currentSport, onSportChange }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const t = (key: Parameters<typeof getTranslation>[1]) => getTranslation(currentLang, key)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-yellow-500/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* Left: Logo */}
          <Link href="/" className="text-xl font-spacema tracking-tight">
            <span className="text-white">Sanfra</span>{' '}<span className="text-yellow-400">Cup</span>
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
            <button
              type="button"
              onClick={() => {
                if (currentSport !== "home") {
                  onSportChange("home")
                  setTimeout(() => {
                    const el = document.getElementById("chi-siamo")
                    el?.scrollIntoView({ behavior: "smooth" })
                  }, 300)
                } else {
                  const el = document.getElementById("chi-siamo")
                  el?.scrollIntoView({ behavior: "smooth" })
                }
              }}
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              {t("aboutUs")}
            </button>
            <button
              type="button"
              onClick={() => {
                if (currentSport !== "home") {
                  onSportChange("home")
                  setTimeout(() => {
                    const el = document.getElementById("eventi")
                    el?.scrollIntoView({ behavior: "smooth" })
                  }, 300)
                } else {
                  const el = document.getElementById("eventi")
                  el?.scrollIntoView({ behavior: "smooth" })
                }
              }}
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              I Nostri Eventi
            </button>
            <button
              type="button"
              onClick={() => {
                if (currentSport !== "home") {
                  onSportChange("home")
                  setTimeout(() => {
                    const el = document.getElementById("sponsor")
                    el?.scrollIntoView({ behavior: "smooth" })
                  }, 300)
                } else {
                  const el = document.getElementById("sponsor")
                  el?.scrollIntoView({ behavior: "smooth" })
                }
              }}
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              I Nostri Sponsor
            </button>
            <Link
              href="/registrazione"
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Card Sanfra Cup
            </Link>
            <SocialDropdown />
          </div>

          {/* Right: Language, Admin */}
          <div className="hidden md:flex items-center gap-4">
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
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false)
                  if (currentSport !== "home") {
                    onSportChange("home")
                    setTimeout(() => {
                      const el = document.getElementById("chi-siamo")
                      el?.scrollIntoView({ behavior: "smooth" })
                    }, 300)
                  } else {
                    const el = document.getElementById("chi-siamo")
                    el?.scrollIntoView({ behavior: "smooth" })
                  }
                }}
                className="text-gray-400 hover:text-white transition-colors py-2 text-left"
              >
                {t("aboutUs")}
              </button>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false)
                  if (currentSport !== "home") {
                    onSportChange("home")
                    setTimeout(() => {
                      const el = document.getElementById("eventi")
                      el?.scrollIntoView({ behavior: "smooth" })
                    }, 300)
                  } else {
                    const el = document.getElementById("eventi")
                    el?.scrollIntoView({ behavior: "smooth" })
                  }
                }}
                className="text-gray-400 hover:text-white transition-colors py-2 text-left"
              >
                I Nostri Eventi
              </button>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false)
                  if (currentSport !== "home") {
                    onSportChange("home")
                    setTimeout(() => {
                      const el = document.getElementById("sponsor")
                      el?.scrollIntoView({ behavior: "smooth" })
                    }, 300)
                  } else {
                    const el = document.getElementById("sponsor")
                    el?.scrollIntoView({ behavior: "smooth" })
                  }
                }}
                className="text-gray-400 hover:text-white transition-colors py-2 text-left"
              >
                I Nostri Sponsor
              </button>
              <Link
                href="/registrazione"
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-400 hover:text-white transition-colors py-2 text-left"
              >
                Card Sanfra Cup
              </Link>
              
              {/* Social links in mobile */}
              <div className="py-2">
                <p className="text-sm text-gray-500 mb-2">I nostri media</p>
                <div className="flex flex-wrap gap-4 pl-2">
                  {socialLinks.map((social) => (
                    <a
                      key={social.id}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <img
                        src={social.icon}
                        alt={social.label}
                        className="h-5 w-5 invert opacity-60"
                      />
                      <span className="text-sm">{social.label}</span>
                    </a>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center gap-4 pt-4 border-t border-yellow-500/10">
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
