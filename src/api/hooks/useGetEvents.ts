import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { getCiganovNet } from '../generated/client'
import { EventResponse, OddsControllerGetEventsParams } from '../generated'

export const useGetEvents = (
  request?: OddsControllerGetEventsParams,
  options?: Omit<
    UseQueryOptions<unknown, unknown, EventResponse[]>,
    'queryKey' | 'queryFn'
  >
) =>
  useQuery({
    queryKey: ['get events', request],
    queryFn: () =>
      getCiganovNet()
        .oddsControllerGetEvents(request)
        .then(res => {
          return res.data
        }),
    staleTime: 0,
    ...options
  })
