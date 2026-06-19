import { Button } from '../ui/button'
import { Card, CardContent, CardDescription, CardTitle } from '../ui/card'

export const FreebetBanner = () => {
  return (
    <Card
      className={
        'border-primary/50 p-4 bg-primary/10 text-primary rounded-lg bg-cover bg-center bg-no-repeat'
      }
      style={{ backgroundImage: "url('/freebet.png')" }}
    >
      <CardTitle className='text-xl font-semibold'>Фрибеты</CardTitle>
      <CardDescription className='text-xl text-secondary-foreground font-semibold -mt-4'>
        Зарегистрируйтесь и получите 5000 руб на баланс
      </CardDescription>
      <CardContent>
        <Button size={'large'}>Зарегистрироваться</Button>
      </CardContent>
    </Card>
  )
}
