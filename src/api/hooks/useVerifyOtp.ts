import { useMutation, type UseMutationOptions } from '@tanstack/react-query'

import type { VerifyOtpRequest, VerifyOtpResponse } from '../generated'
import { getCiganovNet } from '../generated/client'
import { AxiosResponse } from 'axios'

export const useVerifyOtp = (
  options?: Omit<
    UseMutationOptions<
      AxiosResponse<VerifyOtpResponse>,
      unknown,
      VerifyOtpRequest
    >,
    'mutationKey' | 'mutationFn'
  >
) =>
  useMutation({
    mutationKey: ['verify otp'],
    mutationFn: requestData =>
      getCiganovNet().authControllerVerifyOtp(requestData),
    ...options
  })
