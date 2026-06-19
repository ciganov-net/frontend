'use client'

import { LogIn, LogOutIcon } from 'lucide-react'
import { toast } from 'sonner'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useAuth } from '@/hooks/useAuth'
import { useRevokeSession } from '@/api/hooks/useRevokeSession'
import { ROUTES } from '@/constants/routes.constant'
import { errorCatch } from '@/libs/error'
import { Spinner } from '@/components/ui/spinner'
import { useGetMe } from '@/api/hooks/useGetMe'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useGetBalance } from '@/api/hooks/useGetBalance'

export function Profile() {
  const router = useRouter()
  const { isAuthenticated, exit } = useAuth()
  const { data: user, isLoading: profileIsLoading } = useGetMe({
    enabled: isAuthenticated
  })
  const { data: balance, isLoading: balanceIsLoading } = useGetBalance({
    enabled: isAuthenticated,
    refetchInterval: isAuthenticated ? 5000 : false
  })

  const { mutate, isPending } = useRevokeSession({
    onSuccess: async () => {
      exit()
      toast.success('Вы успешно вышли из системы')
      router.replace(ROUTES.HOME)
    },
    onError(error: any) {
      toast.error('При выходе из системы произошла ошибка')
      toast.info(errorCatch(error))
    }
  })

  if (profileIsLoading || balanceIsLoading)
    return <Spinner className={'size-6 text-muted-foreground'} />

  return isAuthenticated ? (
    <div className='flex flex-row items-center gap-3'>
      {/* TODO: сделать по умолчанию аву коня цыгана */}
      <Avatar size='lg'>
        <AvatarImage
          src={user?.avatar || 'https://github.com/shadcn.png'}
          alt={user?.email}
          className='grayscale'
        />
        <AvatarFallback>{user?.email?.charAt(0).toUpperCase()}</AvatarFallback>
      </Avatar>
      <div className='flex flex-col'>
        <span className='font-semibold'>{user?.displayName}</span>
        <span className='text-sm font-medium'>
          Основной: {balance?.balance?.mainBalance} ₽
        </span>
        <span className='text-sm font-medium'>
          Бонусный: {balance?.balance?.bonusBalance} ₽
        </span>
      </div>
      <Button
        variant='outline'
        size='sm'
        disabled={isPending}
        onClick={() => mutate()}
      >
        <LogOutIcon />
      </Button>
    </div>
  ) : (
    <Button variant={'outline'} onClick={() => router.push(ROUTES.AUTH.LOGIN)}>
      <LogIn />
      Войти
    </Button>
  )
}
