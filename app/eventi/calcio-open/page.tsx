"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { ArrowLeft } from "lucide-react"
import SlideTextButton from "@/components/slide-text-button"
import { type Language, type Sport } from "@/lib/i18n"

export default function CalcioOpenPage() {
  const [currentSport, setCurrentSport] = useState<Sport>("home")
  const [currentLang, setCurrentLang] = useState<Language>("it")

  const whatsappNumber = "393406272496" // Antonio Dattoli
  const whatsappMessage = encodeURIComponent("Ciao, desidero avere più informazioni riguardo Sanfra Cup Calcio Open")
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
          {/* Back button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute top-0 left-4"
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-spacema tracking-tight mb-4"
          >
            <span className="text-white">Calcio</span>{' '}<span className="text-yellow-400">Open</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-2xl md:text-3xl text-yellow-400/80 font-spacema mb-8"
          >
            Torneo di calcio a 5
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-12"
          >
            Sfida i tuoi amici e dimostra il tuo valore sul campo! Il torneo di calcio a 5 per tutte le eta.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <SlideTextButton
              text="Voglio più informazioni"
              hoverText="Antonio Dattoli"
              href={whatsappLink}
              variant="whatsapp"
              external
            />
          </motion.div>
        </div>
      </section>

      {/* Tournament Info Section */}
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
              <span className="text-white">Informazioni</span>{' '}<span className="text-yellow-400">Torneo</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-neutral-900 border border-yellow-500/20 rounded-2xl p-6">
                <p className="text-gray-400 text-sm uppercase tracking-wider mb-2">Categoria</p>
                <p className="text-white text-xl font-semibold">Open</p>
              </div>
              <div className="bg-neutral-900 border border-yellow-500/20 rounded-2xl p-6">
                <p className="text-gray-400 text-sm uppercase tracking-wider mb-2">Data Inizio</p>
                <p className="text-white text-xl font-semibold">8 Maggio 2026</p>
              </div>
              <div className="bg-neutral-900 border border-yellow-500/20 rounded-2xl p-6">
                <p className="text-gray-400 text-sm uppercase tracking-wider mb-2">Giorni del Torneo</p>
                <p className="text-white text-xl font-semibold">Ogni Venerdi e Ogni Domenica</p>
              </div>
              <div className="bg-neutral-900 border border-yellow-500/20 rounded-2xl p-6">
                <p className="text-gray-400 text-sm uppercase tracking-wider mb-2">Data Finale</p>
                <p className="text-white text-xl font-semibold">7 Giugno 2026</p>
              </div>
            </div>

            {/* Location */}
            <div className="bg-neutral-900 border border-yellow-500/20 rounded-2xl p-6 mb-8">
              <p className="text-gray-400 text-sm uppercase tracking-wider mb-4">Sede</p>
              <p className="text-white text-xl font-semibold mb-6">Via Nicola Acocella, 7 - 84131 Salerno SA</p>
              <div className="rounded-xl overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3018.5!2d14.7847!3d40.6754!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x133bc1c1c1c1c1c1%3A0x1234567890abcdef!2sVia%20Nicola%20Acocella%2C%207%2C%2084131%20Salerno%20SA%2C%20Italy!5e0!3m2!1sen!2sit!4v1234567890"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
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
