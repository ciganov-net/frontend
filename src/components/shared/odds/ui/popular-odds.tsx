import { useGetRandomEvents } from '@/api/hooks/useGetRandomEvents'
import { Label } from '@/components/ui/label'
import { Odd } from './odd'

interface Props {
  className?: string
}

export const PopularOdds = ({ className }: Props) => {
  const { data: events } = useGetRandomEvents(10)
  return (
    <div className={className}>
      <Label className='text-xl font-bold'>Популярное сегодня</Label>
      <div className='flex flex-row gap-x-4 w-full'>
        {events?.map(event => (
          <Odd key={event.id} event={event} category={event.categoryId} />
        ))}
      </div>
    </div>
  )
}
