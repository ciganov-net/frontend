'use client'

import { LogOut, LogOutIcon, ShieldUser, Snowflake, User } from 'lucide-react'
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

export function Profile() {
  const router = useRouter()
  const { exit } = useAuth()
  const { data: user, isLoading } = useGetMe()

  const { mutate, isPending } = useRevokeSession({
    onSuccess: async data => {
      exit()
      toast.success('Вы успешно вышли из системы')
      router.replace(ROUTES.HOME)
    },
    onError(error: any) {
      toast.error('При выходе из системы произошла ошибка')
      toast.info(errorCatch(error))
    }
  })

  if (isLoading) return <Spinner className={'size-6 text-muted-foreground'} />

  return (
    <div className='flex flex-row items-center gap-3'>
      <Avatar>
        <AvatarImage
          src='https://github.com/shadcn.png'
          alt={user?.email}
          className='grayscale'
        />
        <AvatarFallback>{user?.email?.charAt(0).toUpperCase()}</AvatarFallback>
      </Avatar>

      <div className='flex flex-col'>
        <span className='font-semibold'>VadimZ</span>
        <span className='text-sm font-medium'>1 054 ₽</span>
      </div>
      <Button
        variant='ghost'
        size='icon'
        disabled={isPending}
        onClick={() => mutate()}
      >
        <LogOutIcon />
      </Button>
    </div>
  )
}
