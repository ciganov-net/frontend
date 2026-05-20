import Image from 'next/image'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import Link from 'next/link'

export const WelcomePage = () => {
  return (
    <div className='relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-background p-4'>
      <Image
        src='/home.png'
        alt='Background'
        fill
        priority
        className='object-cover pointer-events-none select-none'
      />

      <div className='absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent dark:from-zinc-950/95 dark:via-zinc-950/50 dark:to-transparent' />

      <div className='relative z-10 w-full max-w-2xl text-center flex flex-col items-center gap-6'>
        <Label className='font-bold text-3xl'>
          Ставки, где вы точно проиграете
        </Label>
        <Label className='font-bold text-2xl'>
          Пукнет ли рак в океане? Явится ли дьявол? Диман снова кого-то пошлет?
        </Label>
        <Label className='text-xl'>
          Выбирай абсурдные исходы, ставь на самые неожиданные события и
          проигрывай
        </Label>
        <Button size='lg' variant='default'>
          <Link href='/dashboard'>Сделать ставку</Link>
        </Button>
      </div>
    </div>
  )
}
