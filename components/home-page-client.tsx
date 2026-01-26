"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Users, Clock, Trophy, Download, ChevronDown } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { type Language, type Sport, getTranslation } from "@/lib/i18n"
import { motion, useScroll, useTransform } from "framer-motion"

// Gradient Reveal Text Component
function GradientRevealText({ text, size = "large" }: { text: string; size?: "large" | "medium" }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.9", "start 0.3"]
  })
  
  const clipPath = useTransform(
    scrollYProgress,
    [0, 1],
    ["inset(0 100% 0 0)", "inset(0 0% 0 0)"]
  )

  const textSizeClass = size === "large" 
    ? "text-3xl md:text-5xl lg:text-6xl" 
    : "text-xl md:text-2xl lg:text-3xl leading-relaxed"

  return (
    <div ref={containerRef} className="relative py-8">
      {/* Base faded text */}
      <span className={`${textSizeClass} font-semibold tracking-tight text-white/10`}>
        {text}
      </span>
      {/* Gradient text revealed on scroll */}
      <motion.span
        className={`absolute inset-0 py-8 ${textSizeClass} font-semibold tracking-tight bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent`}
        style={{ clipPath }}
      >
        {text}
      </motion.span>
    </div>
  )
}

interface HomePageClientProps {
  calcioRegistrationsOpen: boolean
  volleyRegistrationsOpen: boolean
}

