"use client"

import { useState, useTransition } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Lock, Unlock } from "lucide-react"
import { toggleRegistrations, type SportType } from "@/app/actions/toggle-registrations"
import { useRouter } from "next/navigation"

interface RegistrationToggleProps {
  initialCalcioStatus: boolean
  initialVolleyStatus: boolean
}

export function RegistrationToggle({ initialCalcioStatus, initialVolleyStatus }: RegistrationToggleProps) {
  const [isCalcioOpen, setIsCalcioOpen] = useState(initialCalcioStatus)
  const [isVolleyOpen, setIsVolleyOpen] = useState(initialVolleyStatus)
  const [isPendingCalcio, startTransitionCalcio] = useTransition()
  const [isPendingVolley, startTransitionVolley] = useTransition()
  const router = useRouter()

  const handleToggle = (sport: SportType) => {
    if (sport === "calcio") {
      startTransitionCalcio(async () => {
        const result = await toggleRegistrations("calcio")
        if (result.success) {
          setIsCalcioOpen(result.registrationsOpen!)
          router.refresh()
        }
      })
    } else {
      startTransitionVolley(async () => {
        const result = await toggleRegistrations("volley")
        if (result.success) {
          setIsVolleyOpen(result.registrationsOpen!)
          router.refresh()
        }
      })
    }
  }

  return (
    <div className="space-y-4">
      {/* Calcio Toggle */}
      <Card className="border-2 border-yellow-500 bg-black/80">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-yellow-500/20 rounded-lg border border-yellow-500">
                {isCalcioOpen ? <Unlock className="h-6 w-6 text-yellow-400" /> : <Lock className="h-6 w-6 text-yellow-400" />}
              </div>
              <div>
                <p className="text-sm text-gray-400">Registrazioni Calcio</p>
                <p className="text-xl font-bold text-white">{isCalcioOpen ? "Aperte" : "Chiuse"}</p>
              </div>
            </div>
            <Button
              onClick={() => handleToggle("calcio")}
              disabled={isPendingCalcio}
              className={`${
                isCalcioOpen ? "bg-red-600 hover:bg-red-700 text-white" : "bg-green-600 hover:bg-green-700 text-white"
              } font-bold`}
            >
              {isPendingCalcio ? "Aggiornamento..." : isCalcioOpen ? "Chiudi" : "Apri"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Volley Toggle */}
      <Card className="border-2 border-yellow-500 bg-black/80">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-yellow-500/20 rounded-lg border border-yellow-500">
                {isVolleyOpen ? <Unlock className="h-6 w-6 text-yellow-400" /> : <Lock className="h-6 w-6 text-yellow-400" />}
              </div>
              <div>
                <p className="text-sm text-gray-400">Registrazioni Volley</p>
                <p className="text-xl font-bold text-white">{isVolleyOpen ? "Aperte" : "Chiuse"}</p>
              </div>
            </div>
            <Button
              onClick={() => handleToggle("volley")}
              disabled={isPendingVolley}
              className={`${
                isVolleyOpen ? "bg-red-600 hover:bg-red-700 text-white" : "bg-green-600 hover:bg-green-700 text-white"
              } font-bold`}
            >
              {isPendingVolley ? "Aggiornamento..." : isVolleyOpen ? "Chiudi" : "Apri"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
