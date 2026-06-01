import { useMutation, type UseMutationOptions } from '@tanstack/react-query'

import { getCiganovNet } from '../generated/client'
import { AxiosResponse } from 'axios'

export const useRevokeAllSessions = (
  options?: Omit<
    UseMutationOptions<AxiosResponse<void>, unknown, void>,
    'mutationKey' | 'mutationFn'
  >
) =>
  useMutation({
    mutationKey: ['revoke all session'],
    mutationFn: () => getCiganovNet().authControllerRevokeAll(),
    ...options
  })
