import type React from "react"
import type { Metadata } from "next"
import { Archivo, Plus_Jakarta_Sans, Kanit } from "next/font/google"

import "./globals.css"
import { Toaster } from "@/shared/ui/shad/sonner"

const kanit = Kanit({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-kanit",
})

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
})

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
})

export const metadata: Metadata = {
  title: "Allstar Sports Apparel | Elite Performance Gear",
  description: "View the latest in elite performance sports jerseys and apparel from Allstar. Quality sports gear for every athlete.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${archivo.variable} ${plusJakartaSans.variable} ${kanit.variable} font-sans antialiased`}>

        {children}
        <Toaster />


      </body>
    </html>
  )
}
