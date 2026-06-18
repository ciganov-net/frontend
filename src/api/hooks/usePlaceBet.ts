import { useMutation, type UseMutationOptions } from '@tanstack/react-query'

import type { PlaceBetRequest, PlaceBetResponse } from '../generated'
import { getCiganovNet } from '../generated/client'
import { AxiosResponse } from 'axios'

export const usePlaceBet = (
  options?: Omit<
    UseMutationOptions<
      AxiosResponse<PlaceBetResponse>,
      unknown,
      PlaceBetRequest
    >,
    'mutationKey' | 'mutationFn'
  >
) =>
  useMutation({
    mutationKey: ['place bet'],
    mutationFn: requestData =>
      getCiganovNet().betsControllerPlaceBet(requestData),
    ...options
  })
