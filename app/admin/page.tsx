import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { getBothRegistrationsStatus } from "@/lib/registrations"
import { AdminDashboard } from "@/components/admin-dashboard"
import { LogoutButton } from "@/components/logout-button"
import Image from "next/image"

async function getUser() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  return user
}

async function getTeamsWithPlayers() {
  const supabase = await createClient()

  const { data: teams, error } = await supabase
    .from("teams")
    .select(`
      id,
      name,
      contact_email,
      contact_phone,
      created_at,
      sport,
      players (
        id,
        name,
        jersey_number
      )
    `)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("[v0] Error fetching teams:", error)
    return []
  }

  return teams || []
}

export default async function AdminPage() {
  const user = await getUser()

  if (!user) {
    redirect("/admin/login")
  }

  const [teams, registrationsStatus] = await Promise.all([getTeamsWithPlayers(), getBothRegistrationsStatus()])

  return (
    <div className="min-h-screen bg-black relative">
      <div className="fixed inset-0 z-0 opacity-10">
        <Image src="/images/sanfra-logo.png" alt="Sanfra Cup Logo" fill className="object-contain" priority />
      </div>

      <div className="relative z-10">
        <header className="border-b border-yellow-500/30 bg-black/90 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bebas tracking-wider"><span className="text-white">SANFRA</span>{' '}<span className="text-yellow-400">CUP</span> <span className="text-yellow-400">ADMIN</span></h1>
              <p className="text-sm text-gray-400">{user.email}</p>
            </div>
            <LogoutButton />
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          <AdminDashboard 
            teams={teams} 
            calcioRegistrationsOpen={registrationsStatus.calcio} 
            volleyRegistrationsOpen={registrationsStatus.volley} 
          />
        </div>
      </div>
    </div>
  )
}
