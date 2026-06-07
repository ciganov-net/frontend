import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { cn } from '@/libs/tw-merge'

interface Props {
  place: number
  avatar: string
  name: string
  successRate: number
  loseAmount: number
}

export const PlayerCard = ({
  place,
  avatar,
  name,
  loseAmount,
  successRate
}: Props) => {
  const formattedLoseAmount = new Intl.NumberFormat('ru-RU').format(loseAmount)

  return (
    <Card
      className={cn(
        'w-full border rounded-[32px] p-6 text-center shadow-lg',
        place === 1
          ? 'border-primary'
          : place === 2
            ? 'border-muted-foreground'
            : 'border-primary-foreground'
      )}
    >
      <CardContent className='p-0 flex flex-col items-center'>
        <div className='relative mb-4'>
          <Avatar
            className={cn(
              'w-24 h-24 border-2 p-0.5',
              place === 1
                ? 'border-primary/40'
                : place === 2
                  ? 'border-muted-foreground/40'
                  : 'border-primary-foreground/40'
            )}
          >
            <AvatarImage
              src={avatar || '/ciganov-mac-avatar.png'}
              alt={name}
              className='rounded-full object-cover'
            />
            <AvatarFallback className='text-xl font-bold'>
              {name?.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div
            className={cn(
              'absolute bottom-0 right-0 w-8 h-8 rounded-full text-secondary font-bold text-sm flex items-center justify-center border shadow-md select-none',
              place === 1
                ? 'bg-primary'
                : place === 2
                  ? 'bg-muted-foreground'
                  : 'bg-primary-foreground'
            )}
          >
            {place}
          </div>
        </div>

        <Label className='text-2xl font-bold mb-6 tracking-wide line-clamp-1'>
          {name}
        </Label>

        <div className='w-full space-y-3'>
          <div className='flex items-center justify-between'>
            <span className='text-sm text-muted-foreground'>Проиграл</span>

            <span className='text-lg font-semibold'>
              {formattedLoseAmount} ₽
            </span>
          </div>

          <div className='flex items-center justify-between border-t pt-3'>
            <span className='text-sm text-muted-foreground'>Процент побед</span>

            <span className='text-lg font-semibold'>{successRate}%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
