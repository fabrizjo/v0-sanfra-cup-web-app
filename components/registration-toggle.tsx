"use client"

import { useState, useTransition } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Lock, Unlock } from "lucide-react"
import { toggleRegistrations } from "@/app/actions/toggle-registrations"
import { useRouter } from "next/navigation"

export function RegistrationToggle({ initialStatus }: { initialStatus: boolean }) {
  const [isOpen, setIsOpen] = useState(initialStatus)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const handleToggle = () => {
    startTransition(async () => {
      const result = await toggleRegistrations()
      if (result.success) {
        setIsOpen(result.registrationsOpen!)
        router.refresh()
      }
    })
  }

  return (
    <Card className="border-2 border-yellow-500 bg-black/80">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-yellow-500/20 rounded-lg border border-yellow-500">
              {isOpen ? <Unlock className="h-6 w-6 text-yellow-400" /> : <Lock className="h-6 w-6 text-yellow-400" />}
            </div>
            <div>
              <p className="text-sm text-gray-400">Stato Registrazioni</p>
              <p className="text-xl font-bold text-white">{isOpen ? "Aperte" : "Chiuse"}</p>
            </div>
          </div>
          <Button
            onClick={handleToggle}
            disabled={isPending}
            className={`${
              isOpen ? "bg-red-600 hover:bg-red-700 text-white" : "bg-green-600 hover:bg-green-700 text-white"
            } font-bold`}
          >
            {isPending ? "Aggiornamento..." : isOpen ? "Chiudi Registrazioni" : "Apri Registrazioni"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
