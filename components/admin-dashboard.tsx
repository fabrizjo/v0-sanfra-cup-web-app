"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Users, Search, Mail, Phone, UserCircle, Hash, Trash2, Trophy, Plus, Save } from "lucide-react"
import { createBrowserClient } from "@/lib/supabase/client"
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

type FscTeam = {
  id?: string
  team_name: string
  points: number
  games_played: number
  wins: number
  draws: number
  losses: number
  goals_scored: number
  goals_conceded: number
  position: number
}

type MiniTorneoTeam = {
  id?: string
  team_name: string
  points: number
  games_played: number
  position: number
}

export function AdminDashboard({ teams, calcioRegistrationsOpen, volleyRegistrationsOpen }: AdminDashboardProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState<"calcio" | "volley" | "fsc">("calcio")
  const [deletingTeamId, setDeletingTeamId] = useState<string | null>(null)
  const [fscTeams, setFscTeams] = useState<FscTeam[]>([])
  const [fscLoading, setFscLoading] = useState(false)
  const [fscSaving, setFscSaving] = useState(false)
  const [fscLoaded, setFscLoaded] = useState(false)
  const [miniTorneoTeams, setMiniTorneoTeams] = useState<MiniTorneoTeam[]>([])
  const [miniTorneoSaving, setMiniTorneoSaving] = useState(false)

  const loadFscClassifica = async () => {
    setFscLoading(true)
    const supabase = createBrowserClient()
    const [campionatoRes, miniTorneoRes] = await Promise.all([
      supabase.from("fsc_classifica").select("*").order("position", { ascending: true }),
      supabase.from("fsc_minitorneo").select("*").order("position", { ascending: true })
    ])
    if (campionatoRes.data) setFscTeams(campionatoRes.data)
    if (miniTorneoRes.data) setMiniTorneoTeams(miniTorneoRes.data)
    setFscLoading(false)
    setFscLoaded(true)
  }

  const addFscTeam = () => {
    setFscTeams(prev => [...prev, {
      team_name: "",
      points: 0,
      games_played: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goals_scored: 0,
      goals_conceded: 0,
      position: prev.length + 1,
    }])
  }

  const updateFscTeam = (index: number, field: keyof FscTeam, value: string | number) => {
    setFscTeams(prev => prev.map((t, i) => i === index ? { ...t, [field]: value } : t))
  }

  const removeFscTeam = async (index: number) => {
    const team = fscTeams[index]
    if (team.id) {
      const supabase = createBrowserClient()
      await supabase.from("fsc_classifica").delete().eq("id", team.id)
    }
    setFscTeams(prev => prev.filter((_, i) => i !== index))
  }

  const saveFscClassifica = async () => {
    setFscSaving(true)
    const supabase = createBrowserClient()
    
    for (const team of fscTeams) {
      const teamData = {
        team_name: team.team_name,
        points: team.points,
        games_played: team.games_played,
        wins: team.wins,
        draws: team.draws,
        losses: team.losses,
        goals_scored: team.goals_scored,
        goals_conceded: team.goals_conceded,
        position: team.position,
      }
      if (team.id) {
        await supabase.from("fsc_classifica").update(teamData).eq("id", team.id)
      } else {
        const { data } = await supabase.from("fsc_classifica").insert(teamData).select().single()
        if (data) team.id = data.id
      }
    }
    setFscSaving(false)
    alert("Classifica campionato salvata!")
  }

  // Minitorneo functions
  const addMiniTorneoTeam = () => {
    setMiniTorneoTeams(prev => [...prev, {
      team_name: "",
      points: 0,
      games_played: 0,
      position: prev.length + 1,
    }])
  }

  const updateMiniTorneoTeam = (index: number, field: keyof MiniTorneoTeam, value: string | number) => {
    setMiniTorneoTeams(prev => prev.map((t, i) => i === index ? { ...t, [field]: value } : t))
  }

  const removeMiniTorneoTeam = async (index: number) => {
    const team = miniTorneoTeams[index]
    if (team.id) {
      const supabase = createBrowserClient()
      await supabase.from("fsc_minitorneo").delete().eq("id", team.id)
    }
    setMiniTorneoTeams(prev => prev.filter((_, i) => i !== index))
  }

  const saveMiniTorneoClassifica = async () => {
    setMiniTorneoSaving(true)
    const supabase = createBrowserClient()
    
    for (const team of miniTorneoTeams) {
      const teamData = {
        team_name: team.team_name,
        points: team.points,
        games_played: team.games_played,
        position: team.position,
      }
      if (team.id) {
        await supabase.from("fsc_minitorneo").update(teamData).eq("id", team.id)
      } else {
        const { data } = await supabase.from("fsc_minitorneo").insert(teamData).select().single()
        if (data) team.id = data.id
      }
    }
    setMiniTorneoSaving(false)
    alert("Classifica minitorneo salvata!")
  }

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
      <Tabs value={activeTab} onValueChange={(v) => {
        setActiveTab(v as "calcio" | "volley" | "fsc")
        if (v === "fsc" && !fscLoaded) loadFscClassifica()
      }}>
        <TabsList className="grid w-full grid-cols-3 bg-black/50 border border-yellow-500/30">
          <TabsTrigger 
            value="calcio" 
            className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black text-white"
          >
            Calcio ({calcioTeams.length})
          </TabsTrigger>
          <TabsTrigger 
            value="volley" 
            className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black text-white"
          >
            Volley ({volleyTeams.length})
          </TabsTrigger>
          <TabsTrigger 
            value="fsc" 
            className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black text-white"
          >
            <Trophy className="h-4 w-4 mr-1" />
            FSC
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

        {/* FSC Classifica Tab */}
        <TabsContent value="fsc" className="space-y-8">
          {/* Campionato Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Classifica Campionato</h3>
              <div className="flex gap-2">
                <button
                  onClick={addFscTeam}
                  className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-black rounded-lg hover:bg-yellow-400 transition-colors text-sm font-medium"
                >
                  <Plus className="h-4 w-4" />
                  Aggiungi
                </button>
                <button
                  onClick={saveFscClassifica}
                  disabled={fscSaving}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500 transition-colors text-sm font-medium disabled:opacity-50"
                >
                  <Save className="h-4 w-4" />
                  {fscSaving ? "Salvataggio..." : "Salva"}
                </button>
              </div>
            </div>

            {fscLoading ? (
              <p className="text-gray-400 text-center py-8">Caricamento...</p>
            ) : fscTeams.length === 0 ? (
              <p className="text-gray-400 text-center py-8">Nessuna squadra. Clicca &quot;Aggiungi&quot; per iniziare.</p>
            ) : (
              <div className="overflow-x-auto rounded-xl border border-yellow-500/20">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-yellow-500/10 border-b border-yellow-500/20">
                      <th className="px-3 py-3 text-left text-yellow-400 font-medium">#</th>
                      <th className="px-3 py-3 text-left text-yellow-400 font-medium">Squadra</th>
                      <th className="px-3 py-3 text-center text-yellow-400 font-medium">Pt</th>
                      <th className="px-3 py-3 text-center text-yellow-400 font-medium">G</th>
                      <th className="px-3 py-3 text-center text-yellow-400 font-medium">V</th>
                      <th className="px-3 py-3 text-center text-yellow-400 font-medium">N</th>
                      <th className="px-3 py-3 text-center text-yellow-400 font-medium">P</th>
                      <th className="px-3 py-3 text-center text-yellow-400 font-medium">GF</th>
                      <th className="px-3 py-3 text-center text-yellow-400 font-medium">GS</th>
                      <th className="px-3 py-3 text-center text-yellow-400 font-medium"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {fscTeams.map((team, index) => (
                      <tr key={team.id || index} className="border-b border-white/5 hover:bg-white/5">
                        <td className="px-3 py-2">
                          <input
                            type="number"
                            value={team.position}
                            onChange={(e) => updateFscTeam(index, "position", parseInt(e.target.value) || 0)}
                            className="w-12 bg-black/50 border border-white/10 rounded px-2 py-1 text-white text-center text-sm"
                          />
                        </td>
                        <td className="px-3 py-2">
                          <input
                            type="text"
                            value={team.team_name}
                            onChange={(e) => updateFscTeam(index, "team_name", e.target.value)}
                            placeholder="Nome squadra"
                            className="w-full bg-black/50 border border-white/10 rounded px-2 py-1 text-white text-sm min-w-[140px]"
                          />
                        </td>
                        <td className="px-3 py-2">
                          <input
                            type="number"
                            value={team.points}
                            onChange={(e) => updateFscTeam(index, "points", parseInt(e.target.value) || 0)}
                            className="w-14 bg-black/50 border border-white/10 rounded px-2 py-1 text-white text-center text-sm"
                          />
                        </td>
                        <td className="px-3 py-2">
                          <input
                            type="number"
                            value={team.games_played}
                            onChange={(e) => updateFscTeam(index, "games_played", parseInt(e.target.value) || 0)}
                            className="w-14 bg-black/50 border border-white/10 rounded px-2 py-1 text-white text-center text-sm"
                          />
                        </td>
                        <td className="px-3 py-2">
                          <input
                            type="number"
                            value={team.wins}
                            onChange={(e) => updateFscTeam(index, "wins", parseInt(e.target.value) || 0)}
                            className="w-14 bg-black/50 border border-white/10 rounded px-2 py-1 text-white text-center text-sm"
                          />
                        </td>
                        <td className="px-3 py-2">
                          <input
                            type="number"
                            value={team.draws}
                            onChange={(e) => updateFscTeam(index, "draws", parseInt(e.target.value) || 0)}
                            className="w-14 bg-black/50 border border-white/10 rounded px-2 py-1 text-white text-center text-sm"
                          />
                        </td>
                        <td className="px-3 py-2">
                          <input
                            type="number"
                            value={team.losses}
                            onChange={(e) => updateFscTeam(index, "losses", parseInt(e.target.value) || 0)}
                            className="w-14 bg-black/50 border border-white/10 rounded px-2 py-1 text-white text-center text-sm"
                          />
                        </td>
                        <td className="px-3 py-2">
                          <input
                            type="number"
                            value={team.goals_scored}
                            onChange={(e) => updateFscTeam(index, "goals_scored", parseInt(e.target.value) || 0)}
                            className="w-14 bg-black/50 border border-white/10 rounded px-2 py-1 text-white text-center text-sm"
                          />
                        </td>
                        <td className="px-3 py-2">
                          <input
                            type="number"
                            value={team.goals_conceded}
                            onChange={(e) => updateFscTeam(index, "goals_conceded", parseInt(e.target.value) || 0)}
                            className="w-14 bg-black/50 border border-white/10 rounded px-2 py-1 text-white text-center text-sm"
                          />
                        </td>
                        <td className="px-3 py-2">
                          <button
                            onClick={() => removeFscTeam(index)}
                            className="text-red-400 hover:text-red-300 transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Minitorneo Section */}
          <div className="space-y-4 pt-8 border-t border-yellow-500/20">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Classifica Minitorneo</h3>
              <div className="flex gap-2">
                <button
                  onClick={addMiniTorneoTeam}
                  className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-black rounded-lg hover:bg-yellow-400 transition-colors text-sm font-medium"
                >
                  <Plus className="h-4 w-4" />
                  Aggiungi
                </button>
                <button
                  onClick={saveMiniTorneoClassifica}
                  disabled={miniTorneoSaving}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500 transition-colors text-sm font-medium disabled:opacity-50"
                >
                  <Save className="h-4 w-4" />
                  {miniTorneoSaving ? "Salvataggio..." : "Salva"}
                </button>
              </div>
            </div>

            {fscLoading ? (
              <p className="text-gray-400 text-center py-8">Caricamento...</p>
            ) : miniTorneoTeams.length === 0 ? (
              <p className="text-gray-400 text-center py-8">Nessuna squadra minitorneo. Clicca &quot;Aggiungi&quot; per iniziare.</p>
            ) : (
              <div className="overflow-x-auto rounded-xl border border-yellow-500/20">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-yellow-500/10 border-b border-yellow-500/20">
                      <th className="px-3 py-3 text-left text-yellow-400 font-medium">#</th>
                      <th className="px-3 py-3 text-left text-yellow-400 font-medium">Squadra</th>
                      <th className="px-3 py-3 text-center text-yellow-400 font-medium">G</th>
                      <th className="px-3 py-3 text-center text-yellow-400 font-medium">Pt Totali</th>
                      <th className="px-3 py-3 text-center text-yellow-400 font-medium"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {miniTorneoTeams.map((team, index) => (
                      <tr key={team.id || index} className="border-b border-white/5 hover:bg-white/5">
                        <td className="px-3 py-2">
                          <input
                            type="number"
                            value={team.position}
                            onChange={(e) => updateMiniTorneoTeam(index, "position", parseInt(e.target.value) || 0)}
                            className="w-12 bg-black/50 border border-white/10 rounded px-2 py-1 text-white text-center text-sm"
                          />
                        </td>
                        <td className="px-3 py-2">
                          <input
                            type="text"
                            value={team.team_name}
                            onChange={(e) => updateMiniTorneoTeam(index, "team_name", e.target.value)}
                            placeholder="Nome squadra"
                            className="w-full bg-black/50 border border-white/10 rounded px-2 py-1 text-white text-sm min-w-[140px]"
                          />
                        </td>
                        <td className="px-3 py-2">
                          <input
                            type="number"
                            value={team.games_played}
                            onChange={(e) => updateMiniTorneoTeam(index, "games_played", parseInt(e.target.value) || 0)}
                            className="w-14 bg-black/50 border border-white/10 rounded px-2 py-1 text-white text-center text-sm"
                          />
                        </td>
                        <td className="px-3 py-2">
                          <input
                            type="number"
                            step="0.5"
                            value={team.points}
                            onChange={(e) => updateMiniTorneoTeam(index, "points", parseFloat(e.target.value) || 0)}
                            className="w-20 bg-black/50 border border-white/10 rounded px-2 py-1 text-white text-center text-sm"
                          />
                        </td>
                        <td className="px-3 py-2">
                          <button
                            onClick={() => removeMiniTorneoTeam(index)}
                            className="text-red-400 hover:text-red-300 transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
