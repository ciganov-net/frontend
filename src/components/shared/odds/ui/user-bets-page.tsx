'use client'

import { useGetUserBets } from '@/api/hooks/useGetUserBets'
import { Card, CardContent } from '@/components/ui/card'
import { LoadingPage } from '@/components/elements/loading-page'
import { Ticket, Calendar } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { StatusBadge } from '@/components/elements/status-badge'

export const UserBets = () => {
  const { data: bets = [], isLoading } = useGetUserBets()

  if (isLoading) return <LoadingPage />

  return (
    <div className='max-w-6xl mx-auto space-y-6'>
      <div className='flex items-center gap-3'>
        <Ticket className='h-8 w-8 text-primary' />
        <h1 className='text-2xl font-bold'>Мои ставки</h1>
        <Badge variant='secondary'>Всего: {bets.length}</Badge>
      </div>

      <div className='grid gap-4'>
        {bets.map((bet, index) => (
          <Card key={index} className='p-4'>
            <CardContent className='p-0 flex flex-col md:flex-row gap-4'>
              <div className='flex-1 min-w-0 space-y-3'>
                <div className='flex items-center gap-3'>
                  <StatusBadge status={bet.status} />
                  <span className='text-xs text-muted-foreground flex items-center gap-1 shrink-0'>
                    <Calendar className='h-3 w-3' />
                    {new Date(bet.createdAt).toLocaleDateString('ru-RU')}
                  </span>
                </div>
                <div className='truncate'>
                  <h3 className='font-semibold text-lg truncate'>
                    {bet.eventName}
                  </h3>
                  <p className='text-sm text-muted-foreground truncate'>
                    Исход:{' '}
                    <span className='text-foreground font-medium'>
                      {bet.outcomeName}
                    </span>
                  </p>
                </div>
              </div>

              <div className='grid grid-cols-2 md:w-[400px] md:grid-cols-4 gap-4 md:border-l md:pl-6 shrink-0'>
                {[
                  { label: 'СТАВКА', val: `${bet.amount.toFixed(2)} ₽` },
                  {
                    label: 'КОЭФФ',
                    val: `${bet.coefficient.toFixed(2)}x`,
                    className: 'text-primary font-bold'
                  },
                  {
                    label: 'ПОТЕНЦИАЛ',
                    val: `${bet.potentialPayout.toFixed(2)} ₽`
                  },
                  {
                    label: 'ИТОГ',
                    val:
                      bet.actualPayout !== null
                        ? `${bet.actualPayout.toFixed(2)} ₽`
                        : '—'
                  }
                ].map((item, i) => (
                  <div key={i}>
                    <p className='text-[10px] uppercase text-muted-foreground tracking-wider'>
                      {item.label}
                    </p>
                    <p
                      className={`text-sm font-semibold mt-1 ${item.className || ''}`}
                    >
                      {item.val}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
