'use client'

import { useGetCategories } from '@/api/hooks/useGetCategories'
import { LoadingPage } from '@/components/elements/loading-page'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { ScrollArea } from '@/components/ui/scroll-area'

export const CategoriesAdminPage = () => {
  const { data: categories, isLoading } = useGetCategories()

  if (isLoading) return <LoadingPage />

  return (
    <div className='p-6'>
      <Label className='text-2xl mb-4'>Список категорий</Label>
      <ScrollArea className='h-full'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {categories?.map(category => (
            <Card
              key={category.id}
              className='border rounded-lg shadow-sm hover:shadow-md transition'
            >
              <CardHeader>
                <CardTitle>{category.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>ID: {category.id}</p>
                <p>Описание: {category.description || 'Нет описания'}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
