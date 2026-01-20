"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Users, Search, Mail, Phone, UserCircle, Hash } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { RegistrationToggle } from "./registration-toggle"

type Player = {
  id: string
  name: string
  jersey_number: number
}

type Team = {
  id: string
  name: string
  contact_email: string
  contact_phone: string
  created_at: string
  players: Player[]
}

export function AdminDashboard({ teams, registrationsOpen }: { teams: Team[]; registrationsOpen: boolean }) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredTeams = teams.filter(
    (team) =>
      team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.contact_email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.players.some((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const totalPlayers = teams.reduce((sum, team) => sum + team.players.length, 0)

  return (
    <div className="space-y-6">
      <RegistrationToggle initialStatus={registrationsOpen} />

      <div className="grid md:grid-cols-3 gap-4">
        <Card className="border-2 border-yellow-500 bg-black/80">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-yellow-500/20 rounded-lg border border-yellow-500">
                <Users className="h-6 w-6 text-yellow-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Squadre Iscritte</p>
                <p className="text-2xl font-bold text-white">{teams.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-yellow-500 bg-black/80">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-yellow-500/20 rounded-lg border border-yellow-500">
                <UserCircle className="h-6 w-6 text-yellow-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Giocatori Totali</p>
                <p className="text-2xl font-bold text-white">{totalPlayers}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-yellow-500 bg-black/80">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-yellow-500/20 rounded-lg border border-yellow-500">
                <Hash className="h-6 w-6 text-yellow-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Media Giocatori</p>
                <p className="text-2xl font-bold text-white">
                  {teams.length > 0 ? (totalPlayers / teams.length).toFixed(1) : 0}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-2 border-yellow-500 bg-black/80">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Cerca squadra, email o giocatore..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-black/50 border-yellow-500/30 text-white placeholder:text-gray-500 focus:border-yellow-500"
            />
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {filteredTeams.length === 0 ? (
          <Card className="border-2 border-yellow-500 bg-black/80">
            <CardContent className="pt-6 text-center text-gray-400">
              {searchQuery ? "Nessun risultato trovato" : "Nessuna squadra iscritta ancora"}
            </CardContent>
          </Card>
        ) : (
          filteredTeams.map((team) => (
            <Card
              key={team.id}
              className="border-2 border-yellow-500 hover:border-yellow-400 transition-colors bg-black/80"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl text-yellow-400">{team.name}</CardTitle>
                    <div className="flex flex-col gap-1 mt-2 text-sm text-gray-400">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        {team.contact_email}
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        {team.contact_phone}
                      </div>
                    </div>
                  </div>
                  <Badge className="bg-yellow-500 text-black hover:bg-yellow-400">
                    {team.players.length} Giocatori
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-300 mb-3">Rosa Giocatori:</p>
                  <div className="grid md:grid-cols-2 gap-2">
                    {team.players
                      .sort((a, b) => a.jersey_number - b.jersey_number)
                      .map((player) => (
                        <div
                          key={player.id}
                          className="flex items-center gap-3 bg-black/50 border border-yellow-500/30 rounded-lg p-3"
                        >
                          <div className="flex items-center justify-center w-10 h-10 bg-yellow-500 text-black font-bold rounded">
                            {player.jersey_number}
                          </div>
                          <span className="text-sm font-medium text-white">{player.name}</span>
                        </div>
                      ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
