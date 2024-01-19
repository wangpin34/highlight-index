import { Theme } from '@radix-ui/themes'
import '@radix-ui/themes/styles.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Theme Hub',
  description: 'Find code themes with smart',
  icons: [{ rel: 'apple-touch-icon', url: '/Icon-180.png' }],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Theme Hub" />
        <meta name="twitter:description" content="Find code themes with smart" />
        <meta name="twitter:image" content="https://highlight-index.vercel.app/Theme_Hub-logos.jpeg" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
      </head>
      <body>
        <Theme>
          <div className="mt-16">{children}</div>
        </Theme>
      </body>
    </html>
  )
}
