"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { ArrowLeft } from "lucide-react"
import SponsorCard from "@/components/sponsor-card"
import { type Language, type Sport } from "@/lib/i18n"

const sponsors = [
  {
    id: "grill-house",
    name: "Grill House",
    subtitle: "Partner Ufficiale",
    description: "A due passi dal Corso, GRILL HOUSE rappresenta oggi, per Salerno, il principale punto di riferimento per gli amanti della carne. Nasce con l'obiettivo di fondere un ambiente giovanile e di intrattenimento con una cucina diversificata e di qualità. Un'offerta che spazia dagli antipasti alla carne, dai primi ai dolci, tutti rigorosamente artigianali, oltre ad un vasto assortimento di birre. La location moderna e tecnologica consente di trascorrere ore piacevoli avvolti in un'atmosfera calda e luminosa.",
    address: "Via Giovan Angelo Papio, 39, 84122 Salerno SA",
    image: "/images/sponsors/grill-house.jpg",
    features: ["Carne alla brace", "Cucina artigianale", "Birre artigianali"]
  },
  {
    id: "mythos",
    name: "Mythos",
    subtitle: "Partner Ufficiale",
    description: "Un viaggio nel gusto della cucina greca e mediterranea. Sapori unici e atmosfera accogliente.",
    image: "/images/sponsors/mythos.png",
    features: ["Cucina greca", "Mediterranea", "Atmosfera unica"]
  },
  {
    id: "caffe-grieco",
    name: "Caffe Grieco",
    subtitle: "Partner Ufficiale",
    description: "Dal 1952 l'espresso per vocazione. La tradizione del caffè italiano nel cuore di Salerno.",
    image: "/images/sponsors/grieco.jpg",
    features: ["Espresso italiano", "Dal 1952", "Tradizione"]
  }
]

export default function SponsorPage() {
  const [currentSport, setCurrentSport] = useState<Sport>("home")
  const [currentLang, setCurrentLang] = useState<Language>("it")

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar 
        currentLang={currentLang} 
        onLanguageChange={setCurrentLang} 
        currentSport={currentSport} 
        onSportChange={setCurrentSport} 
      />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center pt-20 overflow-hidden">
        {/* Background Logo */}
        <motion.div 
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 flex items-center justify-center opacity-30">
            <img 
              src="/images/sanfra-transparent.png"
              alt=""
              className="w-full h-full object-contain"
            />
          </div>
        </motion.div>
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          {/* Back Link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute top-0 left-4"
          >
            <Link 
              href="/"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Torna alla Home</span>
            </Link>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-spacema tracking-tight mb-4"
          >
            <span className="text-white">I Nostri</span>{' '}<span className="text-yellow-400">Sponsor</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xl md:text-2xl text-yellow-400 font-spacema mb-6"
          >
            Summer Edition 2026
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            Grazie ai nostri partner che rendono possibile la Sanfra Cup
          </motion.p>
        </div>
      </section>

      {/* Sponsors Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto space-y-16">
            {sponsors.map((sponsor, index) => (
              <motion.div
                key={sponsor.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex flex-col md:flex-row items-center gap-8 md:gap-16"
              >
                {/* Card on the left */}
                <div className="flex-shrink-0">
                  <SponsorCard
                    title={sponsor.name}
                    subtitle={sponsor.subtitle}
                    description={sponsor.description}
                    image={sponsor.image}
                    features={sponsor.features}
                  />
                </div>

                {/* Info on the right */}
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-3xl md:text-4xl font-spacema text-white mb-4">
                    {sponsor.name}
                  </h2>
                  <p className="text-gray-400 text-lg leading-relaxed mb-4">
                    {sponsor.description}
                  </p>
                  {sponsor.address && (
                    <p className="text-yellow-400 text-sm flex items-center gap-2 justify-center md:justify-start">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                        <circle cx="12" cy="10" r="3"/>
                      </svg>
                      {sponsor.address}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-yellow-500/10 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm">© 2026 Sanfra Cup. Tutti i diritti riservati.</p>
        </div>
      </footer>
    </div>
  )
}