export function HomePageClient({ calcioRegistrationsOpen, volleyRegistrationsOpen }: HomePageClientProps) {
  const [lang, setLang] = useState<Language>("it")
  const [sport, setSport] = useState<Sport>("home")
  const [animationKey, setAnimationKey] = useState(0)
  const t = (key: Parameters<typeof getTranslation>[1]) => getTranslation(lang, key)
  
  // Get registration status based on current sport
  const registrationsOpen = sport === "calcio" ? calcioRegistrationsOpen : volleyRegistrationsOpen

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate")
          }
        })
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    )

    document.querySelectorAll(".animate-on-scroll").forEach((el) => {
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  // Re-trigger animation when sport changes
  const handleSportChange = (newSport: Sport) => {
    setSport(newSport)
    setAnimationKey(prev => prev + 1)
  }

  // If on home page, show landing page
  if (sport === "home") {
    return (
      <div className="min-h-screen bg-black">
        {/* Navigation Bar */}
        <Navbar 
          currentLang={lang} 
          onLanguageChange={setLang} 
          currentSport={sport} 
          onSportChange={handleSportChange} 
        />

        {/* Home Landing Section */}
        <section className="min-h-screen flex flex-col items-center justify-center relative px-4 overflow-hidden">
          {/* Background Logo */}
          <div className="absolute inset-0 flex items-center justify-center opacity-20">
            <img 
              src="/images/sanfra-transparent.png"
              alt=""
              className="w-full h-full object-contain"
            />
          </div>

          {/* Content */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center max-w-5xl mx-auto relative z-10"
          >
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight text-yellow-400 drop-shadow-[0_0_30px_rgba(250,204,21,0.3)]"
            >
              SANFRACUP
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
              className="text-xl md:text-2xl text-gray-400 mt-6"
            >
              {lang === "it" ? "Scegli il tuo torneo" : "Choose your tournament"}
            </motion.p>
            
            {/* Sport Selection Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
              className="mt-12 flex flex-col sm:flex-row gap-6 justify-center"
            >
              <button
                onClick={() => handleSportChange("calcio")}
                className="group relative px-12 py-8 bg-transparent border-2 border-yellow-500 rounded-2xl hover:bg-yellow-500 transition-all duration-300"
              >
                <span className="text-3xl md:text-4xl font-bold text-yellow-400 group-hover:text-black transition-colors">
                  CALCIO
                </span>
                <span className="block text-sm text-gray-400 group-hover:text-black/70 mt-2 transition-colors">
                  Football Tournament 2026
                </span>
              </button>
              
              <button
                onClick={() => handleSportChange("volley")}
                className="group relative px-12 py-8 bg-transparent border-2 border-yellow-500 rounded-2xl hover:bg-yellow-500 transition-all duration-300"
              >
                <span className="text-3xl md:text-4xl font-bold text-yellow-400 group-hover:text-black transition-colors">
                  VOLLEY
                </span>
                <span className="block text-sm text-gray-400 group-hover:text-black/70 mt-2 transition-colors">
                  Volley Tournament 2026
                </span>
              </button>
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute bottom-10"
          >
            <a href="#chi-siamo" className="animate-bounce block">
              <ChevronDown className="h-8 w-8 text-gray-600" />
            </a>
          </motion.div>
        </section>

        {/* Non solo un torneo Section */}
        <section className="min-h-[60vh] flex items-center justify-center bg-black">
          <div className="container mx-auto px-4 text-center">
            <GradientRevealText text="Non solo un torneo." />
          </div>
        </section>

        {/* Story Section - Chi Siamo */}
        <section id="chi-siamo" className="min-h-[80vh] flex items-center justify-center bg-black py-20">
          <div className="container mx-auto px-4 text-center max-w-5xl">
            <GradientRevealText 
              text="Abbiamo creato questo torneo tre anni fa con l'obiettivo di riavvicinare le persone dopo il Covid. Fin dalla prima edizione ci siamo divertiti noi in primis, ma soprattutto abbiamo visto quanto il torneo facesse bene alla comunità. Edizione dopo edizione, il nostro cerchio si è allargato sempre di più. La SanFra Cup nasce nell'oratorio di San Francesco, dove siamo cresciuti con valori ben precisi: rispetto, fratellanza, empatia." 
              size="medium"
            />
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 bg-black border-t border-yellow-500/10">
          <div className="container mx-auto px-4 text-center">
            <p className="text-gray-500 text-sm">{t("footerText")}</p>
            <p className="text-gray-600 text-xs mt-2">Tutti i diritti riservati</p>
          </div>
        </footer>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Navigation Bar */}
      <Navbar 
        currentLang={lang} 
        onLanguageChange={setLang} 
        currentSport={sport} 
        onSportChange={handleSportChange} 
      />

      {/* Hero Section - Full screen with logo/image background */}
      <section className="min-h-screen flex flex-col items-center justify-center relative px-4 overflow-hidden">
        {/* Background - Logo for calcio, Image for volley */}
        <motion.div 
          key={`bg-${animationKey}`}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute inset-0"
        >
          {sport === "calcio" ? (
            <div className="absolute inset-0 flex items-center justify-center opacity-30">
              <img 
                src="/images/sanfra-transparent.png"
                alt=""
                className="w-full h-full object-contain"
              />
            </div>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <img 
                src="/images/volley-hero.jpg"
                alt=""
                className="max-w-full max-h-full object-contain opacity-50"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/50" />
            </div>
          )}
        </motion.div>
        
        {/* Content */}
        <motion.div 
          key={`content-${animationKey}`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="text-center max-w-5xl mx-auto relative z-10"
        >
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
            className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight text-yellow-400 drop-shadow-[0_0_30px_rgba(250,204,21,0.3)]"
          >
            SANFRACUP
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
            className="text-xl md:text-2xl text-gray-400 mt-6"
          >
            {sport === "calcio" ? t("footballTournament") : "Volley Tournament 2026"}
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.7 }}
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
          >
            {registrationsOpen ? (
              <Link href={`/registrazione?sport=${sport}`}>
                <Button className="btn-apple btn-apple-primary">
                  {t("startRegistration")}
                </Button>
              </Link>
            ) : (
              <Button disabled className="btn-apple bg-zinc-800 text-gray-500 cursor-not-allowed">
                {t("registrationsClosed")}
              </Button>
            )}
            <a href="#info" className="btn-apple btn-apple-secondary">
              {t("tournamentInfo")}
            </a>
          </motion.div>
        </motion.div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-10 animate-bounce">
          <ChevronDown className="h-8 w-8 text-gray-600" />
        </div>
      </section>

      {/* Non solo un torneo Section */}
      <section className="min-h-[60vh] flex items-center justify-center bg-black">
        <div className="container mx-auto px-4 text-center">
          <GradientRevealText text="Non solo un torneo." />
        </div>
      </section>

      {/* Story Section - Chi Siamo */}
      <section id="chi-siamo" className="min-h-[80vh] flex items-center justify-center bg-black py-20">
        <div className="container mx-auto px-4 text-center max-w-5xl">
          <GradientRevealText 
            text="Abbiamo creato questo torneo tre anni fa con l'obiettivo di riavvicinare le persone dopo il Covid. Fin dalla prima edizione ci siamo divertiti noi in primis, ma soprattutto abbiamo visto quanto il torneo facesse bene alla comunità. Edizione dopo edizione, il nostro cerchio si è allargato sempre di più. La SanFra Cup nasce nell'oratorio di San Francesco, dove siamo cresciuti con valori ben precisi: rispetto, fratellanza, empatia." 
            size="medium"
          />
        </div>
      </section>

      {/* Image Section */}
      <section className="section-apple section-dark">
        <div className="container mx-auto px-4">
          <div className="animate-on-scroll">
            <div className="relative w-full max-w-5xl mx-auto rounded-3xl overflow-hidden border border-yellow-500/20">
              <Image
                src="/images/sanfra-team.jpg"
                alt="SanfraCup Team"
                width={1200}
                height={800}
                className="w-full h-auto"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Sponsors Section */}
      <section className="py-16 bg-black border-y border-yellow-500/10">
        <div className="overflow-hidden">
          <div className="animate-scroll flex gap-16 whitespace-nowrap">
            {["QUANTO BASTA", "CAPRICCIO DI PEPE", "MD22TEAM", "ARECHI", "DOLCE E CAFFE"].map((sponsor, i) => (
              <span key={`${sponsor}-${i}`} className="text-2xl font-medium text-yellow-500/30 tracking-widest">
                {sponsor}
              </span>
            ))}
            {["QUANTO BASTA", "CAPRICCIO DI PEPE", "MD22TEAM", "ARECHI", "DOLCE E CAFFE"].map((sponsor, i) => (
              <span key={`${sponsor}-dup-${i}`} className="text-2xl font-medium text-yellow-500/30 tracking-widest">
                {sponsor}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section id="info" className="section-apple section-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20 animate-on-scroll">
            <h2 className="heading-apple text-white">{t("tournamentInfo")}</h2>
            <p className="subheading-apple mt-6">
              Tutto quello che devi sapere sul torneo
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              { icon: Calendar, title: t("tournamentDates"), desc: t("whenDesc") },
              { icon: Clock, title: t("matchTimes"), desc: t("matchTimesDesc") },
              { icon: MapPin, title: t("location"), desc: t("whereDesc") },
              { icon: Users, title: t("contact"), desc: t("contactDesc") },
              { icon: Trophy, title: t("prizes"), desc: t("prizesDesc") },
            ].map((item, index) => (
              <div 
                key={item.title} 
                className="animate-on-scroll p-8 rounded-2xl bg-black/50 border border-yellow-500/10 hover:border-yellow-500/30 transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <item.icon className="h-10 w-10 text-yellow-400 mb-4" strokeWidth={1.5} />
                <h3 className="text-xl font-semibold mb-2 text-white">{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rules Section */}
      <section className="section-apple section-dark">
        <div className="container mx-auto px-4">
          <div className="text-center animate-on-scroll">
            <h2 className="heading-apple text-yellow-400 mb-8">{t("tournamentBasicRules")}</h2>
            <a
              href="/documents/regolamento-sanfracup.pdf"
              download
              className="btn-apple btn-apple-primary inline-flex items-center gap-3"
            >
              <Download className="h-5 w-5" />
              {t("downloadRegulations")}
            </a>
            <p className="text-gray-500 text-sm mt-4">{t("downloadRegulationsDesc")}</p>
          </div>
        </div>
      </section>

      {/* Registration CTA Section */}
      <section className="section-apple section-darker">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto animate-on-scroll">
            <h2 className="heading-apple text-white">{t("teamRegistration")}</h2>
            <p className="subheading-apple mt-6 mb-10">{t("teamRegistrationDesc")}</p>
            
            {registrationsOpen ? (
              <Link href={`/registrazione?sport=${sport}`}>
                <Button className="btn-apple btn-apple-primary text-xl px-12 py-6">
                  {t("startRegistration")}
                </Button>
              </Link>
            ) : (
              <div className="space-y-4">
                <Button
                  disabled
                  className="btn-apple bg-zinc-800 text-gray-500 cursor-not-allowed text-xl px-12 py-6"
                >
                  {t("registrationsClosed")}
                </Button>
                <p className="text-yellow-500 font-medium">{t("registrationsClosedDesc")}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="section-apple section-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-semibold text-white">{t("location")}</h2>
            <p className="text-gray-400 mt-2">Via Nicola Acocella 7, Salerno</p>
          </div>
          
          <div className="animate-on-scroll max-w-4xl mx-auto">
            <div className="rounded-2xl overflow-hidden border border-yellow-500/20">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3018.5!2d14.7847!3d40.6754!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x133bc1c1c1c1c1c1%3A0x1234567890abcdef!2sVia%20Nicola%20Acocella%2C%207%2C%2084131%20Salerno%20SA%2C%20Italy!5e0!3m2!1sen!2sit!4v1234567890"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="SanfraCup Location"
                className="grayscale"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-black border-t border-yellow-500/10">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm">{t("footerText")}</p>
          <p className="text-gray-600 text-xs mt-2">Tutti i diritti riservati</p>
        </div>
      </footer>
    </div>
  )
}
