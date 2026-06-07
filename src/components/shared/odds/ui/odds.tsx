'use client'
import { OddCard } from './odd-card'
import { useBet } from '@/hooks/useBet'
import { useGetEvents } from '@/api/hooks/useGetEvents'
import { LoadingPage } from '@/components/elements/loading-page'

interface Props {
  className?: string
}

export const Odds = ({ className }: Props) => {
  const { data: events, isLoading } = useGetEvents()
  const { addBet } = useBet()

  if (isLoading) return <LoadingPage />
  return (
    <div className={className}>
      <div className='flex flex-col gap-4 my-4 w-full'>
        {events?.map(event => (
          <OddCard
            key={event.id}
            event={event}
            category={event.categoryId}
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
