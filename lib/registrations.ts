import { createClient } from "@/lib/supabase/server"

export async function getRegistrationsStatus() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("tournament_settings")
    .select("setting_value")
    .eq("setting_key", "registrations_open")
    .single()

  if (error || !data) {
    return false
  }

  return data.setting_value
}
