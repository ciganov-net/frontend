'use client'
import { EventResponse } from '@/api/generated'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { useBet } from '@/hooks/useBet'
import { calculateRemaining } from '@/libs/utils/calculate-remaining'
import { Clock } from 'lucide-react'

interface Props {
  event: EventResponse
  category: string
  onSelectOutcome: (event: EventResponse, outcome: any) => void
}

export const OddCard = ({ event, category, onSelectOutcome }: Props) => {
  const { removeBet, bets } = useBet()
  return (
    <Card className='flex flex-row justify-between items-center p-6 gap-x-6 w-full'>
      <div className='flex flex-col items-start gap-y-3 flex-2 min-w-0'>
        <Badge
          variant='outline'
          className='text-xs border-primary text-primary bg-transparent rounded-lg px-2.5 py-0.5'
        >
          {category}
        </Badge>

        <Label className='text-lg font-medium text-left line-clamp-2 leading-snug'>
          {event.name}
        </Label>

        <div className='flex flex-row items-center gap-x-2 text-sm text-muted-foreground'>
          <Clock size={16} />
          <span>До закрытия: {calculateRemaining(event.start)}</span>
        </div>
      </div>

      <div className='flex flex-row justify-end items-center gap-x-6 flex-1 shrink-0'>
        {event.outcomes?.map(outcome => {
          const isSelected = bets.some(b => b.outcomeId === outcome.id)

          return (
            <div
              key={outcome.id}
              className='flex flex-col items-center gap-y-2 min-w-12.5'
            >
              <span className='text-sm text-muted-foreground select-none'>
                {outcome.name}
              </span>

              <Button
                variant={isSelected ? 'default' : 'secondary'}
                size='sm'
                className='h-auto font-semibold font-mono px-3 py-1.5 text-base border border-transparent hover:border-border transition-all'
                onClick={() => {
                  if (isSelected) {
                    removeBet(outcome.id)
                  } else {
                    onSelectOutcome?.(event, outcome)
                  }
                }}
              >
                {(Math.round(outcome.coefficient * 100) / 100).toFixed(1)}
              </Button>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
