import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { getCiganovNet } from '../generated/client'
import { CategoryResponse } from '../generated'

export const useGetCategories = (
  options?: Omit<
    UseQueryOptions<unknown, unknown, CategoryResponse[]>,
    'queryKey' | 'queryFn'
  >
) =>
  useQuery({
    queryKey: ['get categories'],
    queryFn: () =>
      getCiganovNet()
        .oddsControllerGetCategories()
        .then(res => res.data),
    ...options
  })
