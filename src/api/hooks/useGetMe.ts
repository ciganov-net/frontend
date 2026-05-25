import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { GetMeResponse } from '../generated'
import { getCiganovNet } from '../generated/client'

export const useGetMe = (
  options?: Omit<
    UseQueryOptions<unknown, unknown, GetMeResponse>,
    'queryKey' | 'queryFn'
  >
) =>
  useQuery({
    queryKey: ['get me'],
    queryFn: () =>
      getCiganovNet()
        .usersControllerGetMe()
        .then(res => res.data),
    ...options
  })
