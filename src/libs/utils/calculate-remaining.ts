const getPluralForm = (number: number, titles: [string, string, string]) => {
  const cases = [2, 0, 1, 1, 1, 2]
  return titles[
    number % 100 > 4 && number % 100 < 20
      ? 2
      : cases[number % 10 < 5 ? number % 10 : 5]
  ]
}

export const calculateRemaining = (dateStr: string | Date): string => {
  const now = new Date()
  const targetDate = typeof dateStr === 'string' ? new Date(dateStr) : dateStr

  const diff = targetDate.getTime() - now.getTime()

  if (diff <= 0) {
    return 'Событие завершено'
  }
  const totalMinutes = Math.floor(diff / (1000 * 60))
  const totalHours = Math.floor(totalMinutes / 60)
  const totalDays = Math.floor(totalHours / 24)

  const minutes = totalMinutes % 60
  const hours = totalHours % 24

  const parts: string[] = []

  if (totalDays > 0) {
    const daysWord = getPluralForm(totalDays, ['день', 'дня', 'дней'])
    parts.push(`${totalDays} ${daysWord}`)

    if (hours > 0) {
      const hoursWord = getPluralForm(hours, ['час', 'часа', 'часов'])
      parts.push(`${hours} ${hoursWord}`)
    }
  } else if (hours > 0) {
    const hoursWord = getPluralForm(hours, ['час', 'часа', 'часов'])
    parts.push(`${hours} ${hoursWord}`)

    if (minutes > 0) {
      const minutesWord = getPluralForm(minutes, ['минута', 'минуты', 'минут'])
      parts.push(`${minutes} ${minutesWord}`)
    }
  } else {
    const minutesWord = getPluralForm(minutes, ['минута', 'минуты', 'минут'])
    parts.push(`${minutes > 0 ? minutes : 1} ${minutesWord}`)
  }

  return parts.join(' ')
}
