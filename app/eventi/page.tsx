"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { ArrowLeft } from "lucide-react"
import { type Language, type Sport } from "@/lib/i18n"

export default function EventiPage() {
  const [currentSport, setCurrentSport] = useState<Sport>("home")
  const [currentLang, setCurrentLang] = useState<Language>("it")

  const events = [
    {
      id: "calcio-open",
      title: "Calcio Open",
      description: "Torneo di calcio a 5 per tutte le età. Sfida i tuoi amici e dimostra il tuo valore sul campo!",
      sport: "calcio" as const,
      image: "/images/calcio-open.jpg",
      href: "/eventi/calcio-open"
    },
    {
      id: "calcio-junior",
      title: "Calcio Junior",
      description: "Torneo di calcio a 6 dedicato ai più giovani. Il futuro del calcio inizia qui!",
      sport: "calcio" as const,
      image: "/images/calcio-junior.jpg",
      href: "/eventi/calcio-junior"
    },
    {
      id: "volley",
      title: "Volley",
      description: "Torneo di pallavolo misto. Divertimento e competizione!",
      sport: "volley" as const,
      image: "/images/volley-hero.jpg",
      href: "/eventi/volley"
    },
    {
      id: "fsc",
      title: "Fanta Sanfra Cup",
      description: "Il fantacalcio della Sanfra Cup. Crea la tua squadra e sfida gli altri fantallenatori!",
      sport: "fsc" as const,
      image: "/images/fsc-background.png",
      href: "/eventi/fanta-sanfra-cup"
    }
  ]

  return (
    <div className="min-h-screen bg-black">
      <Navbar 
        currentLang={currentLang} 
        onLanguageChange={setCurrentLang} 
        currentSport={currentSport} 
        onSportChange={setCurrentSport} 
      />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Back button */}
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Torna alla Home</span>
          </Link>

          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-spacema tracking-tight mb-4">
              <span className="text-white">I Nostri</span>{' '}<span className="text-yellow-400">Eventi</span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
              Scopri tutti i tornei della Sanfra Cup e scegli quello che fa per te!
            </p>
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  href={event.href}
                  className="group block relative overflow-hidden rounded-2xl border border-yellow-500/20 bg-gradient-to-br from-neutral-900 to-black transition-all hover:border-yellow-500/50 hover:shadow-lg hover:shadow-yellow-500/10 min-h-[280px]"
                >
                  {/* Full card background image */}
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />
                  
                  {/* Content */}
                  <div className="relative z-10 p-6 flex flex-col justify-end h-full min-h-[280px]">
                    <h3 className="text-2xl md:text-3xl font-spacema text-white mb-2 group-hover:text-yellow-400 transition-colors">
                      {event.title}
                    </h3>
                    <p className="text-gray-300 text-sm md:text-base">
                      {event.description}
                    </p>
                    <div className="mt-4 flex items-center gap-2 text-yellow-400 text-sm font-medium">
                      <span>Scopri di più</span>
                      <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black border-t border-yellow-500/10 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm">© 2026 Sanfra Cup. Tutti i diritti riservati.</p>
        </div>
      </footer>
    </div>
  )
}
