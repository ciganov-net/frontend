import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { getCiganovNet } from '../generated/client'
import { GetBalanceResponse } from '../generated'

export const useGetBalance = (
  options?: Omit<
    UseQueryOptions<unknown, unknown, GetBalanceResponse>,
    'queryKey' | 'queryFn'
  >
) =>
  useQuery({
    queryKey: ['get balance'],
    queryFn: () =>
      getCiganovNet()
        .balancesControllerGetBalance()
        .then(res => res.data),
    ...options
  })
