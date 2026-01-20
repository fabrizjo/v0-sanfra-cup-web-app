"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, MapPin, Shield, Users, Clock, Trophy, Download, Instagram } from "lucide-react"
import { LanguageSwitcher } from "@/components/language-switcher"
import { type Language, getTranslation } from "@/lib/i18n"

export function HomePageClient({ registrationsOpen }: { registrationsOpen: boolean }) {
  const [lang, setLang] = useState<Language>("it")
  const t = (key: Parameters<typeof getTranslation>[1]) => getTranslation(lang, key)

  console.log("[v0] HomePageClient: Registrations open:", registrationsOpen)

  return (
    <div className="min-h-screen bg-black relative">
      {/* Background Logo */}
      <div className="fixed inset-0 z-0 opacity-10">
        <Image src="/images/sanfra-logo.png" alt="SanfraCup Logo" fill className="object-contain" priority />
      </div>

      <div className="relative z-10">
        <header className="border-b border-yellow-500/30 bg-black/90 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-6">
            <div className="text-center">
              <h1
                className="text-6xl md:text-8xl font-black text-yellow-400 tracking-wider mb-2 drop-shadow-[0_0_30px_rgba(234,179,8,0.5)]"
                style={{ fontFamily: "'Teko', sans-serif", letterSpacing: "0.1em" }}
              >
                SANFRACUP
              </h1>
              <div className="flex items-center justify-center gap-4">
                <LanguageSwitcher currentLang={lang} onLanguageChange={setLang} />
                <Link href="/admin/login">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-yellow-500 text-yellow-400 hover:bg-yellow-500 hover:text-black bg-transparent"
                  >
                    {t("adminArea")}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </header>

        <section className="container mx-auto px-4 py-12">
          <div className="text-center max-w-5xl mx-auto">
            <p className="text-xl md:text-2xl text-white mb-8 font-rajdhani uppercase tracking-wide">
              {t("footballTournament")}
            </p>
            <div className="relative w-full max-w-3xl mx-auto mb-8 rounded-xl overflow-hidden border-4 border-yellow-500">
              <Image
                src="/images/sanfra-team.jpg"
                alt="SanfraCup Team"
                width={1200}
                height={800}
                className="w-full h-auto"
                priority
              />
            </div>

            <div className="mt-8 mb-12">
              <h3 className="text-lg md:text-xl font-bold text-yellow-400 mb-4 tracking-wide">{t("followSocial")}</h3>
              <div className="flex items-center justify-center gap-6">
                <a
                  href="https://www.instagram.com/sanfracup/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-yellow-500/20 hover:bg-yellow-500 text-yellow-400 hover:text-black border-2 border-yellow-500 px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
                >
                  <Instagram className="h-6 w-6" />
                  <span className="font-bold">Instagram</span>
                </a>
                <a
                  href="https://www.tiktok.com/@sanfracup?is_from_webapp=1&sender_device=pc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-yellow-500/20 hover:bg-yellow-500 text-yellow-400 hover:text-black border-2 border-yellow-500 px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
                >
                  <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                  </svg>
                  <span className="font-bold">TikTok</span>
                </a>
              </div>
            </div>

            <div className="mt-8 overflow-hidden">
              <div className="animate-scroll flex gap-12 whitespace-nowrap">
                <span className="text-2xl font-bold text-gray-500/40 blur-[1px]">QUANTO BASTA</span>
                <span className="text-2xl font-bold text-gray-500/40 blur-[1px]">CAPRICCIO DI PEPE</span>
                <span className="text-2xl font-bold text-gray-500/40 blur-[1px]">MD22TEAM</span>
                <span className="text-2xl font-bold text-gray-500/40 blur-[1px]">ARECHI</span>
                <span className="text-2xl font-bold text-gray-500/40 blur-[1px]">DOLCE E CAFFÈ</span>
                <span className="text-2xl font-bold text-gray-500/40 blur-[1px]">QUANTO BASTA</span>
                <span className="text-2xl font-bold text-gray-500/40 blur-[1px]">CAPRICCIO DI PEPE</span>
                <span className="text-2xl font-bold text-gray-500/40 blur-[1px]">MD22TEAM</span>
                <span className="text-2xl font-bold text-gray-500/40 blur-[1px]">ARECHI</span>
                <span className="text-2xl font-bold text-gray-500/40 blur-[1px]">DOLCE E CAFFÈ</span>
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-8">
          <h2 className="text-4xl md:text-5xl font-bebas text-white text-center mb-8 border-b-4 border-yellow-500 inline-block pb-2 mx-auto block w-fit">
            {t("tournamentInfo")}
          </h2>

          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <Card className="border-2 border-yellow-500 hover:border-yellow-400 transition-colors bg-black/80">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <div className="p-3 bg-yellow-500/20 rounded-lg border border-yellow-500 shrink-0">
                    <Calendar className="h-6 w-6 text-yellow-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{t("tournamentDates")}</h3>
                    <p className="text-gray-300 font-bold">{t("whenDesc")}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-yellow-500 hover:border-yellow-400 transition-colors bg-black/80">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <div className="p-3 bg-yellow-500/20 rounded-lg border border-yellow-500 shrink-0">
                    <Clock className="h-6 w-6 text-yellow-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{t("matchTimes")}</h3>
                    <p className="text-gray-300 font-bold">{t("matchTimesDesc")}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-yellow-500 hover:border-yellow-400 transition-colors bg-black/80">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <div className="p-3 bg-yellow-500/20 rounded-lg border border-yellow-500 shrink-0">
                    <MapPin className="h-6 w-6 text-yellow-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{t("location")}</h3>
                    <p className="text-gray-300">{t("whereDesc")}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-yellow-500 hover:border-yellow-400 transition-colors bg-black/80">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <div className="p-3 bg-yellow-500/20 rounded-lg border border-yellow-500 shrink-0">
                    <Users className="h-6 w-6 text-yellow-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{t("contact")}</h3>
                    <p className="text-gray-300">{t("contactDesc")}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-yellow-500 hover:border-yellow-400 transition-colors bg-black/80">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <div className="p-3 bg-yellow-500/20 rounded-lg border border-yellow-500 shrink-0">
                    <Trophy className="h-6 w-6 text-yellow-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{t("prizes")}</h3>
                    <p className="text-gray-300 font-bold">{t("prizesDesc")}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="container mx-auto px-4 py-16">
          <div className="border-2 border-yellow-500 rounded-2xl p-8 md:p-12 bg-black/80">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center justify-center gap-3 mb-6">
                <Shield className="h-12 w-12 text-yellow-400" />
                <h3 className="text-3xl md:text-4xl font-bebas text-yellow-400">{t("tournamentBasicRules")}</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-6 mt-8 text-left">
                <div className="bg-black/50 p-6 rounded-lg border border-yellow-500/30">
                  <h4 className="font-bold text-lg mb-3 text-yellow-400">{t("teamComposition")}</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li>• {t("minPlayers")}</li>
                    <li>• {t("maxPlayers")}</li>
                    <li>• {t("uniqueNumber")}</li>
                  </ul>
                </div>
                <div className="bg-black/50 p-6 rounded-lg border border-yellow-500/30">
                  <h4 className="font-bold text-lg mb-3 text-yellow-400">{t("format")}</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li>• {t("sixPlayers")}</li>
                    <li>• {t("phases")}</li>
                    <li>• {t("referees")}</li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 text-center">
                <a
                  href="/documents/regolamento-sanfracup.pdf"
                  download
                  className="inline-flex items-center gap-3 bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-6 py-3 rounded-lg transition-colors"
                >
                  <Download className="h-5 w-5" />
                  <span className="text-lg">{t("downloadRegulations")}</span>
                </a>
                <p className="text-gray-400 text-sm mt-2">{t("downloadRegulationsDesc")}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-16">
          <div className="border-2 border-yellow-500 rounded-2xl p-8 md:p-12 text-center bg-black/80">
            <h2 className="text-4xl md:text-5xl font-bebas text-white mb-4">{t("teamRegistration")}</h2>
            <p className="text-gray-300 mb-6 text-lg max-w-2xl mx-auto">{t("teamRegistrationDesc")}</p>
            {registrationsOpen ? (
              <Link href="/registrazione">
                <Button size="lg" className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold text-lg px-10">
                  {t("startRegistration")}
                </Button>
              </Link>
            ) : (
              <div className="space-y-4">
                <Button
                  size="lg"
                  disabled
                  className="bg-gray-600 text-gray-400 font-bold text-lg px-10 cursor-not-allowed"
                >
                  {t("registrationsClosed")}
                </Button>
                <p className="text-yellow-400 text-sm">{t("registrationsClosedDesc")}</p>
              </div>
            )}
          </div>
        </section>

        <footer className="border-t border-yellow-500/30 bg-black/90 py-8">
          <div className="container mx-auto px-4 text-center text-gray-400">
            <p>{t("footerText")}</p>
          </div>
        </footer>
      </div>
    </div>
  )
}
