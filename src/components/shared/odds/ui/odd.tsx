import { EventResponse } from '@/api/generated'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'

interface Props {
  event: EventResponse
  category: string
  onSelectOutcome: (event: EventResponse, outcome: any) => void
}

export const Odd = ({ event, category, onSelectOutcome }: Props) => {
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

        <div className='flex items-center gap-x-2 text-sm text-muted-foreground'>
          <span>До закрытия: {new Date(event.start).toLocaleString()}</span>
        </div>
      </div>

      <div className='flex flex-row justify-end items-center gap-x-6 flex-1 shrink-0'>
        {event.outcomes.map(outcome => (
          // орвал хуево генерить подтипы, так что на эти ошибки можно хуй забить
          <div
            key={outcome.id}
            className='flex flex-col items-center gap-y-2 min-w-12.5'
          >
            <span className='text-sm text-muted-foreground select-none'>
              {outcome.name}
            </span>

            <Button
              variant='secondary'
              size='sm'
              className='h-auto font-semibold font-mono px-3 py-1.5 text-base border border-transparent hover:border-border transition-all'
              onClick={() => onSelectOutcome?.(event, outcome)}
            >
              {(Math.round(outcome.coefficient * 100) / 100).toFixed(1)}
            </Button>
          </div>
        ))}
      </div>
    </Card>
  )
}
