"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Trash2, Users, Mail, Phone } from "lucide-react"
import { createBrowserClient } from "@supabase/ssr"

type Player = {
  id: string
  name: string
  jerseyNumber: string
}

type SportType = "calcio" | "volley"

interface RegistrationFormProps {
  sport?: SportType
}

export function RegistrationForm({ sport = "calcio" }: RegistrationFormProps) {
  const [teamName, setTeamName] = useState("")
  const [contactEmail, setContactEmail] = useState("")
  const [contactPhone, setContactPhone] = useState("")
  const [players, setPlayers] = useState<Player[]>([
    { id: "1", name: "", jerseyNumber: "" },
    { id: "2", name: "", jerseyNumber: "" },
    { id: "3", name: "", jerseyNumber: "" },
    { id: "4", name: "", jerseyNumber: "" },
    { id: "5", name: "", jerseyNumber: "" },
    { id: "6", name: "", jerseyNumber: "" },
  ])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const addPlayer = () => {
    if (players.length < 8) {
      setPlayers([...players, { id: Date.now().toString(), name: "", jerseyNumber: "" }])
    }
  }

  const removePlayer = (id: string) => {
    if (players.length > 6) {
      setPlayers(players.filter((p) => p.id !== id))
    }
  }

  const updatePlayer = (id: string, field: "name" | "jerseyNumber", value: string) => {
    setPlayers(players.map((p) => (p.id === id ? { ...p, [field]: value } : p)))
  }

  const validateForm = () => {
    if (!teamName.trim()) {
      setErrorMessage("Il nome della squadra è obbligatorio")
      return false
    }
    if (!contactEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactEmail)) {
      setErrorMessage("Email non valida")
      return false
    }
    if (!contactPhone.trim()) {
      setErrorMessage("Il numero di telefono è obbligatorio")
      return false
    }

    const filledPlayers = players.filter((p) => p.name.trim() && p.jerseyNumber.trim())
    if (filledPlayers.length < 6) {
      setErrorMessage("Devi inserire almeno 6 giocatori completi")
      return false
    }

    const jerseyNumbers = filledPlayers.map((p) => Number.parseInt(p.jerseyNumber))
    if (jerseyNumbers.some(isNaN)) {
      setErrorMessage("Tutti i numeri di maglia devono essere numeri validi")
      return false
    }

    const uniqueNumbers = new Set(jerseyNumbers)
    if (uniqueNumbers.size !== jerseyNumbers.length) {
      setErrorMessage("I numeri di maglia devono essere unici")
      return false
    }

    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage("")

    if (!validateForm()) {
      setSubmitStatus("error")
      return
    }

    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      )

      // Insert team
      const { data: teamData, error: teamError } = await supabase
        .from("teams")
        .insert({
          name: teamName.trim(),
          contact_email: contactEmail.trim(),
          contact_phone: contactPhone.trim(),
          sport: sport,
        })
        .select()
        .single()

      if (teamError) throw teamError

      // Insert players
      const filledPlayers = players.filter((p) => p.name.trim() && p.jerseyNumber.trim())
      const playersToInsert = filledPlayers.map((p) => ({
        team_id: teamData.id,
        name: p.name.trim(),
        jersey_number: Number.parseInt(p.jerseyNumber),
      }))

      const { error: playersError } = await supabase.from("players").insert(playersToInsert)

      if (playersError) throw playersError

      setSubmitStatus("success")
      // Reset form
      setTeamName("")
      setContactEmail("")
      setContactPhone("")
      setPlayers([
        { id: "1", name: "", jerseyNumber: "" },
        { id: "2", name: "", jerseyNumber: "" },
        { id: "3", name: "", jerseyNumber: "" },
        { id: "4", name: "", jerseyNumber: "" },
        { id: "5", name: "", jerseyNumber: "" },
        { id: "6", name: "", jerseyNumber: "" },
      ])
    } catch (error: any) {
      console.error("[v0] Registration error:", error)
      setSubmitStatus("error")
      setErrorMessage(error.message || "Errore durante la registrazione. Riprova.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Team Info Card */}
      <Card className="border-2 border-yellow-500/50 bg-black/80">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-yellow-400">
            <Users className="h-5 w-5" />
            Informazioni Squadra
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="teamName" className="text-gray-300">
              Nome Squadra *
            </Label>
            <Input
              id="teamName"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              placeholder="Es. Leoni di Salerno"
              required
              className="bg-black/50 border-yellow-500/30 text-white placeholder:text-gray-500"
            />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="contactEmail" className="flex items-center gap-2 text-gray-300">
                <Mail className="h-4 w-4" />
                Email di Contatto *
              </Label>
              <Input
                id="contactEmail"
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                placeholder="squadra@example.com"
                required
                className="bg-black/50 border-yellow-500/30 text-white placeholder:text-gray-500"
              />
            </div>
            <div>
              <Label htmlFor="contactPhone" className="flex items-center gap-2 text-gray-300">
                <Phone className="h-4 w-4" />
                Telefono *
              </Label>
              <Input
                id="contactPhone"
                type="tel"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                placeholder="+39 123 456 7890"
                required
                className="bg-black/50 border-yellow-500/30 text-white placeholder:text-gray-500"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Players Card */}
      <Card className="border-2 border-yellow-500/50 bg-black/80">
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-yellow-400">
            <span>Giocatori ({players.length}/8) - Minimo 6 Richiesti</span>
            {players.length < 8 && (
              <Button
                type="button"
                onClick={addPlayer}
                size="sm"
                className="border-yellow-500 text-yellow-400 hover:bg-yellow-500 hover:text-black bg-transparent"
                variant="outline"
              >
                <Plus className="h-4 w-4 mr-2" />
                Aggiungi Giocatore
              </Button>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {players.map((player, index) => (
            <div key={player.id} className="flex items-end gap-3">
              <div className="flex-1">
                <Label htmlFor={`player-name-${player.id}`} className="text-gray-300">
                  Giocatore {index + 1} {index < 6 ? "*" : ""}
                </Label>
                <Input
                  id={`player-name-${player.id}`}
                  value={player.name}
                  onChange={(e) => updatePlayer(player.id, "name", e.target.value)}
                  placeholder="Nome e Cognome"
                  required={index < 6}
                  className="bg-black/50 border-yellow-500/30 text-white placeholder:text-gray-500"
                />
              </div>
              <div className="w-32">
                <Label htmlFor={`player-jersey-${player.id}`} className="text-gray-300">
                  Numero {index < 6 ? "*" : ""}
                </Label>
                <Input
                  id={`player-jersey-${player.id}`}
                  type="number"
                  min="1"
                  max="99"
                  value={player.jerseyNumber}
                  onChange={(e) => updatePlayer(player.id, "jerseyNumber", e.target.value)}
                  placeholder="N°"
                  required={index < 6}
                  className="bg-black/50 border-yellow-500/30 text-white placeholder:text-gray-500"
                />
              </div>
              {players.length > 6 && (
                <Button type="button" onClick={() => removePlayer(player.id)} variant="destructive" size="icon">
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Status Messages */}
      {submitStatus === "success" && (
        <div className="bg-yellow-500/20 border border-yellow-500 text-yellow-400 px-4 py-3 rounded-lg">
          <p className="font-medium">Registrazione completata con successo!</p>
          <p className="text-sm">La tua squadra è stata iscritta alla Sanfra Cup.</p>
        </div>
      )}

      {submitStatus === "error" && errorMessage && (
        <div className="bg-red-500/20 border border-red-500 text-red-400 px-4 py-3 rounded-lg">
          <p className="font-medium">Errore</p>
          <p className="text-sm">{errorMessage}</p>
        </div>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold"
        size="lg"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Registrazione in corso..." : "Registra Squadra"}
      </Button>

      <p className="text-sm text-gray-400 text-center">
        * Campi obbligatori. Assicurati che tutti i dati siano corretti prima di inviare.
      </p>
    </form>
  )
}
