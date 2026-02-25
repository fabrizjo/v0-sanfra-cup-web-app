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
          <tr className="border-b border-yellow-500/20">
            <th className="py-3 px-3 text-left text-xs font-mono tracking-wider text-yellow-400 uppercase">#</th>
            <th className="py-3 px-3 text-left text-xs font-mono tracking-wider text-yellow-400 uppercase">Squadra</th>
            <th className="py-3 px-3 text-center text-xs font-mono tracking-wider text-yellow-400 uppercase">G</th>
            <th className="py-3 px-3 text-center text-xs font-mono tracking-wider text-yellow-400 uppercase">V</th>
            <th className="py-3 px-3 text-center text-xs font-mono tracking-wider text-yellow-400 uppercase">P</th>
            <th className="py-3 px-3 text-center text-xs font-mono tracking-wider text-yellow-400 uppercase">S</th>
            <th className="py-3 px-3 text-center text-xs font-mono tracking-wider text-yellow-400 uppercase">GF</th>
            <th className="py-3 px-3 text-center text-xs font-mono tracking-wider text-yellow-400 uppercase">GS</th>
            <th className="py-3 px-3 text-center text-xs font-mono tracking-wider text-yellow-400 uppercase">Pt</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team, index) => (
            <tr
              key={team.id}
              className={`border-b border-white/5 transition-colors hover:bg-yellow-400/5 ${
                index === 0 ? "bg-yellow-400/10" : ""
              }`}
            >
              <td className="py-3 px-3 text-gray-400 font-mono">
                {index === 0 ? (
                  <Trophy className="h-4 w-4 text-yellow-400 inline" />
                ) : (
                  team.position
                )}
              </td>
              <td className="py-3 px-3 text-white font-medium">{team.team_name}</td>
              <td className="py-3 px-3 text-center text-gray-400">{team.games_played}</td>
              <td className="py-3 px-3 text-center text-gray-400">{team.wins}</td>
              <td className="py-3 px-3 text-center text-gray-400">{team.draws}</td>
              <td className="py-3 px-3 text-center text-gray-400">{team.losses}</td>
              <td className="py-3 px-3 text-center text-gray-400">{team.goals_scored}</td>
              <td className="py-3 px-3 text-center text-gray-400">{team.goals_conceded}</td>
              <td className="py-3 px-3 text-center font-bold text-yellow-400 text-base">{team.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
