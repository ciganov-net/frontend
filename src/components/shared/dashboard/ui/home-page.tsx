'use client'
import { FreebetBanner } from '@/components/static/freebet-banner'
import { useGetCategories } from '@/api/hooks/useGetCategories'
import { CategoryGroup } from '../../categories/ui/category-group'
import { PopularOdds } from '../../odds/ui/popular-odds'
import { WorstPlayers } from './worst-players'
import { useEffect, useState } from 'react'
import { LoadingPage } from '@/components/elements/loading-page'

export const Dashboard = () => {
  const { data: categories, isLoading } = useGetCategories()

  const [count, setCount] = useState(4)

  useEffect(() => {
    const updateCount = () => {
      const width = window.innerWidth
      console.log(width)
      if (width < 768) {
        setCount(2)
      } else if (width < 1536) {
        setCount(3)
      } else {
        setCount(4)
      }
    }

    updateCount()

    window.addEventListener('resize', updateCount)

    return () => {
      window.removeEventListener('resize', updateCount)
    }
  }, [])

  if (isLoading || !categories) {
    return <LoadingPage />
  }
  return (
    <>
      <FreebetBanner />
      <div className={'mt-4 flex flex-row gap-x-4 w-full'}>
        <CategoryGroup
          header='Категории'
          categories={categories.slice(0, count)}
          className='grid grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-4 w-full'
        />
      </div>
      <PopularOdds />
      <WorstPlayers />
    </>
  )
}
