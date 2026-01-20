import { RegistrationForm } from "@/components/registration-form"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function RegistrazionePage() {
  return (
    <div className="min-h-screen bg-black relative">
      {/* Background Logo */}
      <div className="fixed inset-0 z-0 opacity-5">
        <Image src="/images/sanfra-logo.png" alt="SanfraCup Logo" fill className="object-contain" />
      </div>

      <div className="relative z-10">
        <header className="border-b border-yellow-500/30 bg-black/90 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <h1 className="text-2xl font-bebas text-yellow-400 tracking-wider">SANFRACUP</h1>
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
            <h2 className="text-5xl font-bebas text-yellow-400 mb-3 tracking-wide">Registra la Tua Squadra</h2>
            <p className="text-lg text-gray-300">
              Compila il modulo sottostante per iscrivere la tua squadra alla SanfraCup
            </p>
          </div>

          <RegistrationForm />
        </div>
      </div>
    </div>
  )
}
