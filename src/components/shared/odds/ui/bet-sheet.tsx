'use client'

import { Label } from '@/components/ui/label'
import { BetCard } from './bet-card'
import { Button } from '@/components/ui/button'
import { useBet } from '@/hooks/useBet'

export const BetSheet = () => {
  const { bets } = useBet()
  const total = bets.reduce((sum, current) => sum + current.amount, 0)
  return (
    <div className='flex flex-col gap-4'>
      <Label className='text-xl font-semibold'>Мои ставки</Label>

      {bets.map((bet, index) => (
        <BetCard
          key={index}
          coefficient={bet.coefficient}
          outcome={bet.outcomeTitle}
          title={bet.title}
          outcomeId={bet.outcomeId}
        />
      ))}

      <div className='mt-auto flex flex-col gap-2'>
        <Label className='text-center justify-between px-4'>
          <p>Сумма ставок</p>
          <p>{total} ₽</p>
        </Label>

        <Button className='w-full'>Проебать деньги</Button>
      </div>
    </div>
  )
}
