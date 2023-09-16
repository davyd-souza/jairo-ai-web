// ASSET
import './globals.css'
import { Barlow, Syne } from 'next/font/google'

// TYPE
import type { Metadata } from 'next'

const barlow = Barlow({
  weight: ['400', '500'],
  subsets: ['latin'],
  variable: '--font-barlow',
})

const syne = Syne({
  weight: ['700', '800'],
  subsets: ['latin'],
  variable: '--font-syne',
})

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
      <body
        className={`${barlow.variable} ${syne.variable} bg-pale-yellow font-sans text-sm text-black md:text-base`}
      >
        {children}
      </body>
    </html>
  )
}
