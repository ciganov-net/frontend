'use client'
import { useState } from 'react'
import { OddsControllerGetEventsOrderBy } from '@/api/generated'
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
import {
  FILTER_COMBOBOX,
  COEFFICIENT_FILTERS
} from '@/constants/events.constant'
import { Funnel } from 'lucide-react'

export interface SelectedFilters {
  outcomeTypes: string[]
  minCoefficient?: number
  maxCoefficient?: number
}

interface Props {
  orderBy?: OddsControllerGetEventsOrderBy
  onSortChange: (value: OddsControllerGetEventsOrderBy) => void
  onApplyFilters: (filters: SelectedFilters) => void
  currentFilters: SelectedFilters
}

export const EventFilers = ({
  onSortChange,
  orderBy,
  onApplyFilters,
  currentFilters
}: Props) => {
  const [localOutcomes, setLocalOutcomes] = useState<string[]>(
    currentFilters.outcomeTypes
  )
  const [localCoef, setLocalCoef] = useState<{ min?: number; max?: number }>({
    min: currentFilters.minCoefficient,
    max: currentFilters.maxCoefficient
  })
  const [isOpen, setIsOpen] = useState(false)

  const handleOutcomeChange = (value: string, checked: boolean) => {
    setLocalOutcomes(prev =>
      checked ? [...prev, value] : prev.filter(item => item !== value)
    )
  }

  const handleCoefChange = (min?: number, max?: number) => {
    setLocalCoef({ min, max })
  }

  const handleApply = () => {
    onApplyFilters({
      outcomeTypes: localOutcomes,
      minCoefficient: localCoef.min,
      maxCoefficient: localCoef.max
    })
    setIsOpen(false)
  }

  return (
    <div className='flex flex-row justify-start items-center gap-4'>
      <Select
        value={orderBy}
        onValueChange={value =>
          onSortChange(value as OddsControllerGetEventsOrderBy)
        }
      >
        <SelectTrigger className='w-72'>
          <SelectValue placeholder='Сортировка' />
        </SelectTrigger>
        <SelectContent>
          {FILTER_COMBOBOX.map(item => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant={'solid'} size={'medium'}>
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

          <div className='flex h-full flex-col justify-between pb-10'>
            <div className='space-y-8 mt-4'>
              {/* <section>
                <Label className='mb-4 block text-xl font-semibold'>
                  По исходам
                </Label>
                <div className='space-y-4'>
                  {OUTCOME_TYPES_FILTERS.map(item => (
                    <div
                      key={item.value}
                      className='flex items-center gap-3 text-lg'
                    >
                      <Checkbox
                        id={`outcome-${item.value}`}
                        checked={localOutcomes.includes(item.value)}
                        onCheckedChange={checked =>
                          handleOutcomeChange(item.value, !!checked)
                        }
                      />
                      <Label
                        htmlFor={`outcome-${item.value}`}
                        className='cursor-pointer font-semibold'
                      >
                        {item.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </section> */}

              <section>
                <Label className='mb-4 block text-xl font-semibold'>
                  По коэффициенту
                </Label>
                <div className='space-y-4'>
                  {COEFFICIENT_FILTERS.map((item, idx) => {
                    const isChecked =
                      localCoef.min === item.min && localCoef.max === item.max
                    return (
                      <div
                        key={idx}
                        className='flex items-center gap-3 text-lg'
                      >
                        <Checkbox
                          id={`coef-${idx}`}
                          checked={isChecked}
                          onCheckedChange={() =>
                            handleCoefChange(item.min, item.max)
                          }
                        />
                        <Label
                          htmlFor={`coef-${idx}`}
                          className='cursor-pointer font-semibold'
                        >
                          {item.label}
                        </Label>
                      </div>
                    )
                  })}
                </div>
              </section>
            </div>

            <div className='pt-8'>
              <Button onClick={handleApply} className='h-12 w-full text-base'>
                Применить
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
