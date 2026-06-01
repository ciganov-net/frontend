import { useQuery, type UseQueryOptions } from '@tanstack/react-query'

import type { HealthResponse } from '../generated'
import { getCiganovNet } from '../generated/client'

export const useGetHealthStatus = (
  options?: Omit<
    UseQueryOptions<unknown, unknown, HealthResponse>,
    'queryKey' | 'queryFn'
  >
) =>
  useQuery({
    queryKey: ['health status'],
    queryFn: () => getCiganovNet().appControllerHealth(),
    ...options
  })
