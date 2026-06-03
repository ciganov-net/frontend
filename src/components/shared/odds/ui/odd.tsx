import { EventResponse } from '@/api/generated'
import { Badge } from '@/components/ui/badge'
import { Card, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'

interface Props {
  event: EventResponse
  category: string
}

export const Odd = ({ event, category }: Props) => {
  return (
    <div className='flex flex-row justify-between gap-x-4 w-full'>
      <Card>
        <CardTitle className='flex flex-col items-center gap-y-2'>
          <Badge variant={'secondary'}>{category}</Badge>
          <Label>{event.name}</Label>
          <Label className='text-sm'>
            {new Date(event.start).toLocaleString()}
          </Label>
        </CardTitle>
      </Card>
      <Card className='flex flex-row gap-4 w-full'>
        {event.outcomes.map(outcome => (
          <div className='flex flex-col items-center gap-y-2'>
            <Label key={outcome.id}>{outcome.name}</Label>
            <Label className='text-sm'>{outcome.coefficient}</Label>
          </div>
        ))}
      </Card>
    </div>
  )
}
