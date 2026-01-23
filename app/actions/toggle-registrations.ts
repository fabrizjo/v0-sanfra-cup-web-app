"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export type SportType = "calcio" | "volley"

export async function toggleRegistrations(sport: SportType) {
  const supabase = await createClient()

  // Check if user is authenticated
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { success: false, error: "Non autenticato" }
  }

  const settingKey = sport === "calcio" ? "registrations_open_calcio" : "registrations_open_volley"

  // Get current settings
  const { data: currentSettings, error: fetchError } = await supabase
    .from("tournament_settings")
    .select("setting_value")
    .eq("setting_key", settingKey)
    .single()

  if (fetchError) {
    // If setting doesn't exist, create it
    const { error: insertError } = await supabase
      .from("tournament_settings")
      .insert({ setting_key: settingKey, setting_value: true })

    if (insertError) {
      return { success: false, error: "Errore nella creazione delle impostazioni" }
    }

    revalidatePath("/")
    revalidatePath("/admin")
    return { success: true, registrationsOpen: true }
  }

  // Toggle the value
  const newValue = !currentSettings.setting_value

  const { error: updateError } = await supabase
    .from("tournament_settings")
    .update({ setting_value: newValue, updated_at: new Date().toISOString() })
    .eq("setting_key", settingKey)

  if (updateError) {
    return { success: false, error: "Errore nell'aggiornamento delle impostazioni" }
  }

  revalidatePath("/")
  revalidatePath("/admin")

  return { success: true, registrationsOpen: newValue }
}
