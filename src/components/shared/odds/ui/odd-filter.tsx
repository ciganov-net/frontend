'use client'
import { OddCard } from './odd-card'
import { useBet } from '@/hooks/useBet'
import { useGetEvents } from '@/api/hooks/useGetEvents'
import { LoadingPage } from '@/components/elements/loading-page'
import { OddsControllerGetEventsOrderBy } from '@/api/generated'
import { useEffect } from 'react'
import { SelectedFilters } from '../../events/ui/filters'

interface Props {
  search?: string
  sortBy?: OddsControllerGetEventsOrderBy
  filters?: SelectedFilters
  className?: string
}

export const OddsWithFilters = ({
  className,
  search,
  sortBy,
  filters
}: Props) => {
  const { data: events, isLoading } = useGetEvents({
    search,
    orderBy: sortBy,
    ...(filters?.outcomeTypes && {
      outcomeTypes: filters.outcomeTypes
    }),
    ...(filters?.minCoefficient !== undefined && {
      minCoefficient: filters.minCoefficient
    }),
    ...(filters?.maxCoefficient !== undefined && {
      maxCoefficient: filters.maxCoefficient
    })
  })
  const { addBet } = useBet()

  if (isLoading) return <LoadingPage />
  return (
    <div className={className}>
      <div className='flex flex-col gap-4 my-4 w-full'>
        {events?.map(event => (
          <OddCard
            key={event.id}
            event={event}
            onSelectOutcome={(selectedEvent, outcome) => {
              addBet({
                title: selectedEvent.name,
                outcomeId: outcome.id,
                outcomeTitle: outcome.name,
                coefficient: outcome.coefficient,
                amount: 0
              })
            }}
          />
        ))}
      </div>
    </div>
  )
}
