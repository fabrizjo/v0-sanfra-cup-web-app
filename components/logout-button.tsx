"use client"

import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { createBrowserClient } from "@supabase/ssr"
import { useRouter } from "next/navigation"
import { useState } from "react"

export function LogoutButton() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleLogout = async () => {
    setIsLoading(true)
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    )

    const { error } = await supabase.auth.signOut()

    if (error) {
      console.error("[v0] Logout error:", error)
      setIsLoading(false)
      return
    }

    router.push("/admin/login")
    router.refresh()
  }

  return (
    <Button
      variant="outline"
      onClick={handleLogout}
      disabled={isLoading}
      className="border-yellow-500 text-yellow-400 hover:bg-yellow-500 hover:text-black bg-transparent"
    >
      <LogOut className="h-4 w-4 mr-2" />
      {isLoading ? "Disconnessione..." : "Esci"}
    </Button>
  )
}
