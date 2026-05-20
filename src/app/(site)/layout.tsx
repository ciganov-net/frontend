import { LayoutSiteContainer } from '@/components/layout/layout-site-container'
import { Sidebar } from '@/components/layout/sidebar/ui/sidebar'
import type { ReactNode } from 'react'

interface SiteLayoutProps {
  children: ReactNode
}

export default function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <div className='flex min-h-screen flex-col'>
      {/* <div className='fixed inset-y-0 z-50 h-18.75 w-full'>
        <Header />
      </div> */}
      <Sidebar />
      <LayoutSiteContainer>{children}</LayoutSiteContainer>
      {/* <Footer /> */}
    </div>
  )
}
