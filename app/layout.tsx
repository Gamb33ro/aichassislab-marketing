import type { Metadata, Viewport } from 'next'
import { Instrument_Serif, DM_Sans } from 'next/font/google'
import './globals.css'

const instrumentSerif = Instrument_Serif({
  weight: ['400'],
  variable: '--font-display',
  subsets: ['latin'],
  adjustFontFallback: true,
})

const dmSans = DM_Sans({
  weight: ['300', '400', '500', '600'],
  variable: '--font-body',
  subsets: ['latin'],
  adjustFontFallback: true,
})

const BASE_URL = 'https://aichassislab.com'

export const metadata: Metadata = {
  title: 'AIChassisLab — AI infrastructure for experts',
  description: 'Turn your expertise into a specialized AI your audience pays to use. Upload your content, configure your AI, launch to your students.',
  metadataBase: new URL(BASE_URL),
  alternates: { canonical: BASE_URL },
  openGraph: {
    title: 'AIChassisLab — AI infrastructure for experts',
    description: 'Turn your expertise into a specialized AI your audience pays to use.',
    url: BASE_URL,
    siteName: 'AIChassisLab',
    images: [{ url: '/og.png', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AIChassisLab — AI infrastructure for experts',
    description: 'Turn your expertise into a specialized AI your audience pays to use.',
    images: ['/og.png'],
  },
}

export const viewport: Viewport = {
  themeColor: '#0C0C0F',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${instrumentSerif.variable} ${dmSans.variable}`}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>{children}</body>
    </html>
  )
}
