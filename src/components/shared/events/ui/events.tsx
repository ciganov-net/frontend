'use client'
import { EventSearch } from './search'
import { EventFilers, SelectedFilters } from './filters'
import { useGetCategories } from '@/api/hooks/useGetCategories'
import { CategoryGroup } from '../../categories/ui/category-group'
import { useState } from 'react'
import { LoadingPage } from '@/components/elements/loading-page'
import { OddsControllerGetEventsOrderBy } from '@/api/generated'
import { OddsWithFilters } from '../../odds/ui/odd-filter'

export const Event = () => {
  const { data: categories, isLoading } = useGetCategories()

  const [search, setSearch] = useState('')
  const [sort, setSort] = useState<OddsControllerGetEventsOrderBy>(
    OddsControllerGetEventsOrderBy.NEWEST
  )
  const [filters, setFilters] = useState<SelectedFilters>({
    outcomeTypes: [],
    minCoefficient: undefined,
    maxCoefficient: undefined
  })

  if (isLoading || !categories) {
    return <LoadingPage />
  }

  return (
    <div className='flex flex-col gap-y-4'>
      <EventSearch value={search} onChange={setSearch} />
      <EventFilers
        orderBy={sort}
        onSortChange={setSort}
        currentFilters={filters}
        onApplyFilters={setFilters}
      />
      <div className={'mt-4 w-full'}>
        <CategoryGroup
          categories={categories!}
          className='grid grid-cols-3 gap-4 w-full'
        />
      </div>
      <OddsWithFilters search={search} sortBy={sort} filters={filters} />
    </div>
  )
}
