import { Button } from '../ui/button'
import { Card, CardContent, CardDescription, CardTitle } from '../ui/card'

export const FreebetBanner = () => {
  return (
    <Card className={'border-primary/50 bg-primary/10 text-primary rounded-lg'}>
      <CardTitle>Фрибеты</CardTitle>
      <CardDescription>
        Зарегистрируйтесь и получите 5000 руб на баланс
      </CardDescription>
      <CardContent>
        <Button variant={'outline'}>Получить фрибет</Button>
      </CardContent>
    </Card>
  )
}
