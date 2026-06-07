'use client'
import { Label } from '@/components/ui/label'
import { EventSearch } from './search'
import { EventFilers } from './filters'
import { useGetCategories } from '@/api/hooks/useGetCategories'
import { CategoryGroup } from '../../categories/ui/category-group'
import { CategoryCard } from '../../categories/ui/category-card'
import { useEffect } from 'react'
import { LoadingPage } from '@/components/elements/loading-page'
import { Odds } from '../../odds/ui/odds'

export const Event = () => {
  const { data: categories, isLoading } = useGetCategories()

  if (isLoading || !categories) {
    return <LoadingPage />
  }

  return (
    <div className='flex flex-col gap-y-4'>
      <EventSearch />
      <EventFilers />
      <div className={'mt-4 w-full'}>
        <CategoryGroup
          categories={categories!}
          className='grid grid-cols-3 gap-4 w-full'
        />
      </div>
      <Odds />
    </div>
  )
}
