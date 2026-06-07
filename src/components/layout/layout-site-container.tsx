'use client'
import { cn } from '@/libs/tw-merge'
import { usePathname } from 'next/navigation'
import { PropsWithChildren } from 'react'
import { BetSheet } from '../shared/odds/ui/bet-sheet'

export const LayoutSiteContainer: React.FC<PropsWithChildren<unknown>> = ({
  children
}) => {
  const pathname = usePathname()
  if (pathname.includes('dashboard') || pathname.includes('events')) {
    return (
      <div className='flex gap-4'>
        <main className='mt-5 ml-40 flex-1 p-4 bg-card rounded-3xl'>
          {children}
        </main>

        <aside className='w-80 mt-5 pt-4 mr-4'>
          <BetSheet />
        </aside>
      </div>
    )
  }

  return (
    <main className='mt-5 ml-40 flex-1 p-4 mr-4 bg-card rounded-3xl'>
      {children}
    </main>
  )
}
