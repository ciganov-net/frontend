import { useMutation, type UseMutationOptions } from '@tanstack/react-query'
import { getCiganovNet } from '../generated/client'
import { AxiosResponse } from 'axios'
import { FinishOddRequest } from '../generated'

export const useFinishBet = (
  options?: Omit<
    UseMutationOptions<AxiosResponse<boolean>, unknown, FinishOddRequest>,
    'mutationKey' | 'mutationFn'
  >
) =>
  useMutation({
    mutationKey: ['finish bet'],
    mutationFn: requestData =>
      getCiganovNet().betsControllerFinishedOdd(requestData),
    ...options
  })
