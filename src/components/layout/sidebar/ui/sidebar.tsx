'use client'
import { cn } from '@/libs/tw-merge'
import { SidebarNavigation } from './sidebar-navigation'

export function Sidebar() {
  return (
    <aside
      className={cn(
        'fixed left-0 z-50 pt-5 flex h-full flex-col transition-all duration-100 ease-in-out w-40'
      )}
    >
      <SidebarNavigation />
    </aside>
  )
}
