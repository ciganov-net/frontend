'use client'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useBet } from '@/hooks/useBet'
import { Banknote, Trash } from 'lucide-react'

interface Props {
  title: string
  outcome: string
  outcomeId: string
  coefficient: number
}

export const BetCard = ({ coefficient, outcome, title, outcomeId }: Props) => {
  const { removeBet, updateAmount } = useBet()

  //TODO: проверка на value нужна < 0
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value)
    const safeValue = isNaN(value) ? 0 : value
    updateAmount(outcomeId, safeValue)
  }

  return (
    <Card className='flex-1 w-full p-4'>
      <CardTitle className='flex flex-row gap-x-4 justify-between items-center'>
        <Label className='text-lg'>{title}</Label>
        <Button
          size={'medium'}
          variant={'outline'}
          onClick={() => removeBet(outcomeId)}
        >
          <Trash />
        </Button>
      </CardTitle>
      <CardDescription className='-mt-4 flex flex-col gap-y-4'>
        <Label>Ваш выбор</Label>
        <div className='flex items-center justify-between text-secondary-foreground'>
          <span className='text-lg font-semibold'>{outcome}</span>

          <span className='text-lg font-semibold'>
            {coefficient.toFixed(2)}
          </span>
        </div>

        <div className='relative'>
          <Banknote className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />

          <Input
            placeholder='Сумма ставки'
            type='number'
            className='pl-10 pr-10 rounded-md'
            onChange={handleAmountChange}
          />

          <span className='absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground'>
            ₽
          </span>
        </div>
      </CardDescription>
    </Card>
  )
}
