import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { cn } from '@/libs/tw-merge'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { PropsWithChildren } from 'react'

interface Props {
  title: string
  description: string
  image: string
  href?: string
  usePrefix?: boolean | string
  className?: string
}

export const CategoryCard = ({ ...props }: PropsWithChildren<Props>) => {
  const path = usePathname()
  if (props.href) {
    const linkHref =
      props.usePrefix === true
        ? `${path}/${props.href}`
        : props.usePrefix
          ? `${props.usePrefix}/${props.href}`
          : props.href
    return (
      <Link href={linkHref} className='block h-full'>
        <CategoryCardBody {...props} />
      </Link>
    )
  }

  return <CategoryCardBody {...props} />
}

const CategoryCardBody = ({
  description,
  image,
  title,
  className,
  href
}: PropsWithChildren<Props>) => {
  return (
    <Card
      className={cn(
        `h-[288px] relative isolatew-full overflow-hidden`,
        `rounded-[var(--radius-md)] border border-transparent`,
        `[background:var(--gradient-card-background)] backdrop-blur`,
        className,
        href && 'transition-all duration-300 hover:scale-[1.02]'
      )}
    >
      <CardHeader className='relative flex flex-col gap-2 z-20'>
        <CardTitle className='typo-h6 text-[var(--neutral-0)]'>{title}</CardTitle>
        <CardDescription className='typo-small line-clamp-2 min-h-10 md:max-w-[168px] text-[var(--neutral-400)]'>
          {description}
        </CardDescription>
      </CardHeader>

      <div className='absolute inset-0 z-0 bg-linear-to-br from-transparent via-transparent to-primary/40' />

      <Image
        src={image}
        alt={title}
        width={220}
        height={220}
        loading='eager'
        className='pointer-events-none absolute -right-[38px] -bottom-[59px] z-10 h-[222px] w-[222px] object-contain'
      />
      <CardContent>{}</CardContent>
    </Card>
  )
}
