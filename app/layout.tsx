import type { Metadata } from 'next'
import { Fraunces, Space_Grotesk } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-sans',
})
const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
})

export const metadata: Metadata = {
  title: 'Digital Ecommerce',
  description: 'Digital asets store',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {

  return (
    <html lang='en'>
      <body
        className={cn(
          'bg-background min-h-screen font-sans antialiased',
          spaceGrotesk.variable,
          fraunces.variable,
        )}
      >
        {children}
      </body>

    </html>
  )
}
