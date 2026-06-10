'use client'

import { socket } from '@/api/socket'
import { useEffect } from 'react'

export function WsProvider() {
  useEffect(() => {
    socket.connect()

    socket.emit('join')

    return () => {
      socket.disconnect()
    }
  }, [])

  return null
}
