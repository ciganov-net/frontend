'use client'
import { FreebetBanner } from '@/components/static/freebet-banner'
import { Card } from '@/components/ui/card'
import { Header } from '@/components/layout/header/ui/header'
import { useGetCategories } from '@/api/hooks/useGetCategories'
import { CategoryGroup } from '../../categories/ui/category-group'
import { PopularOdds } from '../../odds/ui/popular-odds'
import { WorstPlayers } from './worst-players'
import { BetSheet } from '../../odds/ui/bet-sheet'

export const Dashboard = () => {
  const { data: categories } = useGetCategories()
  return (
    <>
      <>
        <FreebetBanner />
        <div className={'mt-4 flex flex-row gap-x-4 w-full'}>
          <CategoryGroup header='Категории' categories={categories ?? []} />
        </div>
        <PopularOdds />
        <WorstPlayers />
      </>
    </>
  )
}
