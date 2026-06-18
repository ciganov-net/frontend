import { CategoryResponse } from '@/api/generated'
import { CategoryCard } from './category-card'
import { Label } from '@/components/ui/label'
import { cn } from '@/libs/tw-merge'

interface Props {
  categories: CategoryResponse[]
  prefix?: string
  header?: string
  className?: string
}

const categoryImages: Record<string, string> = {
  mystic: '/mystic.png',
  lifestyle: '/lifestyle.png',
  person: '/person.png',
  media: '/media.png'
}


export const CategoryGroup = ({
  header,
  categories,
  className,
  prefix
}: Props) => {
  return (
    <div className='w-full'>
      {header && <Label className='typo-h5'>{header}</Label>}
      <div className={cn(className, 'my-4')}>
        {categories.map(category => (
          <CategoryCard
            key={category.id}
            description={category.description}
            usePrefix={prefix ? prefix : true}
            title={category.name}
            href={category.slug}
            image={categoryImages[category.slug] ?? '/mac.png'}
          />
        ))}
      </div>
    </div>
  )
}
