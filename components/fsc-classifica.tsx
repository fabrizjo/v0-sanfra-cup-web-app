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

export function FscClassifica() {
  const [teams, setTeams] = useState<TeamRow[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createBrowserClient()

    async function fetchClassifica() {
      const { data, error } = await supabase
        .from("fsc_classifica")
        .select("*")
        .order("position", { ascending: true })

      if (!error && data) {
        setTeams(data)
      }
      setLoading(false)
    }

    fetchClassifica()

    // Real-time subscription
    const channel = supabase
      .channel("fsc_classifica_changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "fsc_classifica" },
        () => {
          fetchClassifica()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
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
  )
}
