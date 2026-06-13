'use client'
import type { Metadata } from 'next'
import { Geist, Geist_Mono, Inter } from 'next/font/google'
import '../styles/globals.css'
import { cn } from '@/libs/tw-merge'
import { SEO } from '@/constants/seo.constant'
import { APP_CONFIG } from '@/constants/app.constant'
import { TanstackProvider } from '@/providers/tanstack-provider'
import { Toaster } from '@/components/ui/sonner'
import { HealthCheckProvider } from '@/providers/healthcheck-provider'
import { WsProvider } from '@/providers/ws-provider'
import { useAuth } from '@/hooks/useAuth'

if (!APP_CONFIG.baseUrl) throw new Error('APP_CONFIG.baseUrl should be defined')

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: {
    absolute: SEO.name,
    template: `%s - ${SEO.name}`
  },
  description: SEO.description,
  metadataBase: new URL(APP_CONFIG.baseUrl),
  applicationName: SEO.name,
  keywords: SEO.keywords,
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico'
  },
  formatDetection: SEO.formatDetection
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const { isAuthenticated } = useAuth()
  return (
    <html
      lang='ru'
      className={cn(
        'h-full',
        'antialiased',
        'dark',
        geistSans.variable,
        geistMono.variable,
        'font-sans',
        inter.variable
      )}
    >
      <body className='min-h-full flex flex-col'>
        <TanstackProvider>
          <Toaster />
          {isAuthenticated && <WsProvider />}
          <HealthCheckProvider>{children}</HealthCheckProvider>
        </TanstackProvider>
      </body>
    </html>
  )
}
