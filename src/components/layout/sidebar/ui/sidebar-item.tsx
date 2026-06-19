'use client'
import { Button } from '@/components/ui/button'
import { cn } from '@/libs/tw-merge'
import { SidebarRoute } from '../model/sidebar-route.model'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'

interface Props {
  route: SidebarRoute
}

export function SidebarItem({ route }: Props) {
  const pathname = usePathname()
  const { isAuthenticated } = useAuth()
  if (
    !isAuthenticated &&
    (route.label === 'Профиль' || route.label === 'Мои ставки')
  )
    return
  const isActive = pathname.includes(route.href)
  return (
    <Link
      href={route.href}
      data-active={isActive}
      className={cn(
        'flex h-[102.86px] w-full flex-col items-center justify-center gap-3 rounded-[var(--radius-xs)] border border-transparent px-3 py-2',
        'text-[var(--neutral-0)] transition-all hover:border-[var(--brand-200)]',
        isActive && [
          'border-transparent text-[var(--brand-200)] hover:border-transparent'
        ]
      )}
    >
      <route.icon
        className={cn(
          'size-6 shrink-0',
          isActive && 'drop-shadow-[0_0_12px_rgba(228,189,78,0.5)]'
        )}
      />
      <span
        className={cn(
          'w-full text-center typo-xsmall',
          isActive && 'text-shadow-gold'
        )}
      >
        {route.label}
      </span>
    </Link>
  )
}
