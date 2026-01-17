import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Приглашение на свадьбу',
  description: 'Свадебное приглашение',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  )
}
