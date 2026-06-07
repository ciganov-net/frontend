'use client'
import { EventResponse } from '@/api/generated'
import { useGetBetCount } from '@/api/hooks/useGetBetCount'
import { LoadingPage } from '@/components/elements/loading-page'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { BADGE_STYLE } from '@/constants/badge.constant'
import { useBet } from '@/hooks/useBet'
import { cn } from '@/libs/tw-merge'
import { calculateRemaining } from '@/libs/utils/calculate-remaining'
import { Clock, Dot } from 'lucide-react'

interface Props {
  event: EventResponse
  onSelectOutcome: (event: EventResponse, outcome: any) => void
}

export const OddCard = ({ event, onSelectOutcome }: Props) => {
  const { removeBet, bets } = useBet()
  const { data: count, isLoading } = useGetBetCount(event.id)
  if (!event || isLoading) return <LoadingPage />
  const currentBadgeStyle =
    BADGE_STYLE[event.badgeColor] || 'border-primary text-primary'
  return (
    <Card className='flex flex-row justify-between items-center p-6 gap-x-6 w-full'>
      <div className='flex flex-col items-start gap-y-3 flex-2 min-w-0'>
        <Badge
          variant='outline'
          className={cn(
            'text-xs bg-transparent rounded-lg px-2.5 py-0.5',
            currentBadgeStyle
          )}
        >
          {event.categoryTitle}
        </Badge>

        <Label className='text-lg font-medium text-left line-clamp-2 leading-snug'>
          {event.name}
        </Label>

        <div className='flex flex-row items-center gap-x-2 text-xs text-muted-foreground'>
          <Clock size={16} />
          <span>До закрытия: {calculateRemaining(event.start)}</span>
          <Dot className='-mx-2' />
          <span>{count?.count} Ставок</span>
        </div>
      </div>

      <div className='flex flex-row justify-end items-center gap-x-6 flex-1 shrink-0'>
        {event.outcomes?.map(outcome => {
          //@ts-ignore
          const isSelected = bets.some(b => b.outcomeId === outcome.id)

          return (
            <div
              //@ts-ignore
              key={outcome.id}
              className='flex flex-col items-center gap-y-2 min-w-12.5'
            >
              <span className='text-sm text-muted-foreground select-none'>
                {
                  //@ts-ignore
                  outcome.name
                }
              </span>

              <Button
                variant={isSelected ? 'default' : 'secondary'}
                size='sm'
                className='h-auto font-semibold font-mono px-3 py-1.5 text-base border border-transparent hover:border-border transition-all'
                onClick={() => {
                  if (isSelected) {
                    //@ts-ignore
                    removeBet(outcome.id)
                  } else {
                    onSelectOutcome?.(event, outcome)
                  }
                }}
              >
                {(
                  Math.round(
                    //@ts-ignore
                    outcome.coefficient * 100
                  ) / 100
                ).toFixed(1)}
              </Button>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
