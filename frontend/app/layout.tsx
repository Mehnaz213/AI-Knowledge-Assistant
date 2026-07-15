// Import Vercel Analytics (enabled only in production)
import { Analytics } from '@vercel/analytics/next'

// Import Next.js metadata types
import type { Metadata, Viewport } from 'next'

// Import global styles
import './globals.css'

// Import Theme and Authentication providers
import { ThemeProvider } from '@/lib/theme-context'
import { AuthProvider } from '@/lib/auth-context'

// Website metadata
export const metadata: Metadata = {
  title: 'RAGent AI',
  description:
    'Enterprise Knowledge Assistant powered by Retrieval-Augmented Generation (RAG), semantic search, vector embeddings and intelligent document retrieval.',

  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],

    apple: '/apple-icon.png',
  },
}

// Browser theme colors
export const viewport: Viewport = {
  colorScheme: 'dark light',

  themeColor: [
    {
      media: '(prefers-color-scheme: dark)',
      color: '#0A1628',
    },
    {
      media: '(prefers-color-scheme: light)',
      color: '#FFFFFF',
    },
  ],
}

// Root Layout
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {

  return (

    <html lang="en">

      <body className="bg-background text-foreground antialiased page-fade">

        {/* Theme Provider */}
        <ThemeProvider>

          {/* Authentication Provider */}
          <AuthProvider>

            {/* Render all pages */}
            {children}

            {/* Enable Vercel Analytics only after deployment */}
            {process.env.NODE_ENV === 'production' && <Analytics />}

          </AuthProvider>

        </ThemeProvider>

      </body>

    </html>

  )
}