'use client'
import { Button } from '@/components/ui/button'
import { cn } from '@/libs/tw-merge'
import { SidebarRoute } from '../model/sidebar-route.model'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface Props {
  route: SidebarRoute
}

export function SidebarItem({ route }: Props) {
  const pathname = usePathname()
  const isActive = pathname.includes(route.href)
  return (
    <Button
      className={cn('h-16 w-full relative', isActive && 'text-sidebar-primary')}
      variant={'ghost'}
      asChild
    >
      <Link href={route.href} className={'flex flex-col items-center mb-5'}>
        <route.icon className={'mb-0 size-6'} />
        {route.label}
      </Link>
    </Button>
  )
}
