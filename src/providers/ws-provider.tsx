'use client'

import { socket } from '@/api/socket'
import { Info } from 'lucide-react'
import Link from 'next/link'
import { useEffect } from 'react'
import { toast } from 'sonner'

export function WsProvider() {
  useEffect(() => {
    socket.connect()

    socket.emit('join')

    socket.on('notification', () => {
      toast.info('Обновление ставки', {
        description: (
          <Link href='/bets'>
            <p className='text-foreground'>
              Статус вашей ставки обновился. Нажмите чтобы посмотреть
            </p>
          </Link>
        ),
        duration: 5000
      })
    })

    return () => {
      socket.disconnect()
    }
  }, [])

  return null
}
