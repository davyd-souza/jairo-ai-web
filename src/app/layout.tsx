// ASSET
import './globals.css'
import { Inter } from 'next/font/google'

// TYPE
import type { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Jairo AI',
  description:
    'Experience the power of artificial intelligence on our platform, where it transforms videos into valuable textual content. Let our AI intelligently generate descriptions, ideas, and titles, providing an innovative way to maximize the potential of your videos.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-zinc-900 text-zinc-50`}>
        {children}
      </body>
    </html>
  )
}
