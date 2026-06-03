import { CategoryResponse } from '@/api/generated'
import { CategoryCard } from './category-card'
import { Label } from '@/components/ui/label'

interface Props {
  header: string
  categories: CategoryResponse[]
  className?: string
}

export const CategoryGroup = ({ header, categories, className }: Props) => {
  return (
    <div className={className}>
      <Label className='text-xl font-bold'>{header}</Label>
      <div className='flex flex-row gap-x-4 w-full'>
        {categories.map(category => (
          <CategoryCard
            key={category.id}
            className='flex-1 gap-4 my-4'
            description={category.slug}
            title={category.name}
            href={category.slug}
            image={category.slug}
          />
        ))}
      </div>
    </div>
  )
}
