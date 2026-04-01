"use client"

import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { ArrowLeft, Calendar, Gift, Percent, ChevronDown, MapPin, Utensils, Coffee, Dumbbell } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { LiquidMetalIDCard } from "@/components/liquid-metal-id-card"
import SlideTextButton from "@/components/slide-text-button"

export default function CardSanfraCupPage() {
  const [currentLang, setCurrentLang] = useState<"it" | "en">("it")
  const [currentSport, setCurrentSport] = useState<"home" | "calcio" | "volley" | "fsc">("home")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const whatsappNumber = "393914897361" // Andrea Gallo
  const whatsappMessage = encodeURIComponent("Ciao, voglio più informazioni sulla Card Sanfra Cup")
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`

  const sponsorCategories = {
    "ristoranti": {
      title: "Ristoranti e Street Food",
      icon: Utensils,
      sponsors: [
        {
          name: "Da Giacomo – Grafferia Napoletana",
          offer: "30% di sconto sul conto totale",
          details: "Valido sia per consumo sul posto che per asporto.",
          address: "Via Alfredo de Marsico n 5, Salerno",
          logo: "/images/sponsors/da-giacomo.png"
        },
        {
          name: "Mythos – Ristorante Greco",
          offer: "Bibita in omaggio ogni 2 pita acquistate",
          details: "Valido sia sul posto che per asporto.",
          address: "Via Roma, 62 / Via Dalmazia, 39 - Salerno",
          logo: "/images/sponsors/mythos.png"
        },
        {
          name: "Grill House",
          offer: "Bibita in omaggio con l'acquisto di un panino (valido anche per asporto) | Fritto in omaggio con panino + bibita (solo consumo sul posto)",
          details: "",
          address: "Via Giovan Angelo Papio, 39, 84122 Salerno SA",
          logo: "/images/sponsors/grill-house.jpg"
        },
        {
          name: "Quanto Basta",
          offer: "20% di sconto sul conto totale (escluse le bibite)",
          details: "Valido solo per consumo sul posto.",
          address: "Corso Giuseppe Garibaldi, 201, 84122 Salerno",
          logo: "/images/sponsors/quanto-basta.png"
        },
        {
          name: "Sti Polli",
          offer: "10% di sconto su tutti gli acquisti",
          details: "Valido sia sul posto che per asporto.",
          address: "Via Nizza 214, Salerno",
          logo: "/images/sponsors/sti-polli.png"
        }
      ]
    },
    "bar": {
      title: "Bar e Caffetterie",
      icon: Coffee,
      sponsors: [
        {
          name: "Il Baretto 3.0",
          offer: "Caffè + cornetto a 2€ | 20% di sconto con una spesa minima di 5€",
          details: "",
          address: "Via Michele Vernieri 113, Salerno",
          logo: "/images/sponsors/baretto.png"
        },
        {
          name: "Caffè Grieco",
          offer: "Box 150 cialde: 24,99€ → 20,99€ | Con 2 box da 150, ricevi 1 box da 50 in regalo | Con 4 box da 150 (100€), ricevi 1 box da 150 in regalo",
          details: "",
          address: "Via Roberto Wenner, 5, 84131 Salerno SA",
          logo: "/images/sponsors/grieco.jpg"
        },
        {
          name: "Portico",
          offer: "20% di sconto su consumazione minima di 15€ | Menù panino + patatine + bibita a 10€ | 20% di sconto per cene o aperitivi di gruppo (minimo 4 persone)",
          details: "",
          address: "Via Antonio Gramsci 5, Salerno",
          logo: "/images/sponsors/portico.png"
        }
      ]
    },
    "sport": {
      title: "Sport e Tempo libero",
      icon: Dumbbell,
      sponsors: [
        {
          name: "Nuovo Campetto Cappuccini – Assocalcio",
          offer: "20% di sconto sulla quota campo",
          details: "Lo sconto è personale e valido solo per il possessore della card.",
          address: "Via Nicola Acocella 7, Salerno",
          logo: "/images/sponsors/assocalcio.png"
        }
      ]
    }
  }

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

      {/* Dove posso usare la Card Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-spacema text-center mb-12"
          >
            <span className="text-white">Dove posso usare la</span>{' '}<span className="text-yellow-400">Card Sanfra Cup?</span>
          </motion.h2>

          {/* Category Buttons */}
          <div className="flex flex-col md:flex-row gap-4 justify-center max-w-4xl mx-auto mb-8">
            {Object.entries(sponsorCategories).map(([key, category], index) => (
              <motion.button
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => setSelectedCategory(selectedCategory === key ? null : key)}
                className={`flex items-center justify-between gap-3 px-6 py-4 rounded-xl border transition-all duration-300 w-full md:w-auto ${
                  selectedCategory === key
                    ? "bg-yellow-400 border-yellow-400 text-black"
                    : "bg-neutral-900 border-yellow-500/20 text-white hover:border-yellow-500/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <category.icon className="w-5 h-5" />
                  <span className="font-semibold">{category.title}</span>
                </div>
                <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${selectedCategory === key ? "rotate-180" : ""}`} />
              </motion.button>
            ))}
          </div>

          {/* Sponsors Dropdown */}
          {selectedCategory && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="max-w-4xl mx-auto"
            >
              <div className="grid gap-4">
                {sponsorCategories[selectedCategory as keyof typeof sponsorCategories].sponsors.map((sponsor, index) => (
                  <motion.div
                    key={sponsor.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="bg-neutral-900 border border-yellow-500/20 rounded-xl p-6 hover:border-yellow-500/40 transition-colors flex gap-6"
                  >
                    {/* Logo */}
                    {sponsor.logo && (
                      <div className="flex-shrink-0 w-20 h-20 md:w-24 md:h-24 bg-white rounded-xl overflow-hidden flex items-center justify-center">
                        <Image
                          src={sponsor.logo}
                          alt={sponsor.name}
                          width={96}
                          height={96}
                          className="object-contain w-full h-full p-2"
                        />
                      </div>
                    )}
                    {/* Content */}
                    <div className="flex-1">
                      <h4 className="text-xl font-semibold text-yellow-400 mb-3">{sponsor.name}</h4>
                      <p className="text-white mb-2">{sponsor.offer}</p>
                      {sponsor.details && (
                        <p className="text-gray-400 text-sm mb-3">{sponsor.details}</p>
                      )}
                      <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <MapPin className="w-4 h-4" />
                        <span>{sponsor.address}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Come posso utilizzare Section */}
      <section className="py-20 bg-neutral-950">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-spacema text-center mb-16"
          >
            <span className="text-white">Come posso utilizzare la mia</span>{' '}<span className="text-yellow-400">Card Sanfra Cup</span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { step: "1", title: "Acquista la Card Sanfra Cup" },
              { step: "2", title: "Ricevi la tessera digitale" },
              { step: "3", title: "Mostrala all'interno del locale sponsor per ottenere i vantaggi" }
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-black text-2xl font-bold">{item.step}</span>
                </div>
                <h3 className="text-xl font-semibold text-white">{item.title}</h3>
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
