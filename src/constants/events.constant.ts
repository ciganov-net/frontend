import { OddsControllerGetEventsOrderBy } from '@/api/generated'

export const FILTER_COMBOBOX = [
  // { label: 'Популярные', value: OddsControllerGetEventsOrderBy.POPULAR },
  { label: 'Сначала новые', value: OddsControllerGetEventsOrderBy.NEWEST },
  {
    label: 'Скоро закроются',
    value: OddsControllerGetEventsOrderBy.CLOSING_SOON
  }
  // {
  //   label: 'Больше всего ставок',
  //   value: OddsControllerGetEventsOrderBy.MORE_BETS
  // }
] as const

// export const OUTCOME_TYPES_FILTERS = [
//   { label: 'Да / Нет', value: 'YES_NO' },
//   { label: 'Несколько исходов', value: 'MULTIPLE' },
//   { label: 'Диапазон', value: 'RANGE' }
// ] as const

export const COEFFICIENT_FILTERS = [
  { label: 'Любой', min: undefined, max: undefined },
  { label: 'До 2.0', min: undefined, max: 2.0 },
  { label: '2.0-3.0', min: 2.0, max: 3.0 },
  { label: '3.0 и больше', min: 3.0, max: undefined }
] as const
