'use client'

import { useGetHealthStatus } from '@/api/hooks/useHealth'
import { EllipsisLoader } from '@/components/elements/elipsis-loader'
import { LoadingPage } from '@/components/elements/loading-page'
import { ConstructionIcon } from 'lucide-react'
import type { ReactNode } from 'react'

interface HealthCheckProvider {
  children: ReactNode
}

export function HealthCheckProvider({ children }: HealthCheckProvider) {
  const { data, isLoading, isError } = useGetHealthStatus({
    retry: 0,
    refetchOnWindowFocus: false
  })

  if (isLoading) return <LoadingPage />

  // if (isError || data?.status !== 'ok')
  //   return (
  //     <div className='flex h-screen w-full flex-col items-center justify-center p-4 text-center'>
  //       <ConstructionIcon className='mb-6 size-14' />
  //       <h1 className='mb-4 text-3xl font-bold'>Сервис временно недоступен</h1>
  //       <p className='max-w-sm text-center'>
  //         Мы уже работаем над восстановлением работы сервиса. Попробуйте зайти
  //         позже.
  //       </p>
  //     </div>
  //   )

  return <>{children}</>
}
