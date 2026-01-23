"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Users, Search, Mail, Phone, UserCircle, Hash, Trash2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { RegistrationToggle } from "./registration-toggle"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { deleteTeam } from "@/app/actions/delete-team"

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
  sport?: string
}

interface AdminDashboardProps {
  teams: Team[]
  calcioRegistrationsOpen: boolean
  volleyRegistrationsOpen: boolean
}

export function AdminDashboard({ teams, calcioRegistrationsOpen, volleyRegistrationsOpen }: AdminDashboardProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState<"calcio" | "volley">("calcio")
  const [deletingTeamId, setDeletingTeamId] = useState<string | null>(null)

  const handleDeleteTeam = async (teamId: string, teamName: string) => {
    if (!confirm(`Sei sicuro di voler cancellare la squadra "${teamName}"? Questa azione non può essere annullata.`)) {
      return
    }
    
    setDeletingTeamId(teamId)
    const result = await deleteTeam(teamId)
    setDeletingTeamId(null)
    
    if (!result.success) {
      alert(result.error || "Errore nella cancellazione")
    }
  }

  const calcioTeams = teams.filter((team) => team.sport === "calcio" || !team.sport)
  const volleyTeams = teams.filter((team) => team.sport === "volley")

  const currentTeams = activeTab === "calcio" ? calcioTeams : volleyTeams

  const filteredTeams = currentTeams.filter(
    (team) =>
      team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.contact_email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.players.some((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const totalPlayers = currentTeams.reduce((sum, team) => sum + team.players.length, 0)

  return (
    <div className="space-y-6">
      <RegistrationToggle 
        initialCalcioStatus={calcioRegistrationsOpen} 
        initialVolleyStatus={volleyRegistrationsOpen} 
      />

      {/* Tabs for Calcio / Volley */}
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "calcio" | "volley")}>
        <TabsList className="grid w-full grid-cols-2 bg-black/50 border border-yellow-500/30">
          <TabsTrigger 
            value="calcio" 
            className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black text-white"
          >
            Calcio ({calcioTeams.length} squadre)
          </TabsTrigger>
          <TabsTrigger 
            value="volley" 
            className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black text-white"
          >
            Volley ({volleyTeams.length} squadre)
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <Card className="border-2 border-yellow-500 bg-black/80">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-yellow-500/20 rounded-lg border border-yellow-500">
                    <Users className="h-6 w-6 text-yellow-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Squadre {activeTab === "calcio" ? "Calcio" : "Volley"}</p>
                    <p className="text-2xl font-bold text-white">{currentTeams.length}</p>
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
                      {currentTeams.length > 0 ? (totalPlayers / currentTeams.length).toFixed(1) : 0}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-2 border-yellow-500 bg-black/80 mb-6">
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
                  {searchQuery ? "Nessun risultato trovato" : `Nessuna squadra di ${activeTab} iscritta ancora`}
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
                      <div className="flex items-center gap-3">
                        <Badge className="bg-yellow-500 text-black hover:bg-yellow-400">
                          {team.players.length} Giocatori
                        </Badge>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteTeam(team.id, team.name)}
                          disabled={deletingTeamId === team.id}
                          className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white bg-transparent"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
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
        </TabsContent>
      </Tabs>
    </div>
  )
}
