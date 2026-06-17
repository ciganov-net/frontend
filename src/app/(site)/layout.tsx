'use client'
import { Header } from '@/components/layout/header/ui/header'
import { LayoutSiteContainer } from '@/components/layout/layout-site-container'
import { Sidebar } from '@/components/layout/sidebar/ui/sidebar'
import { useAuth } from '@/hooks/useAuth'
import { WsProvider } from '@/providers/ws-provider'
import type { PropsWithChildren } from 'react'

export default function SiteLayout({ children }: PropsWithChildren) {
  const { isAuthenticated } = useAuth()
  return (
    <div className='flex min-h-screen flex-col'>
      <Sidebar />
      <LayoutSiteContainer>
        <Header />
        {isAuthenticated && <WsProvider />}
        {children}
      </LayoutSiteContainer>
    </div>
  )
}
