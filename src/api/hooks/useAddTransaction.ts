
import { useMutation, type UseMutationOptions } from '@tanstack/react-query'
import { getCiganovNet } from '../generated/client'
import { AddTransactionRequest, AddTransactionResponse } from '../generated'
import { AxiosResponse } from 'axios'

export const useAddTransaction = (
  options?: Omit<
    UseMutationOptions<
      AxiosResponse<AddTransactionResponse>,
      unknown,
      AddTransactionRequest
    >,
    'mutationKey' | 'mutationFn'
  >
) =>
  useMutation({
    mutationKey: ['add balance transaction'],
    mutationFn: requestData =>
      getCiganovNet().balancesControllerAddTransactions(requestData),
    ...options
  })