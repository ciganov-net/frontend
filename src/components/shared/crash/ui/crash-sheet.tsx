'use client'

import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useCrash } from '@/contexts/crash-context'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'

export const CrashSheet = () => {
  const {
    betInput,
    setBetInput,
    useBonus,
    setUseBonus,
    gameState,
    crashControlRef
  } = useCrash()

  const handleStart = () => crashControlRef.current?.startGame?.()
  const handleCashOut = () => crashControlRef.current?.cashOut?.()

  return (
    <div className='flex flex-col gap-4 p-4'>
      <div className='space-y-2'>
        <Label>Сумма ставки (₽)</Label>
        <Input
          disabled={gameState !== 'IDLE'}
          value={betInput}
          onChange={e => setBetInput(e.target.value)}
        />
      </div>

      <div className='flex items-center gap-2'>
        <Checkbox
          disabled={gameState !== 'IDLE'}
          checked={useBonus}
          onCheckedChange={val => setUseBonus(val as boolean)}
        />
        <Label>Бонусы</Label>
      </div>

      {gameState === 'IDLE' && (
        <Button onClick={handleStart} className='w-full'>
          СТАРТ
        </Button>
      )}

      {gameState === 'RUNNING' && (
        <Button onClick={handleCashOut} variant='secondary' className='w-full'>
          ЗАБРАТЬ
        </Button>
      )}

      {(gameState === 'CRASHED' || gameState === 'CASHED_OUT') && (
        <Button
          onClick={() => window.location.reload()}
          variant='outline'
          className='w-full'
        >
          СНОВА
        </Button>
      )}
    </div>
  )
}
