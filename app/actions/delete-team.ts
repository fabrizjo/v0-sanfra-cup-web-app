"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function deleteTeam(teamId: string) {
  const supabase = await createClient()

  // First delete all players associated with the team
  const { error: playersError } = await supabase
    .from("players")
    .delete()
    .eq("team_id", teamId)

  if (playersError) {
    return { success: false, error: "Errore nella cancellazione dei giocatori" }
  }

  // Then delete the team
  const { error: teamError } = await supabase
    .from("teams")
    .delete()
    .eq("id", teamId)

  if (teamError) {
    return { success: false, error: "Errore nella cancellazione della squadra" }
  }

  revalidatePath("/admin")
  return { success: true }
}
