import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { getCiganovNet } from '../generated/client'
import { EventResponse } from '../generated'

export const useGetEventsByCategory = (
  categoryId: string,
  options?: Omit<
    UseQueryOptions<unknown, unknown, EventResponse[]>,
    'queryKey' | 'queryFn'
  >
) =>
  useQuery({
    queryKey: ['get events by category', categoryId],
    queryFn: () =>
      getCiganovNet()
        .oddsControllerGetEventsByCategory(categoryId)
        .then(res => {
          return res.data
        }),
    staleTime: 0,
    ...options
  })
