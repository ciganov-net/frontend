import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { getCiganovNet } from '../generated/client'
import { EventResponse } from '../generated'

export const useGetRandomEvents = (
  randomCount: number,
  options?: Omit<
    UseQueryOptions<unknown, unknown, EventResponse[]>,
    'queryKey' | 'queryFn'
  >
) =>
  useQuery({
    queryKey: ['get random events'],
    queryFn: () =>
      getCiganovNet()
        .oddsControllerGetRandomEvents(randomCount)
        .then(res => res.data),
    ...options
  })
