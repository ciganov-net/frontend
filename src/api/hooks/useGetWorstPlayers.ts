import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { getCiganovNet } from '../generated/client'
import { GetWorstPlayersResponse } from '../generated'

export const useGetWorstPlayers = (
  limit: number,
  options?: Omit<
    UseQueryOptions<unknown, unknown, GetWorstPlayersResponse[]>,
    'queryKey' | 'queryFn'
  >
) =>
  useQuery({
    queryKey: ['get worst players'],
    queryFn: () =>
      getCiganovNet()
        .usersControllerGetWorstPlayers(limit)
        .then(res => res.data),
    ...options
  })
