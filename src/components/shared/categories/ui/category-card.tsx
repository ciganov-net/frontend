import { Card, CardDescription, CardTitle } from '@/components/ui/card'
import { cn } from '@/libs/tw-merge'
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
  imasge,
  title,
  className
}: Props) => {
  return (
    <Link href={href} className={className}>
      <Card className='h-full'>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </Card>
    </Link>
  )
}
