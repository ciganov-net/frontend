import { APP_CONFIG } from '@/constants/app.constant'
import { getSessionToken } from '@/libs/cookies'
import axios, { CreateAxiosDefaults } from 'axios'

const options: CreateAxiosDefaults = {
  baseURL: APP_CONFIG.baseUrl,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
}

const api = axios.create(options)
const instance = axios.create(options)

instance.interceptors.request.use(config => {
  const sessionToken = getSessionToken()
  if (config.headers && sessionToken) {
    config.headers['X-Session-Token'] = sessionToken
  }
  return config
})

export { api, instance }
