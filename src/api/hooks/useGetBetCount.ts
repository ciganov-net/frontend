import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { getCiganovNet } from '../generated/client'
import { GetBetCountResponse } from '../generated'

export const useGetBetCount = (
  eventId: string,
  options?: Omit<
    UseQueryOptions<unknown, unknown, GetBetCountResponse>,
    'queryKey' | 'queryFn'
  >
) =>
  useQuery({
    queryKey: ['get bet count'],
    queryFn: () =>
      getCiganovNet()
        .betsControllerGetBetCount(eventId)
        .then(res => res.data),
    ...options
  })
