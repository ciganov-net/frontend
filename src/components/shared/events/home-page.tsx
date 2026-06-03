'use client'
import { FreebetBanner } from '@/components/static/freebet-banner'
import { Card } from '@/components/ui/card'
import { Header } from '@/components/layout/header/ui/header'
import { useGetCategories } from '@/api/hooks/useGetCategories'
import { CategoryGroup } from '../categories/ui/category-group'
import { PopularOdds } from '../odds/ui/popular-odds'

export const EventsPage = () => {
  const { data: categories } = useGetCategories()
  return (
    <Card className='p-4'>
      <Header />
      <FreebetBanner />
      <div className={'flex flex-row gap-x-4 w-full'}>
        <CategoryGroup header='Категории' categories={categories ?? []} />
      </div>
      <PopularOdds />
    </Card>
  )
}
