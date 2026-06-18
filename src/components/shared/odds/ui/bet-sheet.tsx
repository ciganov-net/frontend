'use client'

import { Label } from '@/components/ui/label'
import { BetCard } from './bet-card'
import { Button } from '@/components/ui/button'
import { useBet } from '@/hooks/useBet'
import { usePlaceBet } from '@/api/hooks/usePlaceBet'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

export const BetSheet = () => {
  const router = useRouter()
  const { bets, clear } = useBet()
  const { mutate, isPending } = usePlaceBet({
    onSuccess: () => {
      toast.success('Ставки успешно приняты!')
      clear()
      router.push('/bets')
    },
    onError: () => {
      toast.error(
        'При ставке произошла ошибка, возможно коэффициенты поменялись'
      )
      clear()
      router.refresh()
    }
  })

  const handleBet = async () => {
    if (bets.length === 0) return
    try {
      await Promise.all(
        bets.map(bet =>
          mutate({
            amount: bet.amount,
            coefficient: bet.coefficient,
            outcomeId: bet.outcomeId
          })
        )
      )
    } catch (e) {
      console.log(e)
      toast.error('Произошла ошибка при ставке')
    }
  }

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

        <Button
          className='w-full'
          onClick={handleBet}
          disabled={isPending || bets.length === 0}
        >
          {isPending ? 'Обработка...' : 'Разместить ставку'}
        </Button>
      </div>
    </div>
  )
}
