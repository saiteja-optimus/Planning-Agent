import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'CTE — Cinematic Thinking Engine',
  description: 'Think before you generate. From raw idea to production-ready visual direction.',
  keywords: ['visual storytelling', 'story planning', 'creative direction', 'cinematic'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-noir-950 text-ivory antialiased">{children}</body>
    </html>
  )
}
