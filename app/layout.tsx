import type React from "react"
import type { Metadata } from "next"
import { Bebas_Neue, Rajdhani } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
})

const rajdhani = Rajdhani({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-rajdhani",
})

export const metadata: Metadata = {
  title: "Sanfra Cup - I tuoi eventi sportivi a Salerno",
  description: "Il torneo più famoso di Salerno. Registra la tua squadra e partecipa alla Sanfra Cup!",
  icons: {
    icon: [
      { url: "/images/sanfra-logo.png", sizes: "32x32", type: "image/png" },
      { url: "/images/sanfra-logo.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/images/sanfra-logo.png",
    shortcut: "/images/sanfra-logo.png",
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "Sanfra Cup - I tuoi eventi sportivi a Salerno",
    description: "Il torneo più famoso di Salerno. Registra la tua squadra e partecipa alla Sanfra Cup!",
    images: ["/images/sanfra-logo.png"],
    siteName: "Sanfra Cup",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="it" className={`${bebasNeue.variable} ${rajdhani.variable}`}>
      <head>
        <link rel="icon" href="/images/sanfra-logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/images/sanfra-logo.png" />
        <link rel="preload" href="/fonts/Spacema-Bold.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Teko:wght@700&display=swap" rel="stylesheet" />
      </head>
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
