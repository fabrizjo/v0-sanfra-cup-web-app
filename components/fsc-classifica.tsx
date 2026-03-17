"use client"

import { useEffect, useState } from "react"
import { createBrowserClient } from "@/lib/supabase/client"
import { Trophy } from "lucide-react"

interface TeamRow {
  id: string
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

interface MiniTorneoRow {
  id: string
  team_name: string
  points: number
  games_played: number
  position: number
}

export function FscClassifica() {
  const [teams, setTeams] = useState<TeamRow[]>([])
  const [miniTorneoTeams, setMiniTorneoTeams] = useState<MiniTorneoRow[]>([])
  const [miniTorneoNumber, setMiniTorneoNumber] = useState<string>("6")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createBrowserClient()

    async function fetchClassifica() {
      const [campionatoRes, miniTorneoRes, miniTorneoNumberRes] = await Promise.all([
        supabase
          .from("fsc_classifica")
          .select("*")
          .order("position", { ascending: true }),
        supabase
          .from("fsc_minitorneo")
          .select("*")
          .order("position", { ascending: true }),
        supabase
          .from("tournament_settings")
          .select("setting_value_text")
          .eq("setting_key", "minitorneo_number")
          .single()
      ])

      if (!campionatoRes.error && campionatoRes.data) {
        setTeams(campionatoRes.data)
      }
      if (!miniTorneoRes.error && miniTorneoRes.data) {
        setMiniTorneoTeams(miniTorneoRes.data)
      }
      if (!miniTorneoNumberRes.error && miniTorneoNumberRes.data?.setting_value_text) {
        setMiniTorneoNumber(miniTorneoNumberRes.data.setting_value_text)
      }
      setLoading(false)
    }

    fetchClassifica()

    // Real-time subscription for both tables
    const channel1 = supabase
      .channel("fsc_classifica_changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "fsc_classifica" },
        () => {
          fetchClassifica()
        }
      )
      .subscribe()

    const channel2 = supabase
      .channel("fsc_minitorneo_changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "fsc_minitorneo" },
        () => {
          fetchClassifica()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel1)
      supabase.removeChannel(channel2)
    }
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-yellow-400 border-t-transparent" />
      </div>
    )
  }

  if (teams.length === 0) {
    return (
      <div className="text-center py-12">
        <Trophy className="h-12 w-12 text-yellow-400/30 mx-auto mb-4" />
        <p className="text-gray-500 text-lg">La classifica sara disponibile a breve</p>
      </div>
    )
  }

  return (
    <div className="space-y-12">
      {/* Classifica Campionato */}
      <div>
        <h3 className="text-xl font-spacema text-yellow-400 mb-4">Campionato</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-yellow-500/30">
                <th className="py-3 px-4 text-left text-xs font-mono tracking-wider text-yellow-400 uppercase w-12">#</th>
                <th className="py-3 px-4 text-left text-xs font-mono tracking-wider text-yellow-400 uppercase">Squadra</th>
                <th className="py-3 px-4 text-center text-xs font-mono tracking-wider text-yellow-400 uppercase w-16">PG</th>
                <th className="py-3 px-4 text-right text-xs font-mono tracking-wider text-yellow-400 uppercase w-20">Punti</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team, index) => (
                <tr
                  key={team.id}
                  className={`border-b border-white/5 transition-colors hover:bg-yellow-400/5 ${
                    index === 0 ? "bg-yellow-400/10" : index === 1 ? "bg-gray-400/5" : index === 2 ? "bg-amber-800/5" : ""
                  }`}
                >
                  <td className="py-3 px-4 font-mono font-bold">
                    {index === 0 ? (
                      <span className="text-yellow-400">{team.position}</span>
                    ) : index === 1 ? (
                      <span className="text-gray-300">{team.position}</span>
                    ) : index === 2 ? (
                      <span className="text-amber-600">{team.position}</span>
                    ) : (
                      <span className="text-gray-500">{team.position}</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-white font-medium">{team.team_name}</td>
                  <td className="py-3 px-4 text-center text-gray-400">{team.games_played}</td>
                  <td className={`py-3 px-4 text-right font-bold text-base ${
                    index === 0 ? "text-yellow-400" : "text-white"
                  }`}>
                    {team.points}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Classifica Minitorneo */}
      {miniTorneoTeams.length > 0 && (
        <div>
          <h3 className="text-xl font-spacema text-yellow-400 mb-4">{miniTorneoNumber}° Minitorneo</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-yellow-500/30">
                  <th className="py-3 px-4 text-left text-xs font-mono tracking-wider text-yellow-400 uppercase w-12">#</th>
                  <th className="py-3 px-4 text-left text-xs font-mono tracking-wider text-yellow-400 uppercase">Squadra</th>
                  <th className="py-3 px-4 text-center text-xs font-mono tracking-wider text-yellow-400 uppercase w-16">G</th>
                  <th className="py-3 px-4 text-right text-xs font-mono tracking-wider text-yellow-400 uppercase w-24">Pt Totali</th>
                </tr>
              </thead>
              <tbody>
                {miniTorneoTeams.map((team, index) => (
                  <tr
                    key={team.id}
                    className={`border-b border-white/5 transition-colors hover:bg-yellow-400/5 ${
                      index === 0 ? "bg-yellow-400/10" : index === 1 ? "bg-gray-400/5" : index === 2 ? "bg-amber-800/5" : ""
                    }`}
                  >
                    <td className="py-3 px-4 font-mono font-bold">
                      {index === 0 ? (
                        <span className="text-yellow-400">{team.position}</span>
                      ) : index === 1 ? (
                        <span className="text-gray-300">{team.position}</span>
                      ) : index === 2 ? (
                        <span className="text-amber-600">{team.position}</span>
                      ) : (
                        <span className="text-gray-500">{team.position}</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-white font-medium">{team.team_name}</td>
                    <td className="py-3 px-4 text-center text-gray-400">{team.games_played}</td>
                    <td className={`py-3 px-4 text-right font-bold text-base ${
                      index === 0 ? "text-yellow-400" : "text-white"
                    }`}>
                      {team.points}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
