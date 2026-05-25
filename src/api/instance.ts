import { APP_CONFIG } from '@/constants/app.constant'
import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  CreateAxiosDefaults
} from 'axios'

const options: CreateAxiosDefaults = {
  baseURL: APP_CONFIG.apiUrl,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
}

const api = axios.create(options)
export { api }

export function customInstance<T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig
): Promise<AxiosResponse<T>> {
  return api({
    ...config,
    ...options
  })
}
