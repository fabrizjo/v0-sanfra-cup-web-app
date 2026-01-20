import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

export async function proxy(request: NextRequest) {
  console.log("[v0] Proxy: Processing request for", request.nextUrl.pathname)

  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options))
        },
      },
    },
  )

  // Refresh session if expired
  const {
    data: { user },
  } = await supabase.auth.getUser()

  console.log("[v0] Proxy: User authenticated:", !!user)

  const pathname = request.nextUrl.pathname

  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    // Allow access to login page
    if (pathname === "/admin/login") {
      // If already logged in, redirect to admin dashboard
      if (user) {
        console.log("[v0] Proxy: User logged in, redirecting from login to admin")
        const url = request.nextUrl.clone()
        url.pathname = "/admin"
        return NextResponse.redirect(url)
      }
      // Not logged in, allow access to login page
      return supabaseResponse
    }

    // For all other admin routes, require authentication
    if (!user) {
      console.log("[v0] Proxy: No user on protected route, redirecting to login")
      const url = request.nextUrl.clone()
      url.pathname = "/admin/login"
      return NextResponse.redirect(url)
    }
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
