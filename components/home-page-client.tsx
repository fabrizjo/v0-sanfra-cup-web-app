"use client"

import { useState, useEffect, useRef } from "react"

import Image from "next/image"
import Link from "next/link"

import { Download, ChevronDown } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { type Language, type Sport, getTranslation } from "@/lib/i18n"
import { motion, useScroll, useTransform } from "framer-motion"
import { PixelImage } from "@/components/pixel-image"
import { FlipWords } from "@/components/ui/flip-words"
import { DirectionAwareHover } from "@/components/ui/direction-aware-hover"
import { WhatsAppContact } from "@/components/whatsapp-contact"
import { LiquidMetalIDCard } from "@/components/liquid-metal-id-card"
import { FscClassifica } from "@/components/fsc-classifica"
import { EyesFollow } from "@/components/eyes-follow"
import { AnimatedPillButton } from "@/components/animated-pill-button"


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
    ? "text-3xl md:text-5xl lg:text-6xl font-spacema" 
    : "text-xl md:text-2xl lg:text-3xl leading-relaxed font-spacema"

  return (
    <div ref={containerRef} className="relative py-8">
      {/* Base faded text */}
      <span className={`${textSizeClass} tracking-tight text-white/10`}>
        {text}
      </span>
      {/* Gradient text revealed on scroll */}
      <motion.span
        className={`absolute inset-0 py-8 ${textSizeClass} tracking-tight bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent`}
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

  // Scroll progress for diagonal fade effect on hero title
  const scrollRef = useRef(0)
  const heroTitleRef = useRef<HTMLHeadingElement>(null)
  useEffect(() => {
    let ticking = false
    const updateTitle = () => {
      if (!heroTitleRef.current) return
      const y = scrollRef.current
      if (y <= 50) {
        heroTitleRef.current.style.maskImage = 'none'
        heroTitleRef.current.style.webkitMaskImage = 'none'
        heroTitleRef.current.style.opacity = '1'
        heroTitleRef.current.style.transform = 'translateY(0px)'
      } else {
        const fadeProgress = (y - 50) / 2.5
        const maskEnd = Math.min(fadeProgress, 100)
        const maskStart = Math.max(maskEnd - 30, 0)
        heroTitleRef.current.style.maskImage = `linear-gradient(135deg, transparent ${maskStart}%, black ${maskEnd}%)`
        heroTitleRef.current.style.webkitMaskImage = `linear-gradient(135deg, transparent ${maskStart}%, black ${maskEnd}%)`
        heroTitleRef.current.style.opacity = `${Math.max(1 - y / 600, 0)}`
        heroTitleRef.current.style.transform = `translateY(${y * 0.3}px)`
      }
    }
    const handleScroll = () => {
      scrollRef.current = window.scrollY
      if (!ticking) {
        requestAnimationFrame(() => {
          updateTitle()
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Re-trigger animation when sport changes
  const handleSportChange = (newSport: Sport) => {
    setSport(newSport)
    setAnimationKey(prev => prev + 1)
  }

  // Intersection Observer for scroll animations - re-run when sport changes
  useEffect(() => {
    // Small delay to let the DOM render the new sport page
    const timeout = setTimeout(() => {
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
    }, 100)

    return () => clearTimeout(timeout)
  }, [sport])

  // Home page with sport selection
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

        {/* Hero Section - Same as calcio but with sport selection buttons */}
        <section className="min-h-screen flex flex-col items-center justify-center relative px-4 overflow-hidden">
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
          
          {/* Content */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="text-center max-w-5xl mx-auto relative z-10"
          >
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
              className="text-6xl md:text-8xl lg:text-9xl font-spacema tracking-tight drop-shadow-[0_0_30px_rgba(250,204,21,0.3)]"
            >
              <span className="text-white">SANFRA</span>{' '}<span className="text-yellow-400">CUP</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
              className="text-xl md:text-2xl text-gray-400 mt-6"
            >
              {lang === "it" ? "I tuoi eventi sportivi a Salerno" : "Your sports events in Salerno"}
            </motion.p>
          </motion.div>
          
          {/* Scroll indicator */}
          <div className="absolute bottom-10 animate-bounce">
            <ChevronDown className="h-8 w-8 text-gray-600" />
          </div>
        </section>

        {/* Eyes Follow Section - Hidden on mobile */}
        <div className="hidden md:block">
          <EyesFollow />
        </div>
        
        {/* Summer Edition text - Mobile only */}
        <div className="block md:hidden py-16 bg-black">
          <div className="container mx-auto px-4 text-center">
            <p className="text-2xl font-spacema text-yellow-400">
              Summer Edition in arrivo
            </p>
          </div>
        </div>

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
              text="La Sanfra Cup nasce nel 2022 nell'oratorio di San Francesco, dove siamo cresciuti con valori molto forti: rispetto, fratellanza, empatia. Questo torneo nasce da un'esigenza specifica: riavvicinare i giovani ragazzi dopo il periodo del Covid. Fin dalla prima edizione ci siamo sempre divertiti prima noi e poi abbiamo visto quanto il torneo fosse potente e facesse bene alla comunità. Edizione dopo edizione, il nostro cerchio si è allargato sempre più, e continuerà a farlo sempre!" 
              size="medium"
            />
          </div>
        </section>

        {/* Events CTA Section */}
        <section className="py-24 bg-black flex flex-col items-center justify-center">
          <div className="container mx-auto px-4 text-center">
            <AnimatedPillButton 
              text="I nostri eventi" 
              href="/eventi"
              className="bg-yellow-400 text-black hover:shadow-yellow-400/30"
            />
            <p className="mt-6 text-gray-400 text-lg md:text-xl">
              Scopri tutti i nostri eventi e le date in cui si terranno!
            </p>
          </div>
        </section>

        {/* Image Section - Pixel Reveal */}
        <section className="section-apple section-dark">
          <div className="container mx-auto px-4">
            <div className="animate-on-scroll">
              <div className="relative w-full max-w-5xl mx-auto rounded-3xl overflow-hidden border border-yellow-500/20">
                <PixelImage
                  src="/images/sanfra-team.jpg"
                  alt="Sanfra Cup Team"
                  grid="8x8"
                  grayscaleAnimation={true}
                  pixelFadeInDuration={1000}
                  maxAnimationDelay={1200}
                  colorRevealDelay={1500}
                />
              </div>
              
              {/* Instagram Profiles */}
              <div className="flex justify-center gap-8 md:gap-16 mt-8">
                <a 
                  href="https://www.instagram.com/andre.gi_/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-white hover:text-yellow-400 transition-colors group"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium group-hover:underline">Andrea Gallo</span>
                </a>
                <a 
                  href="https://www.instagram.com/a.dattoli.31/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-white hover:text-yellow-400 transition-colors group"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium group-hover:underline">Antonio Dattoli</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section - FlipWords */}
        <section className="min-h-[40vh] flex items-center justify-center bg-black">
          <div className="container mx-auto px-4 text-center">
            <div className="text-3xl md:text-5xl lg:text-6xl font-spacema tracking-tight text-yellow-400">
              <FlipWords 
                words={["rispetto.", "fratellanza.", "empatia."]} 
                duration={2500}
                className="text-yellow-400"
              />
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-16 bg-black border-t border-yellow-500/10">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
              {/* Links */}
              <div>
                <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Navigazione</h4>
                <ul className="space-y-2">
                  <li><button type="button" onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }); }} className="text-gray-500 hover:text-yellow-400 text-sm transition-colors">Home</button></li>
                  <li><button type="button" onClick={() => { const el = document.getElementById("chi-siamo"); el?.scrollIntoView({ behavior: "smooth" }) }} className="text-gray-500 hover:text-yellow-400 text-sm transition-colors">Chi Siamo</button></li>
<li><Link href="/eventi" className="text-gray-500 hover:text-yellow-400 text-sm transition-colors">I Nostri Eventi</Link></li>
                  <li><button type="button" onClick={() => { const el = document.getElementById("sponsor"); el?.scrollIntoView({ behavior: "smooth" }) }} className="text-gray-500 hover:text-yellow-400 text-sm transition-colors">I Nostri Sponsor</button></li>
                  <li><a href="/card-sanfra-cup" className="text-gray-500 hover:text-yellow-400 text-sm transition-colors">Card Sanfra Cup</a></li>
                </ul>
              </div>
              {/* Social */}
              <div>
                <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Social</h4>
                <div className="flex gap-4">
                  <a href="https://www.instagram.com/sanfracup/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-yellow-400 transition-colors">
                    <img src="https://img.icons8.com/?size=100&id=32309&format=png&color=000000" alt="Instagram" className="h-6 w-6 invert opacity-50 hover:opacity-100 transition-opacity" />
                  </a>
                  <a href="https://www.tiktok.com/@sanfracup?is_from_webapp=1&sender_device=pc" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-yellow-400 transition-colors">
                    <img src="https://img.icons8.com/?size=100&id=118638&format=png&color=000000" alt="TikTok" className="h-6 w-6 invert opacity-50 hover:opacity-100 transition-opacity" />
                  </a>
                  <a href="https://www.facebook.com/share/1DbZXYynja/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-yellow-400 transition-colors">
                    <img src="https://img.icons8.com/?size=100&id=118497&format=png&color=000000" alt="Facebook" className="h-6 w-6 invert opacity-50 hover:opacity-100 transition-opacity" />
                  </a>
                  <a href="https://chat.whatsapp.com/EZvIxYFol6aF4xrs6MDAuC" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-yellow-400 transition-colors">
                    <img src="https://img.icons8.com/?size=100&id=16713&format=png&color=000000" alt="WhatsApp" className="h-6 w-6 invert opacity-50 hover:opacity-100 transition-opacity" />
                  </a>
                </div>
              </div>
              {/* Contatti */}
              <div>
                <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Contattaci</h4>
                <ul className="space-y-2">
                  <li><a href="mailto:sanfracup@gmail.com" className="text-gray-500 hover:text-yellow-400 text-sm transition-colors">sanfracup@gmail.com</a></li>
                  <li><a href="tel:+393914897361" className="text-gray-500 hover:text-yellow-400 text-sm transition-colors">Andrea Gallo: 391 489 7361</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-yellow-500/10 pt-6 text-center">
              <p className="text-gray-500 text-sm">{t("footerText")}</p>
              <p className="text-gray-600 text-xs mt-2">Tutti i diritti riservati</p>
            </div>
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
            <div className="absolute inset-0">
              <img 
                src="/images/calcio-hero.jpg"
                alt=""
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/40" />
            </div>
          ) : sport === "volley" ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <img 
                src="/images/volley-hero.jpg"
                alt=""
                className="max-w-full max-h-full object-contain opacity-50"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/50" />
            </div>
          ) : sport === "fsc" ? (
            <div className="absolute inset-0 flex items-center justify-center opacity-30">
              <img 
                src="/images/fsc-background.png"
                alt=""
                className="w-full h-full object-contain"
              />
            </div>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center opacity-30">
              <img 
                src="/images/sanfra-transparent.png"
                alt=""
                className="w-full h-full object-contain"
              />
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
            ref={heroTitleRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
            className="text-6xl md:text-8xl lg:text-9xl font-spacema tracking-tight drop-shadow-[0_0_30px_rgba(250,204,21,0.3)] will-change-transform"
          >
            <span className="text-white">SANFRA</span>{' '}<span className="text-yellow-400">CUP</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
            className="text-xl md:text-2xl text-gray-400 mt-6"
          >
            {sport === "calcio" ? t("footballTournament") : sport === "volley" ? "Volley Tournament 2026" : "Fantacalcio 2026"}
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.7 }}
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <WhatsAppContact sport={sport === "volley" ? "volley" : "calcio"} />
          </motion.div>
        </motion.div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-10 animate-bounce">
          <ChevronDown className="h-8 w-8 text-gray-600" />
        </div>
      </section>

      {/* Calcio Categories Cards */}
      {sport === "calcio" && (
        <section className="py-20 bg-black">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
              <DirectionAwareHover 
                imageUrl="/images/calcio-open.jpg"
                className="h-72 w-full md:w-[480px] md:h-[320px] rounded-2xl border border-yellow-500/20"
              >
                <p className="font-spacema text-3xl md:text-4xl text-yellow-400">CALCIO OPEN</p>
                <p className="text-sm text-gray-300 mt-1">Torneo principale</p>
              </DirectionAwareHover>
              <DirectionAwareHover 
                imageUrl="/images/calcio-junior.jpg"
                className="h-72 w-full md:w-[480px] md:h-[320px] rounded-2xl border border-yellow-500/20"
              >
                <p className="font-spacema text-3xl md:text-4xl text-yellow-400">CALCIO JUNIOR</p>
                <p className="text-sm text-gray-300 mt-1">Under 16</p>
              </DirectionAwareHover>
            </div>
          </div>
        </section>
      )}

      {/* FSC Classifica Section */}
      {sport === "fsc" && (
        <section className="py-20 bg-black">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-12 animate-on-scroll">
              <h2 className="text-3xl md:text-5xl font-spacema tracking-tight">
                <span className="text-white">CLASSIFICA</span>{' '}<span className="text-yellow-400">LIVE</span>
              </h2>
              <p className="text-gray-400 mt-4">Aggiornata in tempo reale</p>
            </div>
            <div className="animate-on-scroll rounded-2xl border border-yellow-500/20 bg-black/50 backdrop-blur-sm p-4 md:p-6">
              <FscClassifica />
            </div>
          </div>
        </section>
      )}

      {/* Non solo un torneo Section */}
      <section className="min-h-[60vh] flex items-center justify-center bg-black">
        <div className="container mx-auto px-4 text-center">
          <GradientRevealText text="Non solo un torneo." />
        </div>
      </section>

      {/* Rules Section */}
      {sport !== "fsc" && (
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
      )}

      {/* Contact CTA Section */}
      {sport !== "fsc" && (
        <section className="section-apple section-darker">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto animate-on-scroll">
              <h2 className="heading-apple text-white">{t("teamRegistration")}</h2>
              <p className="subheading-apple mt-6 mb-10">{t("teamRegistrationDesc")}</p>
              <WhatsAppContact className="text-xl" />
            </div>
          </div>
        </section>
      )}

      {/* Location Section */}
      {sport !== "fsc" && (
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
                  title="Sanfra Cup Location"
                  className="grayscale"
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="py-16 bg-black border-t border-yellow-500/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
            {/* Links */}
            <div>
              <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Navigazione</h4>
              <ul className="space-y-2">
                <li><button type="button" onClick={() => handleSportChange("home")} className="text-gray-500 hover:text-yellow-400 text-sm transition-colors">Home</button></li>
                <li><button type="button" onClick={() => { const el = document.getElementById("chi-siamo"); el?.scrollIntoView({ behavior: "smooth" }) }} className="text-gray-500 hover:text-yellow-400 text-sm transition-colors">Chi Siamo</button></li>
                <li><Link href="/eventi" className="text-gray-500 hover:text-yellow-400 text-sm transition-colors">I Nostri Eventi</Link></li>
                <li><button type="button" onClick={() => { const el = document.getElementById("sponsor"); el?.scrollIntoView({ behavior: "smooth" }) }} className="text-gray-500 hover:text-yellow-400 text-sm transition-colors">I Nostri Sponsor</button></li>
                <li><Link href="/card-sanfra-cup" className="text-gray-500 hover:text-yellow-400 text-sm transition-colors">Card Sanfra Cup</Link></li>
              </ul>
            </div>
            {/* Social */}
            <div>
              <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Social</h4>
              <div className="flex gap-4">
                <a href="https://www.instagram.com/sanfracup/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-yellow-400 transition-colors">
                  <img src="https://img.icons8.com/?size=100&id=32309&format=png&color=000000" alt="Instagram" className="h-6 w-6 invert opacity-50 hover:opacity-100 transition-opacity" />
                </a>
                <a href="https://www.tiktok.com/@sanfracup?is_from_webapp=1&sender_device=pc" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-yellow-400 transition-colors">
                  <img src="https://img.icons8.com/?size=100&id=118638&format=png&color=000000" alt="TikTok" className="h-6 w-6 invert opacity-50 hover:opacity-100 transition-opacity" />
                </a>
                <a href="https://www.facebook.com/share/1DbZXYynja/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-yellow-400 transition-colors">
                  <img src="https://img.icons8.com/?size=100&id=118497&format=png&color=000000" alt="Facebook" className="h-6 w-6 invert opacity-50 hover:opacity-100 transition-opacity" />
                </a>
                <a href="https://chat.whatsapp.com/EZvIxYFol6aF4xrs6MDAuC" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-yellow-400 transition-colors">
                  <img src="https://img.icons8.com/?size=100&id=16713&format=png&color=000000" alt="WhatsApp" className="h-6 w-6 invert opacity-50 hover:opacity-100 transition-opacity" />
                </a>
              </div>
            </div>
            {/* Contatti */}
            <div>
              <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Contattaci</h4>
              <ul className="space-y-2">
                <li><a href="mailto:sanfracup@gmail.com" className="text-gray-500 hover:text-yellow-400 text-sm transition-colors">sanfracup@gmail.com</a></li>
                <li><a href="tel:+393914897361" className="text-gray-500 hover:text-yellow-400 text-sm transition-colors">Andrea Gallo: 391 489 7361</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-yellow-500/10 pt-6 text-center">
            <p className="text-gray-500 text-sm">{t("footerText")}</p>
            <p className="text-gray-600 text-xs mt-2">Tutti i diritti riservati</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
