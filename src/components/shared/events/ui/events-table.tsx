'use client'

import { useFinishBet } from '@/api/hooks/useFInishBet'
import { useGetEvents } from '@/api/hooks/useGetEvents'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useState } from 'react'

export const EventsAdminPage = () => {
  const { data: events } = useGetEvents({ orderBy: 'NEWEST' })
  const { mutate: resolveBet } = useFinishBet()

  const [winners, setWinners] = useState<Record<string, string>>({})

  const handleSelectWinner = (eventId: string, outcomeId: string) => {
    setWinners(prev => ({ ...prev, [eventId]: outcomeId }))
  }

  const handleFinishEvent = (eventId: string) => {
    const winnerOutcomeId = winners[eventId]

    if (!winnerOutcomeId) {
      alert('Выберите победивший исход')
      return
    }

    resolveBet({
      eventId,
      winningOutcomes: [winnerOutcomeId],
      status: 'FINISHED'
    })
  }

  return (
    <div className='container py-6 space-y-6 w-full'>
      <h1 className='text-2xl font-bold'>Управление событиями</h1>

      <div className='space-y-4'>
        {events?.map(event => (
          <Card key={event.id} className='border hover:shadow-md transition'>
            <CardHeader>
              <div className='flex justify-between items-center'>
                <CardTitle>{event.name}</CardTitle>
                <div className='flex gap-2 items-center'>
                  <Badge variant='outline'>{event.categoryTitle}</Badge>
                  <Badge variant='secondary'>
                    {event.status === 1 ? 'ACTIVE' : 'FINISHED'}
                  </Badge>
                </div>
              </div>
            </CardHeader>

            <CardContent className='space-y-4'>
              <div className='text-sm text-muted-foreground'>
                <p>Начало: {new Date(event.start).toLocaleString()}</p>
                <p>Конец: {new Date(event.end).toLocaleString()}</p>
              </div>

              {event.outcomes?.length ? (
                <RadioGroup
                  value={winners[event.id]}
                  onValueChange={value => handleSelectWinner(event.id, value)}
                >
                  <div className='space-y-2'>
                    {event.outcomes.map(outcome => (
                      <div
                        key={outcome.id}
                        className='flex items-center justify-between rounded-md border p-3'
                      >
                        <div className='flex items-center gap-3'>
                          <RadioGroupItem value={outcome.id} id={outcome.id} />
                          <Label htmlFor={outcome.id}>{outcome.name}</Label>
                        </div>
                        <Badge variant='outline'>x{outcome.coefficient}</Badge>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              ) : (
                <p className='text-sm text-muted-foreground'>
                  Исходы отсутствуют
                </p>
              )}

              <Button
                className='w-full'
                onClick={() => handleFinishEvent(event.id)}
                disabled={!winners[event.id]}
              >
                Завершить событие
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
