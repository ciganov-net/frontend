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
import { useAuth } from '@/hooks/useAuth'
import { errorCatch } from '@/libs/error'
import { LoginSchema, TypeLoginSchema } from '@/schemas/login.schema'
import { useForm } from '@tanstack/react-form'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { cn } from '@/libs/tw-merge'

function AuthCard({
  className,
  ...props
}: React.ComponentProps<'section'>) {
  return (
    <section
      data-slot='auth-card'
      className={cn(
        'w-[392px] flex-col items-center gap-6',
        'rounded-[var(--radius-2xl)] bg-[rgba(17,19,24,0.6)] p-8 backdrop-blur',
        className
      )}
      {...props}
    />
  )
}



export const LoginPage = () => {
  const { auth } = useAuth()
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

  const digitFrame ='h-12 w-12 rounded-[12px] border border-[#FFCE43] bg-transparent text-center text-[24px] leading-[48px] font-bold text-white'

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

      if (!user?.data?.displayName) {
        auth()
        router.replace(ROUTES.AUTH.ONBOARDING)
      } else router.replace(ROUTES.DASHBOARD)
    },
    onError(error: any) {
      form.setFieldMeta('code', prev => ({
        ...prev,
        errors: [errorCatch(error)]
      }))
    }
  })

  return (
    <main className='flex min-h-screen items-center justify-center px-4 py-10'
      style={{
        background:
          'radial-gradient(80.86% 404.98% at 73.72% 421.08%, #FFCE43 0%, #08080B 100%), #08080B'
      }}
    >
    <AuthCard>
      <h4 className='text-center typo-h4'>Авторизация</h4>
    <div>
      <form className='flex w-full flex-col gap-6'
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
                      <InputOTPGroup className='flex gap-2'>
                        <InputOTPSlot index={0}className={cn(
                            digitFrame,
                            isInvalid && 'border-[#F64040]'
                          )}
                        />
                        <InputOTPSlot index={1} className={cn(
                            digitFrame,
                            isInvalid && 'border-[#F64040]'
                          )}
                        />
                        <InputOTPSlot index={2} className={cn(
                            digitFrame,
                            isInvalid && 'border-[#F64040]'
                          )}
                        />
                        <InputOTPSlot index={3} className={cn(
                            digitFrame,
                            isInvalid && 'border-[#F64040]'
                          )}
                        />
                        <InputOTPSlot index={4} className={cn(
                            digitFrame,
                            isInvalid && 'border-[#F64040]'
                          )}
                        />
                        <InputOTPSlot index={5} className={cn(
                            digitFrame,
                            isInvalid && 'border-[#F64040]'
                          )}
                        />
                      </InputOTPGroup>
                    </InputOTP>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            />
          )}
        </FieldGroup>
        <Button variant='solid' color='primary' size='large' type='submit' className='w-full' disabled={isPending}>
          {step === 'input' ? 'Отправить код' : 'Подтвердить код'}
        </Button>
      </form>
    </div>
    </AuthCard>
    </main>
  )
}
