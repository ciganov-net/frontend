'use client'
import { useGetWorstPlayers } from '@/api/hooks/useGetWorstPlayers'
import { Label } from '@/components/ui/label'
import { PlayerCard } from './player-card'
import { useState } from 'react'

interface Props {
  className?: string
}

export const WorstPlayers = ({ className }: Props) => {
  const { data: worstPlayers } = useGetWorstPlayers(3)
  let place = 1
  return (
    <div className={className}>
      <Label className='text-lg font-bold'>Наши лучшие игроки</Label>
      <div className='flex flex-row gap-4 my-4 w-full'>
        {worstPlayers?.map(player => (
          <PlayerCard
            key={player.id}
            place={place++}
            avatar={player.avatar}
            name={player.displayName}
            successRate={player.successRate}
            loseAmount={player.loseAmount}
          />
        ))}
      </div>
    </div>
  )
}
