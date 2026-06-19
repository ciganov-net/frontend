'use client'
import { cn } from '@/libs/tw-merge'
import { SidebarNavigation } from './sidebar-navigation'

export function Sidebar() {
  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-50 flex h-screen w-[148px] flex-col',
        'bg-[rgba(8,9,11,0.8)] px-6 py-8 backdrop-blur',
        'transition-all duration-100 ease-in-out'
      )}
    >
      <SidebarNavigation />
    </aside>
  )
}
