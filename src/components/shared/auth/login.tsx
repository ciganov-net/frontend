'use client'

import { useGetMe } from '@/api/hooks/useGetMe'
import { useSendOtp } from '@/api/hooks/useSendOtp'
import { useVerifyOtp } from '@/api/hooks/useVerifyOtp'
import { Button } from '@/components/ui/button'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot
} from '@/components/ui/input-otp'
import { ROUTES } from '@/constants/routes.constant'
import { errorCatch } from '@/libs/error'
import { LoginSchema, TypeLoginSchema } from '@/schemas/login.schema'
import { useForm } from '@tanstack/react-form'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export const LoginPage = () => {
  const router = useRouter()
  const [step, setStep] = useState<'input' | 'code'>('input')
  const { refetch } = useGetMe({
    enabled: false
  })
  const { mutate: send } = useSendOtp({
    onSuccess() {
      setStep('code')
    },
    onError(error: any) {
      form.setFieldMeta('email', prev => ({
        ...prev,
        errors: [errorCatch(error)]
      }))
    }
  })

  const form = useForm({
    defaultValues: {
      email: '',
      code: ''
    } as TypeLoginSchema,
    validators: {
      onSubmit: LoginSchema
    },
    onSubmit: async ({ value }) => {
      if (step === 'input') {
        send({
          identifier: value.email
        })
      } else {
        verify({
          identifier: value.email,
          code: value.code!
        })
      }
    }
  })
  const { mutate: verify, isPending } = useVerifyOtp({
    onSuccess: async data => {
      const user = await refetch()

      if (!user?.data?.displayName) router.replace(ROUTES.AUTH.ONBOARDING)
      else router.replace(ROUTES.DASHBOARD)
    },
    onError(error: any) {
      form.setFieldMeta('code', prev => ({
        ...prev,
        errors: [errorCatch(error)]
      }))
    }
  })

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault()
          form.handleSubmit()
        }}
      >
        <FieldGroup>
          <form.Field
            name='email'
            children={field => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={e => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    placeholder='panteleev@ciganov.net'
                    autoComplete='off'
                  />
                  <FieldDescription>
                    Provide a concise title for your bug report.
                  </FieldDescription>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              )
            }}
          />
          {step === 'code' && (
            <form.Field
              name='code'
              children={field => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Code</FieldLabel>
                    <InputOTP
                      id={field.name}
                      name={field.name}
                      maxLength={6}
                      value={field.state.value}
                      onChange={e => field.handleChange(e)}
                      onBlur={field.handleBlur}
                      placeholder='OTP code'
                      autoComplete='one-time-code'
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                    <FieldDescription>
                      Provide a concise title for your bug report.
                    </FieldDescription>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            />
          )}
        </FieldGroup>
        <Button size='lg' className='w-full' type='submit' disabled={isPending}>
          {step === 'input' ? 'Отправить код' : 'Подтвердить код'}
        </Button>
      </form>
    </div>
  )
}
