"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { createBrowserClient } from "@supabase/ssr"
import { useRouter } from "next/navigation"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      )

      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (signInError) throw signInError

      router.push("/admin")
      router.refresh()
    } catch (err: any) {
      console.error("[v0] Login error:", err)
      setError("Email o password non corretti")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="border-2 border-yellow-500 bg-black/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-yellow-400">Accedi</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email" className="text-gray-300">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@sanfracup.com"
              required
              disabled={isLoading}
              className="bg-black/50 border-yellow-500/30 text-white placeholder:text-gray-500 focus:border-yellow-500"
            />
          </div>
          <div>
            <Label htmlFor="password" className="text-gray-300">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              disabled={isLoading}
              className="bg-black/50 border-yellow-500/30 text-white placeholder:text-gray-500 focus:border-yellow-500"
            />
          </div>

          {error && (
            <div className="bg-red-900/30 border border-red-500 text-red-300 px-4 py-3 rounded-lg text-sm">{error}</div>
          )}

          <Button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold"
            disabled={isLoading}
          >
            {isLoading ? "Accesso in corso..." : "Accedi"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
