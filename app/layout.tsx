import type React from "react"
import type { Metadata } from "next"
import { JetBrains_Mono } from "next/font/google"
import "./globals.css"

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
})

export const metadata: Metadata = {
  title: "คู่มือเดินทางไปทิเบต | Tibet Travel Guide from Thailand",
  description: "คู่มือครบครันสำหรับการเดินทางจากไทยไปทิเบต พร้อมแผนที่ 3D, ข้อมูลเส้นทาง, และการคำนวณค่าใช้จ่าย",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="th" className={`${jetbrainsMono.variable} antialiased`}>
      <body className="font-mono">{children}</body>
    </html>
  )
}
