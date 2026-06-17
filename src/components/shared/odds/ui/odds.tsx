'use client'
import { OddCard } from './odd-card'
import { useBet } from '@/hooks/useBet'
import { EventResponse } from '@/api/generated'

interface Props {
  events: EventResponse[]
  className?: string
}

export const Odds = ({ className, events }: Props) => {
  const { addBet } = useBet()
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
