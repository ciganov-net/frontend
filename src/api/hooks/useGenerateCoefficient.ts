import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { getCiganovNet } from '../generated/client'
import { CoefficientResponse } from '../generated'

export const useGenerateCoefficient = (
  options?: Omit<
    UseQueryOptions<unknown, unknown, CoefficientResponse>,
    'queryKey' | 'queryFn'
  >
) =>
  useQuery({
    queryKey: ['generate coefficient'],
    queryFn: () =>
      getCiganovNet()
        .crashControllerGenerateCoef()
        .then(res => res.data),
    ...options
  })
