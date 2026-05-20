'use client'
import { PropsWithChildren, useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { TANSTACK_QUERY_CONFIG } from '@/configs/tanstack.config'

export function TanstackProvider({ children }: PropsWithChildren<unknown>) {
  const [client] = useState(
    () =>
      new QueryClient({
        defaultOptions: TANSTACK_QUERY_CONFIG
      })
  )

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}
