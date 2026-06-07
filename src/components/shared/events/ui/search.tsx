import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

interface Props {
  value: string
  onChange: (value: string) => void
  onSearch?: () => void
}

export const EventSearch = ({ value, onChange, onSearch }: Props) => {
  return (
    <div className='flex flex-row w-full items-center gap-x-4 justify-center'>
      <div className='relative w-full'>
        <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
        <Input
          placeholder='Поиск события'
          className='pl-10 pr-10 rounded-md'
          value={value}
          onChange={e => onChange(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && onSearch?.()}
        />
      </div>
    </div>
  )
}
