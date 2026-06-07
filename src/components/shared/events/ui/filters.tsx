'use client'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'
import { FILTER_COMBOBOX, SHEET_FILTERS } from '@/constants/events.constant'
import { Funnel } from 'lucide-react'

interface Props {}

export const EventFilers = ({}: Props) => {
  return (
    <div className='flex flex-row justify-start items-center gap-4'>
      <Select defaultValue={FILTER_COMBOBOX[0]}>
        <SelectTrigger className='w-72'>
          <SelectValue placeholder='Фильтр' />
        </SelectTrigger>

        <SelectContent>
          {FILTER_COMBOBOX.map(item => (
            <SelectItem key={item} value={item}>
              {item}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant={'default'}>
            <Funnel />
          </Button>
        </SheetTrigger>
        <SheetContent
          side='right'
          className='bg-background border-l border-border px-6 py-5'
        >
          <SheetHeader>
            <SheetTitle className='text-3xl font-bold'>Фильтрация</SheetTitle>
            <SheetDescription></SheetDescription>
          </SheetHeader>

          <div className='flex h-full flex-col'>
            <div className='space-y-8'>
              {Object.entries(SHEET_FILTERS).map(([title, options]) => (
                <section key={title}>
                  <Label className='mb-4 block text-xl font-semibold'>
                    {title}
                  </Label>

                  <div className='space-y-4'>
                    {options.map(option => {
                      const id = `${title}-${option}`
                        .replace(/\s+/g, '-')
                        .replace(/\//g, '')
                        .toLowerCase()

                      return (
                        <div
                          key={option}
                          className='flex items-center gap-3 text-lg'
                        >
                          <Checkbox id={id} />

                          <Label
                            htmlFor={id}
                            className='cursor-pointer font-semibold'
                          >
                            {option}
                          </Label>
                        </div>
                      )
                    })}
                  </div>
                </section>
              ))}
            </div>

            <div className='mt-auto pt-8'>
              <Button className='h-12 w-full text-base'>Применить</Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
