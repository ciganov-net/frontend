import { Label } from '@/components/ui/label'
import { Profile } from './avatar'

export const Header = () => {
  return (
    <div className='flex flex-row justify-between'>
      <Label className='font-bold text-xl'>Главная</Label>
      <Profile />
    </div>
  )
}
