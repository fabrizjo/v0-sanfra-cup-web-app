import { RegistrationForm } from "@/components/registration-form"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface RegistrazionePageProps {
  searchParams: Promise<{ sport?: string }>
}

export default async function RegistrazionePage({ searchParams }: RegistrazionePageProps) {
  const params = await searchParams
  const sport = (params.sport === "volley" ? "volley" : "calcio") as "calcio" | "volley"
  const sportLabel = sport === "calcio" ? "Calcio" : "Volley"

  return (
    <div className="min-h-screen bg-black relative">
      {/* Background Logo */}
      <div className="fixed inset-0 z-0 opacity-5">
        <Image src="/images/sanfra-logo.png" alt="SanfraCup Logo" fill className="object-contain" />
      </div>

      <div className="relative z-10">
        <header className="border-b border-yellow-500/30 bg-black/90 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bebas text-yellow-400 tracking-wider">SANFRACUP</h1>
              <p className="text-sm text-gray-400">Registrazione {sportLabel}</p>
            </div>
            <Link href="/">
              <Button
                variant="outline"
                size="sm"
                className="border-yellow-500 text-yellow-400 hover:bg-yellow-500 hover:text-black bg-transparent"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Torna alla Home
              </Button>
            </Link>
          </div>
        </header>

        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <div className="text-center mb-8">
            <h2 className="text-5xl font-bebas text-yellow-400 mb-3 tracking-wide">
              Registra la Tua Squadra di {sportLabel}
            </h2>
            <p className="text-lg text-gray-300">
              Compila il modulo sottostante per iscrivere la tua squadra al torneo di {sportLabel.toLowerCase()} della SanfraCup
            </p>
          </div>

          <RegistrationForm sport={sport} />
        </div>
      </div>
    </div>
  )
}
