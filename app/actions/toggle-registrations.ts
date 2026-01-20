"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function toggleRegistrations() {
  const supabase = await createClient()

  // Check if user is authenticated
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { success: false, error: "Non autenticato" }
  }

  // Get current settings
  const { data: currentSettings, error: fetchError } = await supabase
    .from("tournament_settings")
    .select("setting_value")
    .eq("setting_key", "registrations_open")
    .single()

  if (fetchError) {
    return { success: false, error: "Errore nel recupero delle impostazioni" }
  }

  // Toggle the value
  const newValue = !currentSettings.setting_value

  const { error: updateError } = await supabase
    .from("tournament_settings")
    .update({ setting_value: newValue, updated_at: new Date().toISOString() })
    .eq("setting_key", "registrations_open")

  if (updateError) {
    return { success: false, error: "Errore nell'aggiornamento delle impostazioni" }
  }

  revalidatePath("/")
  revalidatePath("/admin")

  return { success: true, registrationsOpen: newValue }
}
