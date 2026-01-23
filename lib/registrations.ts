import { createClient } from "@/lib/supabase/server"

export type SportType = "calcio" | "volley"

export async function getRegistrationsStatus(sport: SportType = "calcio") {
  const supabase = await createClient()
  
  const settingKey = sport === "calcio" ? "registrations_open_calcio" : "registrations_open_volley"

  const { data, error } = await supabase
    .from("tournament_settings")
    .select("setting_value")
    .eq("setting_key", settingKey)
    .single()

  if (error || !data) {
    // Fallback to old setting key for backwards compatibility
    const { data: fallbackData } = await supabase
      .from("tournament_settings")
      .select("setting_value")
      .eq("setting_key", "registrations_open")
      .single()
    
    return fallbackData?.setting_value ?? false
  }

  return data.setting_value
}

export async function getBothRegistrationsStatus() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("tournament_settings")
    .select("setting_key, setting_value")
    .in("setting_key", ["registrations_open_calcio", "registrations_open_volley", "registrations_open"])

  if (error || !data) {
    return { calcio: false, volley: false }
  }

  // Check for new keys first, fallback to old key
  const calcioSetting = data.find(d => d.setting_key === "registrations_open_calcio")
  const volleySetting = data.find(d => d.setting_key === "registrations_open_volley")
  const oldSetting = data.find(d => d.setting_key === "registrations_open")

  return {
    calcio: calcioSetting?.setting_value ?? oldSetting?.setting_value ?? false,
    volley: volleySetting?.setting_value ?? false
  }
}
