import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { GetUserBetsResponse } from '../generated'
import { getCiganovNet } from '../generated/client'

export const useGetUserBets = (
  options?: Omit<
    UseQueryOptions<unknown, unknown, GetUserBetsResponse[]>,
    'queryKey' | 'queryFn'
  >
) =>
  useQuery({
    queryKey: ['get user bets'],
    queryFn: () =>
      getCiganovNet()
        .betsControllerGetUserBets()
        .then(res => res.data),
    ...options
  })
