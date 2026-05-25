import { useMutation, type UseMutationOptions } from '@tanstack/react-query'

import type { SendOtpRequest, SendOtpResponse } from '../generated'
import { getCiganovNet } from '../generated/client'
import { AxiosResponse } from 'axios'

export const useSendOtp = (
  options?: Omit<
    UseMutationOptions<AxiosResponse<SendOtpResponse>, unknown, SendOtpRequest>,
    'mutationKey' | 'mutationFn'
  >
) =>
  useMutation({
    mutationKey: ['send otp'],
    mutationFn: requestData =>
      getCiganovNet().authControllerSendOtp(requestData),
    ...options
  })
