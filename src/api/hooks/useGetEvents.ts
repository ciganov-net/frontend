import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { getCiganovNet } from '../generated/client'
import { EventResponse } from '../generated'

export const useGetEvents = (
  options?: Omit<
    UseQueryOptions<unknown, unknown, EventResponse[]>,
    'queryKey' | 'queryFn'
  >
) =>
  useQuery({
    queryKey: ['get events'],
    queryFn: () =>
      getCiganovNet()
        .oddsControllerGetEvents()
        .then(res => res.data),
    ...options
  })
