import { AdminNavigationHeader } from '@/components/layout/admin/navbar'
import { LayoutAdminContainer } from '@/components/layout/layout-admin-container'
import type { PropsWithChildren } from 'react'

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className={'flex h-full flex-col p-8'}>
      <div className={'flex-1'}>
        <div className={'inset-y-0 z-40 h-[50px] w-full'}>
          <AdminNavigationHeader />
        </div>
        <LayoutAdminContainer>{children}</LayoutAdminContainer>
      </div>
    </div>
  )
}
