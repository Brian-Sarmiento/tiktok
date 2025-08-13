import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'TikTok Popular Auto-Scroller',
  description: 'Auto-scroll feed of the most popular TikTok videos for any account.'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
