'use client'
import { useGetEventsByCategory } from '@/api/hooks/useGetEventsByCategory'
import { LoadingPage } from '@/components/elements/loading-page'
import Error from 'next/error'
import { CategoryCard } from './category-card'
import { CategoryResponse } from '@/api/generated'
import { notFound } from 'next/navigation'
import { Odds } from '../../odds/ui/odds'
import { Label } from '@/components/ui/label'

interface Props {
  category: CategoryResponse
}

export const CategoryPage = ({ category }: Props) => {
  if (!category) return notFound()
  const { data, isLoading } = useGetEventsByCategory(category.id)

  if (isLoading) return <LoadingPage />
  if (data?.length === 0) {
    return (
      <Label className='items-center justify-center text-lg text-muted-foreground'>
        Пока что ставок на это событие нет🥹
      </Label>
    )
  }
  return (
    <div className='flex flex-col gap-4'>
      <CategoryCard
        description={category.description}
        title={category.name}
        image={'/mac.png'}
      />
      <Odds events={data ?? []} />
    </div>
  )
}
