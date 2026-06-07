import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { cn } from '@/libs/tw-merge'
import Image from 'next/image'
import Link from 'next/link'

interface Props {
  title: string
  description: string
  image: string
  href: string
  className?: string
}

export const CategoryCard = ({
  description,
  href,
  image,
  title,
  className
}: Props) => {
  return (
    <Link href={href} className='block h-full'>
      <Card
        className={cn(
          'relative overflow-hidden transition-all duration-300 hover:scale-[1.02]',
          className
        )}
      >
        <CardHeader className='flex flex-col gap-4 z-20'>
          <CardTitle className='text-lg font-semibold'>{title}</CardTitle>
          <CardDescription className='line-clamp-2 min-h-10 md:max-w-[50%] text-sm text-muted-foreground leading-normal'>
            {description}
          </CardDescription>
        </CardHeader>

        <div className='absolute inset-0 z-0 bg-linear-to-br from-transparent via-transparent to-primary/40' />

        <Image
          src={image}
          alt={title}
          fill
          sizes='(max-width: 768px) 100vw, 33vw'
          loading='eager'
          className='z-10 object-contain object-bottom-right'
        />
      </Card>
    </Link>
  )
}
