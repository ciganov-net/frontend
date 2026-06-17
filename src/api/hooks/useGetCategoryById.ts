import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { getCiganovNet } from '../generated/client'
import { CategoryResponse } from '../generated'

export const useGetCategoryById = (
  categoryId: string,
  options?: Omit<
    UseQueryOptions<unknown, unknown, CategoryResponse>,
    'queryKey' | 'queryFn'
  >
) =>
  useQuery({
    queryKey: ['get category by id', categoryId],
    queryFn: () =>
      getCiganovNet()
        .oddsControllerGetCategory(categoryId)
        .then(res => {
          return res.data
        }),
    staleTime: 0,
    ...options
  })
