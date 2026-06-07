import { Label } from '@/components/ui/label'
import { Profile } from './avatar'
import { DynamicBreadcrumbs } from './breadcrumbs'

export const Header = () => {
  return (
    <header className='relative top-0 z-50 w-full mb-5'>
      <div className='flex h-14 items-center justify-between'>
        <div className='flex items-center gap-x-4'>
          <DynamicBreadcrumbs />
        </div>
        <div>
          <Profile />
        </div>
      </div>
    </header>
  )
}
