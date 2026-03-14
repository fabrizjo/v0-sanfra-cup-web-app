"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { ArrowLeft, MessageCircle } from "lucide-react"
import { type Language, type Sport } from "@/lib/i18n"
import { FscClassifica } from "@/components/fsc-classifica"

export default function FantaSanfraCupPage() {
  const [currentSport, setCurrentSport] = useState<Sport>("home")
  const [currentLang, setCurrentLang] = useState<Language>("it")

  const whatsappNumber = "393406272496" // Antonio Dattoli
  const whatsappMessage = encodeURIComponent("Ciao, desidero avere più informazioni riguardo Fanta Sanfra Cup.")
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`

  return (
    <div className="min-h-screen bg-black">
      <Navbar 
        currentLang={currentLang} 
        onLanguageChange={setCurrentLang} 
        currentSport={currentSport} 
        onSportChange={setCurrentSport} 
      />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* Background Logo FSC */}
        <motion.div 
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <Image 
              src="/images/fsc-background.png"
              alt=""
              fill
              className="object-contain opacity-40"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black" />
        </motion.div>
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          {/* Back button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute top-4 left-4"
          >
            <Link 
              href="/eventi"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Torna agli Eventi</span>
            </Link>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-7xl font-spacema tracking-tight mb-4"
          >
            <span className="text-white">Fanta</span>{' '}<span className="text-yellow-400">Sanfra Cup</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xl md:text-2xl text-gray-300 mb-12"
          >
            Il fantacalcio della Sanfra Cup
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white font-medium px-8 py-4 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-green-500/30 hover:scale-105"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Voglio piu informazioni</span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Classifica Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-spacema text-center mb-12">
              <span className="text-white">Classifica</span>{' '}<span className="text-yellow-400">FSC</span>
            </h2>
            
            <div className="bg-neutral-900 border border-yellow-500/20 rounded-2xl p-6">
              <FscClassifica />
            </div>
          </motion.div>
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
