import { getCiganovNet } from '@/api/generated/client'
import { CategoryPage } from '@/components/shared/categories/ui/category-page'
import { notFound } from 'next/navigation'

export const revalidate = 180

export default async function Page({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const response = await getCiganovNet()
    .oddsControllerGetCategory(slug)
    .catch(e => notFound())
  return <CategoryPage category={response.data} />
}
