import { Header } from '@/components/layout/header/ui/header'
import { LayoutSiteContainer } from '@/components/layout/layout-site-container'
import { Sidebar } from '@/components/layout/sidebar/ui/sidebar'
import type { PropsWithChildren } from 'react'

export default function SiteLayout({ children }: PropsWithChildren) {
  return (
    <div className='flex min-h-screen flex-col'>
      <Sidebar />
      <LayoutSiteContainer>
        <Header />
        {children}
      </LayoutSiteContainer>
    </div>
  )
}
