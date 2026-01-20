import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { getRegistrationsStatus } from "@/lib/registrations"
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
  console.log("[v0] AdminPage: Starting render")

  const user = await getUser()
  console.log("[v0] AdminPage: User check complete", user ? "authenticated" : "not authenticated")

  if (!user) {
    console.log("[v0] AdminPage: No user, redirecting to login")
    redirect("/admin/login")
  }

  const [teams, registrationsOpen] = await Promise.all([getTeamsWithPlayers(), getRegistrationsStatus()])

  console.log("[v0] AdminPage: Loaded teams count:", teams.length, "registrations open:", registrationsOpen)

  return (
    <div className="min-h-screen bg-black relative">
      <div className="fixed inset-0 z-0 opacity-10">
        <Image src="/images/sanfra-logo.png" alt="SanfraCup Logo" fill className="object-contain" priority />
      </div>

      <div className="relative z-10">
        <header className="border-b border-yellow-500/30 bg-black/90 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bebas text-yellow-400 tracking-wider">SANFRACUP ADMIN</h1>
              <p className="text-sm text-gray-400">{user.email}</p>
            </div>
            <LogoutButton />
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          <AdminDashboard teams={teams} registrationsOpen={registrationsOpen} />
        </div>
      </div>
    </div>
  )
}
