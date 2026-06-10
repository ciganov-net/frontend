import { APP_CONFIG } from '@/constants/app.constant'
import { io } from 'socket.io-client'

export const socket = io(APP_CONFIG.apiUrl, {
  autoConnect: false,
  withCredentials: true
})
