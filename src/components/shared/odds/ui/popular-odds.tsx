'use client'
import { useGetRandomEvents } from '@/api/hooks/useGetRandomEvents'
import { Label } from '@/components/ui/label'
import { OddCard } from './odd-card'
import { useBet } from '@/hooks/useBet'

interface Props {
  className?: string
}

export const PopularOdds = ({ className }: Props) => {
  const { data: events } = useGetRandomEvents(5)
  const { addBet } = useBet()
  return (
    <div className={className}>
      <Label className='text-lg font-bold'>Популярное сегодня</Label>
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
