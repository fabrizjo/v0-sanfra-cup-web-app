"use client"

import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { ArrowLeft, Calendar, Gift, Percent } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { LiquidMetalIDCard } from "@/components/liquid-metal-id-card"
import SlideTextButton from "@/components/slide-text-button"

export default function CardSanfraCupPage() {
  const [currentLang, setCurrentLang] = useState<"it" | "en">("it")
  const [currentSport, setCurrentSport] = useState<"home" | "calcio" | "volley" | "fsc">("home")

  const whatsappNumber = "393331234567" // Andrea Gallo - da aggiornare con numero reale
  const whatsappMessage = encodeURIComponent("Ciao, voglio più informazioni sulla Card Sanfra Cup")
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`

  const vantaggi = [
    {
      icon: Percent,
      title: "Sconti Esclusivi",
      description: "Accedi a sconti speciali nei locali e nelle attività sponsor della Sanfra Cup."
    },
    {
      icon: Gift,
      title: "Promozioni Riservate",
      description: "Ricevi promozioni esclusive riservate solo ai possessori della Card."
    },
    {
      icon: Calendar,
      title: "Accesso Prioritario",
      description: "Partecipa agli eventi Sanfra Cup con accesso prioritario e vantaggi dedicati."
    }
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
        currentSport={currentSport}
        onSportChange={setCurrentSport}
      />

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center pt-20 overflow-hidden">
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
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute top-4 left-4"
          >
            <Link
              href="/"
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Torna alla home</span>
            </Link>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl lg:text-7xl font-spacema tracking-tight mb-6"
          >
            <span className="text-white">Card</span>{' '}<span className="text-yellow-400">Sanfra Cup</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-4"
          >
            La tessera ufficiale della community Sanfra Cup
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg text-yellow-400 max-w-2xl mx-auto"
          >
            Mostra la tua Card Sanfra Cup per ottenere vantaggi esclusivi
          </motion.p>
        </div>
      </section>

      {/* Card Section */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <LiquidMetalIDCard />
          </motion.div>

          {/* Validity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-8"
          >
            <p className="text-gray-400 text-sm uppercase tracking-wider mb-2">Validità</p>
            <p className="text-white text-xl font-semibold">30 Marzo 2026 - 31 Agosto 2026</p>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <SlideTextButton
              text="Acquista la Card"
              hoverText="Andrea Gallo"
              href={whatsappLink}
              variant="whatsapp"
              external
            />
          </motion.div>
        </div>
      </section>

      {/* Vantaggi Section */}
      <section className="py-20 bg-neutral-950">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-spacema text-center mb-6"
          >
            <span className="text-white">Vantaggi della</span>{' '}<span className="text-yellow-400">Card</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-gray-400 text-lg text-center max-w-3xl mx-auto mb-12"
          >
            I possessori della Card Sanfra Cup possono accedere a sconti e promozioni esclusive nei locali e nelle attività sponsor.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {vantaggi.map((vantaggio, index) => (
              <motion.div
                key={vantaggio.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-neutral-900 border border-yellow-500/20 rounded-2xl p-8 text-center hover:border-yellow-500/40 transition-colors"
              >
                <div className="w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <vantaggio.icon className="w-8 h-8 text-yellow-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">{vantaggio.title}</h3>
                <p className="text-gray-400">{vantaggio.description}</p>
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
