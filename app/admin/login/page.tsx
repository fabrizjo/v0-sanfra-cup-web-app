import { LoginForm } from "@/components/login-form"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-black relative flex items-center justify-center p-4">
      <div className="fixed inset-0 z-0 opacity-10">
        <Image src="/images/sanfra-logo.png" alt="Sanfra Cup Logo" fill className="object-contain" priority />
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <h1
            className="text-6xl font-black text-yellow-400 tracking-wider mb-4 drop-shadow-[0_0_30px_rgba(234,179,8,0.5)]"
            style={{ fontFamily: "'Teko', sans-serif", letterSpacing: "0.1em" }}
          >
            <span className="text-white">SANFRA</span>{' '}<span className="text-yellow-400">CUP</span>
          </h1>
          <h2 className="text-2xl font-bold text-white mb-2">Area Admin</h2>
          <p className="text-gray-400">Accedi per gestire le iscrizioni del torneo</p>
        </div>

        <LoginForm />

        <div className="mt-6 text-center">
          <Link href="/">
            <Button variant="ghost" size="sm" className="text-yellow-400 hover:text-yellow-300 hover:bg-yellow-500/10">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Torna alla Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
