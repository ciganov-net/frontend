import { useMutation, type UseMutationOptions } from '@tanstack/react-query'

import { getCiganovNet } from '../generated/client'
import { AxiosResponse } from 'axios'

export const useRevokeSession = (
  options?: Omit<
    UseMutationOptions<AxiosResponse<void>, unknown, void>,
    'mutationKey' | 'mutationFn'
  >
) =>
  useMutation({
    mutationKey: ['revoke session'],
    mutationFn: () => getCiganovNet().authControllerRevoke(),
    ...options
  })
