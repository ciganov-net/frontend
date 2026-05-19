import { APP_CONFIG } from '@/constants/app.constant'
import Cookies from 'js-cookie'

export const getSessionToken = () => {
  const sessionToken = Cookies.get('session')
  return sessionToken ?? null
}

export const saveSessionToken = (token: string) => {
  Cookies.set('session', token, {
    domain: APP_CONFIG.cookieDomain,
    sameSite: process.env['NODE_ENV'] === 'development' ? 'strict' : 'lax',
    expires: 30
  })
}

export const removeSessionToken = () => {
  Cookies.remove('session')
}
