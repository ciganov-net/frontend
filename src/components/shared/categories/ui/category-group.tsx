import { CategoryResponse } from '@/api/generated'
import { CategoryCard } from './category-card'
import { Label } from '@/components/ui/label'
import { cn } from '@/libs/tw-merge'

interface Props {
  categories: CategoryResponse[]
  header?: string
  className?: string
}

export const CategoryGroup = ({ header, categories, className }: Props) => {
  return (
    <div className='w-full'>
      {header && <Label className='text-lg font-bold'>{header}</Label>}
      <div className={cn(className, 'my-4')}>
        {categories.map(category => (
          <CategoryCard
            key={category.id}
            description={category.description}
            title={category.name}
            href={category.slug}
            image={'/mac.png'}
          />
        ))}
      </div>
    </div>
  )
}
