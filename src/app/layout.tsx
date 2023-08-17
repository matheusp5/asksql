import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

export const metadata: Metadata = {
  title: 'askSQL',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <body className="h-screen w-screen bg-[#07061D]">
        <main>  
          {children}
        </main>
      </body>
    </html>
  )
}
